import { CallHandler } from '@nestjs/common';
import { tap, throwError } from 'rxjs';

// It is important to adjust parameters, such as failure and success thresholds,
// according to the specific characteristics of your system and resiliency requirements

const SUCCESS_THRESHOLD = 3; // close circuit if 3 successes occur in a row
const FAILURE_THRESHOLD = 3; // open circuit if 3 failures occur in a row
const OPEN_TO_HALF_OPEN_WAIT_TIME = 60000; // time to wait before attempting to half-open the circuit

enum CircuitBreakerState {
  Closed,
  Open,
  HalfOpen,
}

export class CircuitBreaker {
  private state = CircuitBreakerState.Closed;
  private successCount = 0;
  private failureCount = 0;
  private lastError: Error;
  private nextAttempt: number;

  exec(next: CallHandler) {
    if (this.state === CircuitBreakerState.Open) {
      if (this.nextAttempt > Date.now()) {
        //  Notify someone or log the failure event
        // ...
        // Return an error (a new one or the last one), or perhaps a default value or alternate response
        return throwError(() => this.lastError);
      }
      this.state = CircuitBreakerState.HalfOpen;
    }
    return next.handle().pipe(
      tap({
        next: () => this.handleSuccess(),
        error: (err) => this.handleError(err),
      }),
    );
  }

  private handleSuccess() {
    this.failureCount = 0;
    if (this.state === CircuitBreakerState.HalfOpen) {
      this.successCount++;
      if (this.successCount >= SUCCESS_THRESHOLD) {
        this.successCount = 0;
        this.state = CircuitBreakerState.Closed;
      }
    }
  }

  private handleError(err: Error) {
    this.failureCount++;
    if (
      this.failureCount >= FAILURE_THRESHOLD ||
      this.state === CircuitBreakerState.HalfOpen
    ) {
      this.state = CircuitBreakerState.Open;
      this.nextAttempt = Date.now() + OPEN_TO_HALF_OPEN_WAIT_TIME;
      this.lastError = err;
    }
  }
}
