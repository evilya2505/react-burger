export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
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

      if (type === wsAllOrdersConnect) {
        socket = new WebSocket(`${wsUrl}/all`);
      }

      if (
        type === wsUserOrdersConnect &&
        localStorage.getItem("access_token")
      ) {
        socket = new WebSocket(
          `${wsUrl}?token=${localStorage.getItem("access_token")}`
        );
      }

      if (socket) {
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
