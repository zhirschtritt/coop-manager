package users

import (
	"context"
	"fmt"
	"os"

	"encore.dev/beta/auth"
	"encore.dev/beta/errs"
	"github.com/zitadel/oidc/pkg/oidc"
	"github.com/zitadel/zitadel-go/v2/pkg/client/management"
	"github.com/zitadel/zitadel-go/v2/pkg/client/middleware"
	"github.com/zitadel/zitadel-go/v2/pkg/client/zitadel"
	pb "github.com/zitadel/zitadel-go/v2/pkg/client/zitadel/management"
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
	Email     string `json:"email,omitempty"`
	Phone     string `json:"phone,omitempty"`
	Roles     []Role `json:"roles"`
	OrgId     string `json:"orgId"`
	OrgName   string `json:"orgName"`
}

type GetUserResponse struct {
	UserData *UserData `json:"providerData"`
}

//encore:service
type UserService struct {
	zitadelClient *management.Client
}

// TODO: when required, work on return type for fully fleshed out (and json serializable) user object
// //encore:api private method=GET path=/users/by-name/:userName
// func (s UserService) GetUserByUserName(ctx context.Context, userName string) (*user.User, error) {
// 	res, err := s.zitadelClient.GetUserByLoginNameGlobal(ctx, &pb.GetUserByLoginNameGlobalRequest{
// 		LoginName: userName,
// 	})
// 	if err != nil {
// 		return nil, err
// 	}

// 	return res.User.Details(), nil
// }

//encore:api auth method=GET path=/users/me
func (s UserService) GetMyUser(ctx context.Context) (*GetUserResponse, error) {
	return &GetUserResponse{
		UserData: auth.Data().(*UserData),
	}, nil
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
