import mainApi from "../../utils/MainApi";

// Получение списка ингредиентов от API.
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';

// Наш первый thunk
export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS
    })
    mainApi.getIngredients()
    .then(res  => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients_redux: res.data
      })
    }).catch(err => {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        })
    })
  }
}