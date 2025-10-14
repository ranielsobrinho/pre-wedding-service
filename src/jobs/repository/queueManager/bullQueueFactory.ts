import Queue, { Queue as BullQueue } from "bull";
import redisConfig from "@/main/config/redis";
import { logger } from "@/infra/logging/logger";

const HOST = process.env.REDIS_HOST || redisConfig.host;
const PORT = process.env.REDIS_PORT || redisConfig.port;

class BullQueueFactory {
  private queues: Set<BullQueue>;

  constructor() {
    this.queues = new Set();
  }

  public createQueue(queueName: string): BullQueue {
    logger.info(`[BullQueueFactory]: Creating queue ${queueName}`);
    const queue = new Queue(queueName, {
      redis: {
        port: Number(PORT),
        host: String(HOST),
      },
    });
    this.queues.add(queue);
    return queue;
  }

  public async closeAllQueues(): Promise<void> {
    if (!this.queues.size) return;
    await Promise.all([...this.queues].map((queue) => queue.close()));
  }
}

export default new BullQueueFactory();
