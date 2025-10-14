import { createBullBoard } from "@bull-board/api";
import { ExpressAdapter } from "@bull-board/express";

const serverAdapter = new ExpressAdapter();

const { addQueue } = createBullBoard({
  queues: [],
  serverAdapter,
});

serverAdapter.setBasePath("/admin/queues");

export { addQueue, serverAdapter };
