package auth

import (
	"github.com/supertokens/supertokens-golang/recipe/jwt"
	"github.com/supertokens/supertokens-golang/recipe/passwordless"
	"github.com/supertokens/supertokens-golang/recipe/passwordless/plessmodels"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/supertokens"
)

type Auth struct {
	middlewareBasePath string
}

func (a *Auth) InitSupertokens() {
	apiBasePath := a.middlewareBasePath
	websiteBasePath := a.middlewareBasePath

	err := supertokens.Init(supertokens.TypeInput{
		Supertokens: &supertokens.ConnectionInfo{
			ConnectionURI: "https://dev-9d93eba1fa5311edaf207db93d0a6c9a-us-east-1.aws.supertokens.io:3571",
			APIKey:        "ONDod-Lf5OhJvTU3vooejzL9ocxSUc",
		},
		AppInfo: supertokens.AppInfo{
			AppName:         "bike-coop-server",
			APIDomain:       "localhost:8080",
			WebsiteDomain:   "localhost:8080",
			APIBasePath:     &apiBasePath,
			WebsiteBasePath: &websiteBasePath,
		},
		RecipeList: []supertokens.Recipe{
			jwt.Init(nil),
			passwordless.Init(plessmodels.TypeInput{
				FlowType: "MAGIC_LINK",
				ContactMethodEmailOrPhone: plessmodels.ContactMethodEmailOrPhoneConfig{
					Enabled:              true,
					ValidateEmailAddress: passwordless.DefaultValidateEmailAddress,
				},
			}),
			session.Init(nil),
		},
	})
	if err != nil {
		panic(err.Error())
	}
}

func InitAuth(basePath string) {
	auth := &Auth{
		middlewareBasePath: basePath,
	}

	auth.InitSupertokens()
}
