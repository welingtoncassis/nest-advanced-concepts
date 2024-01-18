import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FibonacciModule } from './fibonacci/fibonacci.module';
import { RunExampleCircuitBreakerModule } from './run-example-circuit-breaker/run-example-circuit-breaker.module';
@Module({
  imports: [FibonacciModule, RunExampleCircuitBreakerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
