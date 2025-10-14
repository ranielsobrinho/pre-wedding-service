import "dotenv/config";
import { logger } from "@/infra/logging/logger";
import app from "@/main/loaders/app";

const PORT = process.env.PORT || 5002;

async function start() {
  try {
    app.listen(PORT, () => {
      logger.info(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server", { err: error });
    process.exit(1);
  }
}

start();
