package main

import (
	_ "github.com/lib/pq"

	"fmt"
	"log"
	"net/http"

	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"

	"github.com/gofiber/fiber/v2/middleware/adaptor"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"

	"github.com/supertokens/supertokens-golang/supertokens"

	"github.com/zhirschtritt/coop_manager/rpc/gen/coop_manager/v1/coopv1connect"

	"github.com/zhirschtritt/coop_manager/internal/auth"
	"github.com/zhirschtritt/coop_manager/internal/db"
	"github.com/zhirschtritt/coop_manager/internal/shifts"

	"github.com/zhirschtritt/coop_manager/ui"
)

func main() {
	if db, err := db.InitDatabase(); err != nil {
		log.Fatal(err)
	} else {
		defer db.Close()
	}

	auth.InitAuth("/auth")

	app := fiber.New()

	app.Use(logger.New())
	app.Use(recover.New())
	app.Use(adaptor.HTTPMiddleware(supertokens.Middleware))

	api := fiber.New()
	path, handler := coopv1connect.NewCoopShiftServiceHandler(&shifts.ShiftHandler{})

	// api.Use(adaptor.HTTPMiddleware(func(h http.Handler) http.Handler {
	// 	return session.VerifySession(nil, h.ServeHTTP)
	// }))
	api.All(path+"*", adaptor.HTTPHandler(http.StripPrefix("/api", handler)))
	app.Mount("/api/", api)

	fs, err := ui.FS()
	if err != nil {
		log.Fatal(fmt.Errorf("mounting ui: %w", err))
	}
	app.Get("/*", adaptor.HTTPHandler(http.FileServer(http.FS(fs))))

	log.Fatal(http.ListenAndServe(":7000", h2c.NewHandler(adaptor.FiberApp(app), &http2.Server{})))
}
