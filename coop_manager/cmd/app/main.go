package main

import (
	"context"
	"os"
	"os/signal"
	"syscall"

	"github.com/kpango/glg"
	_ "github.com/lib/pq"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"

	"fmt"
	"net/http"

	"github.com/gofiber/fiber/v2/middleware/adaptor"
	"github.com/gofiber/fiber/v2/middleware/logger"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/recover"

	"github.com/supertokens/supertokens-golang/supertokens"

	"github.com/zhirschtritt/coop_manager/rpc/gen/coop_manager/v1/coopv1connect"

	"github.com/zhirschtritt/coop_manager/internal/auth"
	"github.com/zhirschtritt/coop_manager/internal/db"
	"github.com/zhirschtritt/coop_manager/internal/shifts"

	"github.com/zhirschtritt/coop_manager/ui"
)

func main() {
	log := glg.New()

	db, err := db.NewDatabaseConn("coop_manager")
	if err != nil {
		log.Fatalf("connecting to db: %s", err)
	}
	defer db.Close()

	if err := db.Migrate(context.Background(), log); err != nil {
		log.Fatalf("running migrations: %s", err)
	}

	auth.InitAuth("/auth")

	app := fiber.New()

	app.Use(logger.New())
	app.Use(recover.New())
	app.Use(adaptor.HTTPMiddleware(supertokens.Middleware))

	api := app.Group("/api")
	path, handler := coopv1connect.NewCoopShiftServiceHandler(&shifts.ShiftHandlerConnect{})

	// api.Use(adaptor.HTTPMiddleware(func(h http.Handler) http.Handler {
	// 	return session.VerifySession(nil, h.ServeHTTP)
	// }))
	api.All(path+"*", adaptor.HTTPHandler(http.StripPrefix("/api", handler)))

	fs, err := ui.FS()
	if err != nil {
		log.Fatal(fmt.Errorf("mounting ui: %w", err))
	}
	app.Get("/*", adaptor.HTTPHandler(http.FileServer(http.FS(fs))))

	log.Fatal(http.ListenAndServe(":7000", h2c.NewHandler(adaptor.FiberApp(app), &http2.Server{})))

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)

	<-c
	log.Info("gracefully shutting down...")
	_ = app.Shutdown()
	log.Info("running cleanup tasks...")
	log.Info("service shutdown successfully")
}
