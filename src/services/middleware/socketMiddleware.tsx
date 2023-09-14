import { Dispatch, MiddlewareAPI } from "redux";
import { wsActions as IWsActions } from "../store";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: typeof IWsActions
) => {
  const sockets: Record<string, WebSocket> = {};

  return (store: MiddlewareAPI) => {
    return (next: Dispatch) => (action: any) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsUserOrdersConnect,
        wsAllOrdersConnect,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsActions;

      if (type === wsAllOrdersConnect && !sockets[wsAllOrdersConnect]) {
        sockets[wsAllOrdersConnect] = createSocket(`${wsUrl}/all`);
      }

      if (
        type === wsUserOrdersConnect &&
        localStorage.getItem("access_token") &&
        !sockets[wsUserOrdersConnect]
      ) {
        sockets[wsUserOrdersConnect] = createSocket(
          `${wsUrl}?token=${localStorage.getItem("access_token")}`
        );
      }

      if (type === onClose) {
        Object.keys(sockets).forEach((key) => {
          sockets[key].close();
          delete sockets[key];
        });
      }

      if (sockets[type]) {
        const socket = sockets[type];

        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const ws = event.currentTarget as WebSocket;
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({
            type: onMessage,
            payload: {
              restParsedData: restParsedData,
              url: ws.url,
            },
          });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  };
};

function createSocket(url: string) {
  return new WebSocket(url);
}
