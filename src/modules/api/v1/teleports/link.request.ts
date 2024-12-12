import {
  getResponse,
  HttpStatusCode,
  RequestMethod,
  RequestType,
} from "@oh/utils";
import {
  getHotelFromRequest,
  isRequestAuthenticated,
} from "shared/utils/request.utils.ts";
import { System } from "modules/system/main.ts";
import { Scope } from "shared/enums/scope.enums.ts";

export const linkRequest: RequestType<unknown> = {
  method: RequestMethod.POST,
  pathname: "/link",
  func: async (request) => {
    if (!isRequestAuthenticated(request))
      return getResponse(HttpStatusCode.FORBIDDEN);

    const { accountId, linkId, teleportId } = await request.json();

    if (!accountId || !linkId || !teleportId)
      return getResponse(HttpStatusCode.FORBIDDEN);

    const hotel = getHotelFromRequest(request);

    if (!(await hotel.hasAccountScopes(accountId, [Scope.ONET_TELEPORTS_LINK])))
      return getResponse(HttpStatusCode.FORBIDDEN);

    const isValid = await System.teleports.link(
      linkId,
      teleportId,
      hotel.getHotelId(),
      hotel.getIntegrationId(),
    );

    return getResponse(isValid ? HttpStatusCode.OK : HttpStatusCode.CONFLICT);
  },
};