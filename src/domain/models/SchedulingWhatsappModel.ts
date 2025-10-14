export type SchedulingWhatsappModel = {
  contacts: Contact[];
  instanceId: string;
  mediaData: MediaData;
};

type MediaData = {
  caption: string;
  url: string;
};

type Contact = {
  name: string;
  number: string;
};
