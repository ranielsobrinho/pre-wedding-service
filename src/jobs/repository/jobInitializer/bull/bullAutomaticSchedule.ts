import { logger } from "@/infra/logging/logger";
import {
  DoneCallback,
  Job,
  HttpClient,
  QueueManager,
  JobInformation,
} from "@/jobs/repository/jobInitializer/interfaces/bullSchedule";

const LOGGER_KEY = "[BullAutomaticScheduleJobInitializer]";

class BullAutomaticScheduleJobInitializer {
  private httpClient: HttpClient;

  private queueManager: QueueManager;

  constructor({
    httpClient,
    queueManager,
  }: {
    httpClient: HttpClient;
    queueManager: QueueManager;
  }) {
    this.httpClient = httpClient;
    this.queueManager = queueManager;
  }

  private jobHandler(job: Job, done: DoneCallback): void {
    logger.info(
      `=============== ${job.data.data.name.toUpperCase()} DISPARADO DATA: ${JSON.stringify(job.data)} ===============`,
    );

    const {} = job.data;

    try {
      this.httpClient.sendNotification({
        recipient: job.data.data.number,
        instanceId: job.data.data.instanceId,
        media: job.data.data.mediaData,
      });
      done();
    } catch (error) {
      logger.error(`${LOGGER_KEY}: ${error}`);
      done(error as Error);
    }
  }

  private async startJobs(jobsInformation: JobInformation[]): Promise<void[]> {
    const promises: Promise<void>[] = [];
    jobsInformation.forEach(({ delay, ...rest }, index) => {
      const adjustedDelay = delay + index * 5000;
      logger.info(
        `${LOGGER_KEY}: JOB DATA AND PATTERN - ${JSON.stringify({
          rest,
        })}}`,
      );
      const promise = this.queueManager.addData(rest, adjustedDelay);
      promises.push(promise);
    });
    logger.info(`${LOGGER_KEY}: Jobs inicializados ${promises.length}`);
    return Promise.all(promises);
  }

  public async init(jobsInformation: JobInformation[]): Promise<void[]> {
    await this.queueManager.clearAllJobs();

    this.queueManager.addHandler(this.jobHandler.bind(this));
    return this.startJobs(jobsInformation);
  }
}

export { BullAutomaticScheduleJobInitializer };
