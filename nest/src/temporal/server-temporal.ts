import { CustomTransportStrategy, Server } from '@nestjs/microservices'
import { ActivityInterface } from '@temporalio/activity'
import { Worker, WorkerOptions } from '@temporalio/worker'

export interface TemporalServerOptions {
  workerOptions: WorkerOptions
}
export class TemporalServer extends Server implements CustomTransportStrategy {
  private temporalWorker: Worker
  private workerOptions: WorkerOptions

  constructor(options: TemporalServerOptions) {
    super()
    this.workerOptions = options.workerOptions
  }

  async listen(callback: (...optionalParams: unknown[]) => any) {
    const activities: ActivityInterface = {}
    const messageHandlersKeys = [...this.messageHandlers.keys()]
    for (const key in messageHandlersKeys) {
      try {
        const metadata = JSON.parse(key)
        if (metadata?.activityName.length > 0) {
          activities[metadata.activityName] = this.messageHandlers.get(key)
        }
      } catch (err) { }
    }

    try {
      this.temporalWorker = await Worker.create({ ...this.workerOptions, activities })
      await this.start(callback)
    } catch (err) {
      callback(err)
    }
  }

  async start(callback?: () => void) {
    this.temporalWorker.run()
    callback()
  }

  close() { }
}
