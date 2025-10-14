export type ZapsterHttpClientResponse = {
  message_id: string;
  message_trace_id: string;
};

export type NotificationData = {
  recipient: string;
  instanceId?: string;
  media: Media;
};

export type Media = {
  url: string;
  caption: string;
};

export interface ZapsterHttpClientProtocol {
  sendNotification(
    notificationData: NotificationData,
  ): Promise<ZapsterHttpClientResponse>;
}
