import * as process from "node:process";

export const IS_PRODUCTION = process.env.NODE_ENV === "production";
