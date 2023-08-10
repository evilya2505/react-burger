export const socketMiddleware = (wsUrl, wsActions) => {
  const sockets = {};

  return (store) => {
    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsUserOrdersConnect,
        wsAllOrdersConnect,
        wsClose,
        onOpen,
        onClose,
        onError,
        onMessage
      } = wsActions;

      if (type === wsAllOrdersConnect && !sockets[wsAllOrdersConnect]) {
        sockets[wsAllOrdersConnect] = createSocket(`${wsUrl}/all`);
      }

      if (type === wsUserOrdersConnect && localStorage.getItem("access_token") && !sockets[wsUserOrdersConnect]) {
        sockets[wsUserOrdersConnect] = createSocket(`${wsUrl}?token=${localStorage.getItem("access_token")}`);
      }

      if (type === wsClose) {
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
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({
            type: onMessage,
            payload: {
              restParsedData: restParsedData,
              url: event.currentTarget.url,
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

function createSocket(url) {
  return new WebSocket(url);
}
