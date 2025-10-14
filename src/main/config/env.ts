import * as env from "env-var";

export default {
  ZAPSTER_INSTANCE_ID: env.get("ZAPSTER_INSTANCE_ID").asString(),
  ZAPSTER_TOKEN: env.get("ZAPSTER_TOKEN").asString(),
};
