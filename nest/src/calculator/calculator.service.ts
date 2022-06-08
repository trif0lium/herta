import { Injectable } from '@nestjs/common';
import { ActivityInterface } from '@temporalio/activity';

@Injectable()
export class CalculatorService implements ICalculatorService {
  fibonacci(n: string): Promise<string> {
    return Promise.resolve('' + this._fibonacci(Number(n)))
  }

  private _fibonacci(n: number): number {
    return n < 2 ? n : this._fibonacci(n - 1) + this._fibonacci(n - 2)
  }

}

interface ICalculatorService {
  fibonacci(n: string): Promise<string>
}

export interface ICalculatorActivity extends ICalculatorService, ActivityInterface { }
