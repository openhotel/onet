import { getServerSocket } from "@da/socket";

export const server = () => {
  let $server;
  const load = (
    port: number,
    onRequest: (
      $request: Request,
      connInfo: Deno.ServeHandlerInfo,
    ) => Promise<Response> | Response,
  ) => {
    $server = getServerSocket(port, onRequest);
    console.log(`Started on :${port}`);

    $server.on(
      "guest",
      (
        clientId: string,
        [serverId, token]: string[],
        connInfo: Deno.ServeHandlerInfo,
      ) => {
        const ip = connInfo.remoteAddr.hostname;
        console.log(clientId, serverId, token, ip);

        //connInfo.remoteAddr.hostname
        return false;
      },
    );
  };

  return {
    load,
  };
};
