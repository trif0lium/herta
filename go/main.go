package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
)

func main() {
	PORT := os.Getenv("PORT")
	if len(PORT) == 0 {
		PORT = "1323"
	}
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]bool{
			"ok": true,
		})
	})
	e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", PORT)))
}
