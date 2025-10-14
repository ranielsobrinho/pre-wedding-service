import pino from "pino";
import pretty from "pino-pretty";
import createWriteStream from "pino-loki";
import { requestContext } from "@/shared/request-context";

const enableLoki = process.env.ENABLE_LOKI === "true";

const prettyStream = pretty({
  colorize: true,
  translateTime: "SYS:standard",
  ignore: "pid,hostname",
  singleLine: true,
});

const streams = [{ stream: prettyStream }];

if (enableLoki && process.env.LOKI_URL) {
  try {
    const lokiStream = createWriteStream({
      host: process.env.LOKI_URL,
      labels: {
        app: process.env.SERVICE_NAME || "pre-wedding-service",
        env: process.env.NODE_ENV || "development",
        client: process.env.CLIENT_NAME || "unknown",
      },
      batching: false,
      interval: 5000,
    });

    streams.push({ stream: lokiStream });
  } catch (error: any) {
    console.error("Failed to create Loki stream", { error });
  }
} else {
  console.warn(
    "Loki logging is disabled. Set ENABLE_LOKI=true to enable Loki logging.",
  );
}

const baseLogger = pino({ level: "info" }, pino.multistream(streams));

type LogLevel = "info" | "error" | "warn" | "debug" | "trace";
type LogFn = (msg: string, extra?: Record<string, unknown>) => void;

function createLoggerWithContext(base: pino.Logger) {
  const wrappedLogger: Record<LogLevel, LogFn> = {} as any;

  (["info", "error", "warn", "debug", "trace"] as LogLevel[]).forEach(
    (level) => {
      wrappedLogger[level] = (
        msg: string,
        extra: Record<string, unknown> = {},
      ) => {
        const requestId = requestContext.get<string>("requestId");
        base[level]({ requestId, ...extra }, msg);
      };
    },
  );

  return wrappedLogger;
}

export const logger = createLoggerWithContext(baseLogger);
