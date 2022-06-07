package videoprocessing

import "go.temporal.io/sdk/workflow"

func TranscodingWorkflow(ctx workflow.Context, opts TranscodingJob) (bool, error) {
	return true, nil
}
