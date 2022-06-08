import { proxyActivities } from "@temporalio/workflow";
import { ICalculatorActivity } from '../calculator.service'

const { fibonacci } = proxyActivities<ICalculatorActivity>({ startToCloseTimeout: '1 minute' })

export async function fibonacciWorkflow(n: string): Promise<string> {
  return await fibonacci(n)
}
