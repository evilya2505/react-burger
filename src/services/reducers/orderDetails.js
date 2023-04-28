import { GET_ORDER_NUMBER, GET_ORDER_NUMBER_FAILED, GET_ORDER_NUMBER_SUCCESS } from "../actions/orderDetails";

const initialState = {
  orderNumber: null,
  orderNumberRequest: false,
  orderNumberFailed: false,
};

export const orderDetailsReducer = (state = initialState, action) => {
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
                orderNumberRequest: false
            };
    }
    case GET_ORDER_NUMBER_FAILED: {
      return {
                ...state,
                orderNumberFailed: true,
                orderNumberRequest: false
            };
    }

    default: {
      return state;
    }
  }
};