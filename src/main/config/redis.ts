import * as env from "env-var";

export default {
  host: env.get("REDIS_HOST").default("127.0.0.1").asString(),
  port: env.get("REDIS_PORT").default(6379).asIntPositive(),
};
