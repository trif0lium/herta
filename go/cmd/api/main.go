package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
	"go.temporal.io/sdk/client"
)

func main() {
	PORT := os.Getenv("PORT")
	if len(PORT) == 0 {
		PORT = "1323"
	}
	c, err := client.NewClient(client.Options{})
	if err != nil {
		panic(err)
	}
	defer c.Close()
	e := echo.New()
	e.GET("/healthz", func(ctx echo.Context) error {
		options := client.StartWorkflowOptions{
			TaskQueue: "CALCULATOR_TASK_QUEUE",
		}
		_, err := c.ExecuteWorkflow(ctx.Request().Context(), options, "fibonacciWorkflow", "27")
		if err != nil {
			return ctx.JSON(http.StatusOK, map[string]bool{
				"ok": false,
			})
		}
		return ctx.JSON(http.StatusOK, map[string]bool{
			"ok": true,
		})
	})
	e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", PORT)))
}
