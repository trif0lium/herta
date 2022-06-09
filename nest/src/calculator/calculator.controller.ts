import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { Worker } from '@temporalio/worker'
import { TemporalActivity } from 'src/temporal/server-temporal';
import { CalculatorService } from './calculator.service';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) { }

  // private worker: Worker
  async onModuleInit() {
    // this.worker = await Worker.create({
    //   taskQueue: 'CALCULATOR_TASK_QUEUE',
    //   workflowsPath: require.resolve('./workflows')
    // })
  }

  @TemporalActivity()
  async fibonacci(@Payload() n: string): Promise<string> {
    return this.calculatorService.fibonacci(n)
  }
}
