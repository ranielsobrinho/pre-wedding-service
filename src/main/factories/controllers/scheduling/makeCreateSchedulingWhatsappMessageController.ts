import { CreateSchedulingWhatsappMessageController } from "@/presentation/controllers/scheduling/createSchedulingWhatsappMessageController";
import { makeCreateSchedulingWhatsappMessageUseCase } from "../../usecases/scheduling/makeCreateSchedulingWhatsappMessageUseCase";

export const makeCreateSchedulingWhatsappMessageController = () => {
  return new CreateSchedulingWhatsappMessageController(
    makeCreateSchedulingWhatsappMessageUseCase(),
  );
};
