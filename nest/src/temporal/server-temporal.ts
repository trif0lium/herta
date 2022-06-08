import { CustomTransportStrategy, Server } from '@nestjs/microservices'
import { Worker } from '@temporalio/worker'

class TemporalServer extends Server implements CustomTransportStrategy {
  private temporalWorker: Worker

  constructor() {
    super()
  }

  async listen(callback: (...optionalParams: unknown[]) => any) {
    try {
      this.temporalWorker = await Worker.create({})
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
