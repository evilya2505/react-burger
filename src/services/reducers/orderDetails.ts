import {
  GET_ORDER_NUMBER,
  GET_ORDER_NUMBER_FAILED,
  GET_ORDER_NUMBER_SUCCESS,
  TOrderDetailsActions,
} from "../actions/orderDetails";

type TOrderDetailsListState = {
  orderNumber: number | null;
  orderNumberRequest: boolean;
  orderNumberFailed: boolean;
};

const initialState: TOrderDetailsListState = {
  orderNumber: null,
  orderNumberRequest: false,
  orderNumberFailed: false,
};

export const orderDetailsReducer = (
  state = initialState,
  action: TOrderDetailsActions
) => {
  switch (action.type) {
    case GET_ORDER_NUMBER: {
      return {
        ...state,
        orderNumberRequest: true,
        orderNumberFailed: false,
      };
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.orderNumber,
        orderNumberRequest: false,
      };
    }
    case GET_ORDER_NUMBER_FAILED: {
      return {
        orderNumber: null,
        orderNumberFailed: true,
        orderNumberRequest: false,
      };
    }

    default: {
      return state;
    }
  }
};
