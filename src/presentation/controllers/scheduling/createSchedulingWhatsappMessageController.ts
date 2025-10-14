import { Request, Response, NextFunction } from "express";
import { Controller } from "@/presentation/protocols/controller";
import { SendWhatsappSchedulingMessage } from "@/domain/usecases/schedules/SendWhatsappSchedulingMessage";
import { logger } from "@/infra/logging/logger";
import { createSchedulingWhatsappMessageSchema } from "./validation/createSchedulingWhatsappMessageControllerSchema";

export class CreateSchedulingWhatsappMessageController implements Controller {
  constructor(
    private readonly sendWhatsappSchedulingMessage: SendWhatsappSchedulingMessage,
  ) {}
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info(
        `[CreateSchedulingWhatsappMessageController]: Received request to schedule WhatsApp messages with body: ${JSON.stringify(
          req.body,
        )}`,
      );

      const parseResult = createSchedulingWhatsappMessageSchema.safeParse(
        req.body,
      );

      if (!parseResult.success) {
        return res.status(400).json({
          success: false,
          error: "Invalid input data",
          issues: parseResult.error.flatten(),
        });
      }

      const { contacts, instanceId, mediaData } = req.body;
      await this.sendWhatsappSchedulingMessage.execute({
        contacts,
        instanceId,
        mediaData,
      });

      res.json({
        statusCode: 200,
        body: {
          message: "Messages scheduled successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
