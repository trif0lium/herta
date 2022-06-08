import { Controller } from '@nestjs/common';
import { Worker } from '@temporalio/worker'

@Controller('calculator')
export class CalculatorController {
  private worker: Worker
  async onModuleInit() {
    this.worker = await Worker.create({
      taskQueue: 'CALCULATOR_TASK_QUEUE',
      workflowsPath: require.resolve('./workflows')
    })
  }
}
