package main

import (
	"github.com/trif0lium/herta/go/internal/workflows/videoprocessing"
	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"
)

func main() {
	c, err := client.NewClient(client.Options{})
	if err != nil {
		panic(err)
	}
	defer c.Close()

	w := worker.New(c, "TRANSCODING_TASK_QUEUE", worker.Options{})
	w.RegisterWorkflow(videoprocessing.TranscodingWorkflow)
	err = w.Run(worker.InterruptCh())
	if err != nil {
		panic(err)
	}
}
