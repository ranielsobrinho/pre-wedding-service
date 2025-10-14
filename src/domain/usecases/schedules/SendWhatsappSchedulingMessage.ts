import { SchedulingWhatsappModel } from "@/domain/models/SchedulingWhatsappModel";

export interface SendWhatsappSchedulingMessage {
  execute(params: SchedulingWhatsappModel): Promise<void>;
}
