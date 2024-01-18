import { Injectable, RequestTimeoutException } from '@nestjs/common';

@Injectable()
export class RunExampleCircuitBreakerService {
  findAll() {
    console.log('findAll() called');
    throw new RequestTimeoutException('findAll() timed out');
  }
}
