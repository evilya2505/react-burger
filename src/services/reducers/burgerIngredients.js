import { GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS  } from "../actions/burgerIngredients";

const initialState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients_redux: []
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        // Запрос начал выполняться
        ingredientsRequest: true,
        // Сбрасываем статус наличия ошибок от предыдущего запроса
        // на случай, если он был и завершился с ошибкой
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
                ...state,
                // Запрос выполнился успешно, помещаем полученные данные в хранилище
                ingredients_redux: action.ingredients_redux,
                // Запрос закончил своё выполнение
                ingredientsRequest: false
            };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
                ...state,
                // Запрос выполнился с ошибкой,
                // выставляем соответствующие значения в хранилище
                ingredientsFailed: true,
                // Запрос закончил своё выполнение
                ingredientsRequest: false
            };
    }
    default: {
      return state;
    }
  }
};
