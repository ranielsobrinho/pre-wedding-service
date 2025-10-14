import { BullSchedulingJobCreator } from "@/jobs/repository/bullScheduling";
import { SchedulingMapCreatorImpl } from "@/jobs/utils/schedulingMapCreatorImpl";
import { makeBullJobInitializer } from "@/jobs/main/bullJobInitializer";

const makeSchedulingJobCreator = (): BullSchedulingJobCreator => {
  const schedulingMapCreator = new SchedulingMapCreatorImpl();
  const schedulingJobInitializer = makeBullJobInitializer({
    queueName: "scheduling_zapster",
  });

  return new BullSchedulingJobCreator({
    schedulingJobInitializer,
    schedulingMapCreator,
  });
};

export { makeSchedulingJobCreator };
