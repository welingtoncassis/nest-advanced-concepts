import { Controller, Get, Query } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { Piscina } from 'piscina';
import { resolve } from 'path';

@Controller('fibonacci')
export class FibonacciController {
  fibonacciWorker = new Piscina({
    filename: resolve(__dirname, 'fibonacci.worker.js'),
  });

  @Get('worker-thread')
  fibonacciWorkerThread(@Query('n') n = 10) {
    return this.fibonacciWorker.run(n);
  }

  @Get()
  fibonacci(@Query('n') n = 10) {
    if (n < 2) {
      return n;
    }
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }
}
