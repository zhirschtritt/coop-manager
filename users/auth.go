package users

import (
	"context"
	"sync"
	"time"

	encore_auth "encore.dev/beta/auth"
	"encore.dev/beta/errs"

	"github.com/jellydator/ttlcache/v3"
	"github.com/zitadel/oidc/pkg/client/rs"
)

var (
	initOnce              sync.Once
	tokenCache            *ttlcache.Cache[string, *UserData]
	zitadelResourceServer rs.ResourceServer
)

var secrets struct {
	ZitadelIssuerId       string
	ZitadelApiUrl         string
	ZitadelJWTKey         string
	ZitadelServiceUserKey string
}

const (
	ProjectRolesClaim = "urn:zitadel:iam:org:project:roles"
	OrgIdClaim        = "urn:zitadel:iam:user:resourceowner:id"
	OrgNameClaim      = "urn:zitadel:iam:user:resourceowner:name"
)

//encore:authhandler
func AuthHandler(ctx context.Context, token string) (encore_auth.UID, *UserData, error) {
	initOnce.Do(func() {
		resourceServer, err := rs.NewResourceServerFromKeyFile(secrets.ZitadelIssuerId, "key.json")
		if err != nil {
			panic(errs.Wrap(err, "failed to create jwt introspection client"))
		}
		zitadelResourceServer = resourceServer

		// TODO: hook up ttlcache metrics to encore metrics (hits, misses, insertions...)
		// https://github.com/jellydator/ttlcache/blob/v3/metrics.go
		cache := ttlcache.New[string, *UserData](
			ttlcache.WithTTL[string, *UserData](5 * time.Minute),
		)
		go cache.Start()
		tokenCache = cache

	})

	if cached := tokenCache.Get(token); cached != nil {
		user := cached.Value()

		return encore_auth.UID(user.Id), user, nil
	} else {
		resp, err := rs.Introspect(ctx, zitadelResourceServer, token)
		if err != nil {
			return "", nil, err
		}
		if !resp.IsActive() {
			return "", nil, &errs.Error{Code: errs.Unauthenticated, Message: "token is not active"}
		}
		if resp.GetExpiration().Compare(time.Now()) < 0 {
			return "", nil, &errs.Error{Code: errs.Unauthenticated, Message: "token is expired"}
		}

		claims := resp.GetClaims()
		projectRoles := claims[ProjectRolesClaim].(map[string]interface{})

		roles := []Role{}

		for k := range projectRoles {
			roles = append(roles, Role(k))
		}

		u := &UserData{
			Id:        resp.GetSubject(),
			UserName:  resp.GetName(),
			Email:     resp.GetEmail(),
			FirstName: resp.GetGivenName(),
			LastName:  resp.GetFamilyName(),
			Phone:     resp.GetPhoneNumber(),
			Roles:     roles,
			OrgId:     claims[OrgIdClaim].(string),
			OrgName:   claims[OrgNameClaim].(string),
		}

		ttl := minDuration(time.Until(resp.GetExpiration()), ttlcache.DefaultTTL)
		tokenCache.Set(token, u, ttl)

		return encore_auth.UID(resp.GetSubject()), u, nil
	}
}

func minDuration(a, b time.Duration) time.Duration {
	if a <= b {
		return a
	}
	return b
}
