import { logger } from "@/infra/logging/logger";
import { MediaData } from "../repository/jobInitializer/interfaces/bullSchedule";

interface Scheduling {
  number: string;
  name: string;
  instanceId: string;
  mediaData: MediaData;
  [key: string]: any;
}

interface SchedulingJobData {
  contacts: {
    number: string;
    name: string;
  }[];
  instanceId: string;
  mediaData: MediaData;
  [key: string]: any;
}

interface JobInformation {
  name: string;
  delay: number;
  data: Scheduling;
}

class SchedulingMapCreatorImpl {
  public createSchedulings(schedulings: SchedulingJobData): JobInformation[] {
    logger.info(
      `[SchedulingMapCreatorImpl]: Creating schedulings map for ${schedulings.contacts.length} items.`,
    );
    const jobsInformation: JobInformation[] = [];
    for (let i = 0; i < schedulings.contacts.length; i += 1) {
      logger.info(
        `[SchedulingMapCreatorImpl]: Processing scheduling ${JSON.stringify(schedulings.contacts[i])}...`,
      );
      const schedule = {
        name: schedulings.contacts[i].name,
        number: schedulings.contacts[i].number,
        instanceId: schedulings.instanceId,
        mediaData: schedulings.mediaData,
      };

      const delay = i * 5000; // 5 seconds per job, spaced out

      jobsInformation.push({
        name: `job_scheduling_zapster_${schedule.name}_${schedule.number}`,
        delay,
        data: schedule,
      });
    }

    logger.info(
      `[SchedulingMapCreatorImpl]: jobsInformation => ${JSON.stringify(jobsInformation)}`,
    );

    return jobsInformation;
  }
}

export { SchedulingMapCreatorImpl, Scheduling, JobInformation };
