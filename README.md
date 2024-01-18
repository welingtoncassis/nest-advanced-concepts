# Nest Advanced Concepts

- Complex scenarios in modern Node applications

## Worker threads

- Use Cases: CPU Intensive Operations, Asynchronous I/O operations, Task Parallelization
- Example: src/fibonacci
- How to test: `npm run start:dev` && `curl -X Get -w "\nTime total: %{time_total}" http://localhost:3000/fibonacci?n=40`

## Circuit breaker

- Circuit Breaker offers an effective way to protect your application from temporary failures, improving reliability and user experience.
- `CircuitBreakerInterceptor` on a controller, it associates an instance of the CircuitBreaker with each controller method (routes). Each instance of CircuitBreaker is independent and tracks the number of errors for the specific route it is associated with.
- Example: src/common/interceptors/circuit-breaker
- How to test: `npm run start:dev` && `for i in $(seq 1 50); do curl -w "\n" "http://localhost:3000/run-example-circuit-breaker" & done`
