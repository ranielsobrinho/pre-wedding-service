import { logger } from "@/infra/logging/logger";

interface SchedulingJobInitializer {
  init(schedulingJobsInformation: any): void;
}

interface SchedulingMapCreator {
  createSchedulings(schedulings: any): any;
}

interface BullSchedulingJobCreatorParams {
  schedulingJobInitializer: SchedulingJobInitializer;
  schedulingMapCreator: SchedulingMapCreator;
}

class BullSchedulingJobCreator {
  private schedulingJobInitializer: SchedulingJobInitializer;

  private schedulingMapCreator: SchedulingMapCreator;

  constructor({
    schedulingJobInitializer,
    schedulingMapCreator,
  }: BullSchedulingJobCreatorParams) {
    this.schedulingJobInitializer = schedulingJobInitializer;
    this.schedulingMapCreator = schedulingMapCreator;
  }

  recreateJobs(schedulings: any): void {
    logger.info("[BullSchedulingJobCreator]: Recreating jobs...");
    const schedulingJobsInformation =
      this.schedulingMapCreator.createSchedulings(schedulings);

    this.schedulingJobInitializer.init(schedulingJobsInformation);
  }
}

export { BullSchedulingJobCreator };
