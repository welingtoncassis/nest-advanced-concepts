import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { join } from 'path';
import { Observable, filter, firstValueFrom, fromEvent, map } from 'rxjs';
import { Worker } from 'worker_threads';

@Injectable()
export class FibonacciWorkerHost
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private worker: Worker;
  private messages$: Observable<{ id: string; result: number }>;

  onApplicationShutdown() {
    this.worker.terminate();
  }
  onApplicationBootstrap() {
    this.worker = new Worker(join(__dirname, 'fibonacci.worker.js'));
    this.messages$ = fromEvent(
      this.worker,
      'message',
    ) as unknown as Observable<{
      id: string;
      result: number;
    }>;
  }

  run(n: number) {
    const uniqueId = randomUUID();
    this.worker.postMessage({ n, id: uniqueId });
    return firstValueFrom(
      this.messages$.pipe(
        filter((message) => message.id === uniqueId),
        map((message) => message.result),
      ),
    );
  }
}
