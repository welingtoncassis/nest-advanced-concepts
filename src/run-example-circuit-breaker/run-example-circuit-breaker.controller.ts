import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { RunExampleCircuitBreakerService } from './run-example-circuit-breaker.service';
import { CircuitBreakerInterceptor } from '../common/interceptors/circuit-breaker/circuit-breaker.interceptor';

@UseInterceptors(CircuitBreakerInterceptor)
@Controller('run-example-circuit-breaker')
export class RunExampleCircuitBreakerController {
  constructor(
    private readonly runExampleCircuitBreakerService: RunExampleCircuitBreakerService,
  ) {}

  @Get()
  findAll() {
    return this.runExampleCircuitBreakerService.findAll();
  }
}
