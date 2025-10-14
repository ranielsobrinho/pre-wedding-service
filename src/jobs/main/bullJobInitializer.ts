import { BullAutomaticScheduleJobInitializer } from "@/jobs/repository/jobInitializer/bull/bullAutomaticSchedule";
import { BullQueueManager } from "@/jobs/repository/queueManager/bullQueueManager";
import { ZapsterHttpClient } from "@/infra/http/zapster/zapsterHttpClient";
import { HttpClient } from "@/infra/http/httpClient";

interface BullJobInitializerParams {
  queueName: string;
}

const makeBullJobInitializer = ({
  queueName,
}: BullJobInitializerParams): BullAutomaticScheduleJobInitializer => {
  const queueManager = new BullQueueManager({ queueName });
  const zapsterHttpClient = new ZapsterHttpClient(new HttpClient());

  return new BullAutomaticScheduleJobInitializer({
    httpClient: zapsterHttpClient,
    queueManager,
  });
};

export { makeBullJobInitializer };
