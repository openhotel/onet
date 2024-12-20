import {
  RequestType,
  RequestMethod,
  getResponse,
  HttpStatusCode,
} from "@oh/utils";
import { System } from "modules/system/main.ts";

export const versionRequest: RequestType<unknown> = {
  method: RequestMethod.GET,
  pathname: "/version",
  func: (request, url) => {
    return getResponse(HttpStatusCode.OK, {
      data: { version: System.getEnvs().version },
    });
  },
};
