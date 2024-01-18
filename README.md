# Nest Advanced Concepts

- Complex scenarios in modern Node applications

## Worker threads

- Use Cases: CPU Intensive Operations, Asynchronous I/O operations, Task Parallelization
- Example: src/fibonacci
- How to test: `npm run start:dev` && `curl -X Get -w "\nTime total: %{time_total}" http://localhost:3000/fibonacci?n=40`

## Circuit breaker
