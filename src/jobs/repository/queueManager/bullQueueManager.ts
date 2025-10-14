import { BullAdapter } from "@bull-board/api/bullAdapter";
import { Queue } from "bull";
import { addQueue } from "@/main/loaders/bullBoard";
import BullQueueFactory from "./bullQueueFactory";
import { logger } from "@/infra/logging/logger";

class BullQueueManager {
  private queueName: string;

  private myQueue: Queue;

  private addedProcess: boolean;

  constructor({ queueName }: { queueName: string }) {
    this.queueName = queueName;
    this.myQueue = BullQueueFactory.createQueue(queueName);

    addQueue(new BullAdapter(this.myQueue));

    this.addedProcess = false;
  }

  public addHandler(handler: any): void {
    if (!this.addedProcess) {
      this.myQueue.process(5, handler);
      this.addedProcess = true;
    }
  }

  public async addData(data: any, delay: number): Promise<void> {
    logger.info(
      `[BullQueueManager]: Adding job to queue ${this.queueName} with data: ${JSON.stringify(data)} and delay: ${delay}`,
    );
    return this.myQueue
      .add(data, {
        delay,
        attempts: 3,
        removeOnComplete: 10,
        removeOnFail: 10,
      })
      .then(() => {});
  }

  public clearAllJobs(): Promise<void> {
    return this.myQueue.obliterate({ force: true });
  }
}

export { BullQueueManager };
