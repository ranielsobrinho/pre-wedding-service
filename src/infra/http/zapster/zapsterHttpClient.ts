import { HttpClientProtocol } from "@/data/protocols/httpClient/httpClientProtocol";

import {
  ZapsterHttpClientProtocol,
  ZapsterHttpClientResponse,
  NotificationData,
} from "@/data/protocols/httpClient/zapsterHttpClient";
import urls from "@/main/config/urls";
import config from "@/main/config/env";
import { logger } from "@/infra/logging/logger";

export class ZapsterHttpClient implements ZapsterHttpClientProtocol {
  private readonly baseUrl: string = urls.ZAPSTER_API_URL;
  private readonly token: string | undefined = config.ZAPSTER_TOKEN;

  constructor(private readonly httpClient: HttpClientProtocol) {}

  async sendNotification(
    notificationData: NotificationData,
  ): Promise<ZapsterHttpClientResponse> {
    try {
      logger.info(
        `[ZapsterHttpClient]: Sending notification to ZapsterAPI => ${JSON.stringify(
          notificationData,
        )}`,
      );

      if (!this.token) {
        throw new Error("Zapster token is not defined");
      }

      const dataDTO = {
        ...notificationData,
        instance_id: notificationData.instanceId,
      };

      delete dataDTO.instanceId;

      const url = `${this.baseUrl}/v1/wa/messages`;
      logger.info(`olha a url => ${url} e o token => ${this.token}`);

      const response = await this.httpClient.post<any, any>(`${url}`, dataDTO, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });

      return {
        message_id: response.data.message_id,
        message_trace_id: response.data.message_trace_id,
      };
    } catch (error: any) {
      logger.error(
        `[ZapsterHttpClient]: Error calling ZapsterAPI => ${JSON.stringify(error.response.data)}`,
      );
      return {
        message_id: "",
        message_trace_id: "",
      };
    }
  }
}
