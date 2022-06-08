import { CustomTransportStrategy, Server } from '@nestjs/microservices'
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
    try {
      this.temporalWorker = await Worker.create({ ...this.workerOptions })
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
