import * as env from "env-var";

export default {
  ZAPSTER_API_URL: env
    .get("ZAPSTER_API_URL")
    .default("https://api.zapsterapi.com")
    .asString(),
};
