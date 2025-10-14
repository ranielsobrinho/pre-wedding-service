import { CrateSchedulingWhatsappMessageUseCase } from "@/data/usecases/scheduling/createSchedulingWhatsappMessageUseCase";
import { makeSchedulingJobCreator } from "@/jobs/main/bullSchedulingJobCreator";

export const makeCreateSchedulingWhatsappMessageUseCase = () => {
  const schedulingJobCreator = makeSchedulingJobCreator();

  return new CrateSchedulingWhatsappMessageUseCase(schedulingJobCreator);
};
