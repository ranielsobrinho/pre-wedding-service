import { SchedulingWhatsappModel } from "@/domain/models/SchedulingWhatsappModel";
import { SendWhatsappSchedulingMessage } from "@/domain/usecases/schedules/SendWhatsappSchedulingMessage";
import { logger } from "@/infra/logging/logger";
import { BullSchedulingJobCreator } from "@/jobs/repository/bullScheduling";

export class CrateSchedulingWhatsappMessageUseCase
  implements SendWhatsappSchedulingMessage
{
  constructor(
    private readonly schedulingJobCreator: BullSchedulingJobCreator,
  ) {}

  async execute(params: SchedulingWhatsappModel): Promise<void> {
    logger.info(
      `[CrateSchedulingWhatsappMessageUseCase] Calling schedulingJobCreator...`,
    );
    this.schedulingJobCreator.recreateJobs(params);
  }
}
