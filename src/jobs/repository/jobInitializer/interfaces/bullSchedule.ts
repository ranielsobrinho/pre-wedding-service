import { NotificationData } from "@/data/protocols/httpClient/zapsterHttpClient";

export type DoneCallback = (error?: Error) => void;

export interface JobData {
  name: string;
  number: string;
}

export interface MediaData {
  caption: string;
  url: string;
}

export interface Job {
  name: string;
  data: {
    data: {
      name: string;
      number: string;
      instanceId: string;
      mediaData: MediaData;
    };
  };
}

export interface HttpClient {
  sendNotification(data: NotificationData): void;
}

export interface QueueManager {
  addData(data: any, delay: number): Promise<void>;
  clearAllJobs(): Promise<void>;
  addHandler<T>(handler: (job: T, done: DoneCallback) => void): void;
}

export interface JobInformation {
  delay: number;
  [key: string]: any;
}
