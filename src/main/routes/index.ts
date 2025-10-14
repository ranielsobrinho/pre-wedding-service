import { logger } from "@/infra/logging/logger";
import { Router } from "express";
import { schedulingRoutes } from "@/main/routes/scheduling.routes";

export const router = Router();

router.get("/health", (req, res) => {
  logger.info(`API is running`);
  res.json({
    success: true,
    data: { message: "API is running" },
    meta: null,
  });
});

schedulingRoutes(router);
