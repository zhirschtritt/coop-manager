package users

import (
	"context"
	"fmt"
	"os"

	"encore.dev/beta/auth"
	"encore.dev/beta/errs"
	"github.com/samber/lo"
	"github.com/zitadel/oidc/pkg/oidc"
	"github.com/zitadel/zitadel-go/v2/pkg/client/management"
	"github.com/zitadel/zitadel-go/v2/pkg/client/middleware"
	"github.com/zitadel/zitadel-go/v2/pkg/client/zitadel"
	pb "github.com/zitadel/zitadel-go/v2/pkg/client/zitadel/management"
	"github.com/zitadel/zitadel-go/v2/pkg/client/zitadel/user"
)

type Role string

const (
	Admin     Role = "admin"
	Moderator Role = "staff"
	Volunteer Role = "volunteer"
	Member    Role = "member"
)

type UserData struct {
	Id        string `json:"id"`
	UserName  string `json:"userName"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	Phone     string `json:"phone"`
	Roles     []Role `json:"roles"`
	OrgId     string `json:"orgId"`
	OrgName   string `json:"orgName"`
}

type MeResponse struct {
	UserData *UserData `json:"providerData"`
}

//encore:api auth path=/users/me
func Me(ctx context.Context) (*MeResponse, error) {
	return &MeResponse{UserData: auth.Data().(*UserData)}, nil
}

type GetUserResponse struct {
	ID       string `json:"id"`
	UserName string `json:"name"`
	Type     string `json:"isMachine"`
	Email    string `json:"email"`
	Phone    string `json:"phone"`
}

//encore:api private method=GET path=/users/by-name/:loginName
func (s *UserService) GetUserByLogin(ctx context.Context, loginName string) (*GetUserResponse, error) {
	res, err := s.zitadelClient.GetUserByLoginNameGlobal(ctx, &pb.GetUserByLoginNameGlobalRequest{
		LoginName: auth.Data().(*UserData).UserName,
	})
	if err != nil {
		return nil, err
	}

	return &GetUserResponse{
		ID:       res.User.Id,
		UserName: res.User.UserName,
		Type:     lo.Ternary(res.User.GetType() == &user.User_Human{}, "HUMAN", "MACHINE"),
		Email:    res.User.GetHuman().GetEmail().Email,
		Phone:    res.User.GetHuman().GetPhone().Phone,
	}, nil
}

//encore:service
type UserService struct {
	zitadelClient *management.Client
}

func initUserService() (*UserService, error) {
	// TODO: this is a bit hacky but simpler then storing and keeping track of the individual secrets separately
	// revisit this when the zitadel integration is fleshed out more
	os.WriteFile("key.json", []byte(secrets.ZitadelJWTKey), 0644)

	managementClient, err := management.NewClient(
		secrets.ZitadelIssuerId,
		secrets.ZitadelApiUrl,
		[]string{oidc.ScopeOpenID, zitadel.ScopeZitadelAPI()},
		zitadel.WithJWTProfileTokenSource(middleware.JWTProfileFromFileData(
			[]byte(secrets.ZitadelServiceUserKey),
		)),
	)
	if err != nil {
		return nil, errs.Wrap(err, "failed to create admin client")
	}

	_, healthErr := managementClient.Healthz(context.Background(), &pb.HealthzRequest{})
	if healthErr != nil {
		panic(errs.Wrap(healthErr, "zitadel health check failed"))
	}

	return &UserService{
		zitadelClient: managementClient,
	}, nil
}

func (s *UserService) Shutdown(force context.Context) error {
	errChan := make(chan error)
	go func() {
		err := s.zitadelClient.Connection.Close()
		if err != nil {
			errChan <- err
		}
		close(errChan)
	}()

	select {
	case err := <-errChan:
		return err
	case <-force.Done():
		return fmt.Errorf("forcefully shutting down user service")
	}
}
