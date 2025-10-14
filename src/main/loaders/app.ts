import express from "express";
import { errorHandler } from "@/main/middleware/error-handler";
import { router } from "@/main/routes";
import cors from "cors";
import { serverAdapter } from "./bullBoard";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use(errorHandler);
app.use("/admin/queues", serverAdapter.getRouter());

export default app;
