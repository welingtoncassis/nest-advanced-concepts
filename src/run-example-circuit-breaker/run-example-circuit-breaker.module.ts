import { Module } from '@nestjs/common';
import { RunExampleCircuitBreakerService } from './run-example-circuit-breaker.service';
import { RunExampleCircuitBreakerController } from './run-example-circuit-breaker.controller';

@Module({
  controllers: [RunExampleCircuitBreakerController],
  providers: [RunExampleCircuitBreakerService],
})
export class RunExampleCircuitBreakerModule {}
