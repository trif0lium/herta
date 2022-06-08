import { Controller, OnModuleInit } from '@nestjs/common';
import { Worker } from '@temporalio/worker'

@Controller('search')
export class SearchController implements OnModuleInit {
  private worker: Worker
  async onModuleInit() {
    this.worker = await Worker.create({
      taskQueue: 'SEARCH_TASK_QUEUE',
      workflowsPath: require.resolve('./workflows')
    })
  }
}
