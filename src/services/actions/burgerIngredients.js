import mainApi from "../../utils/MainApi";

// Получение списка ингредиентов от API.
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';

// Наш первый thunk
export function getIngredients() {
  // Воспользуемся первым аргументом из усилителя redux-thunk — dispatch
  return function(dispatch) {
    // Проставим флаг в хранилище о том, что мы начали выполнять запрос
    // Это нужно, чтоб отрисовать в интерфейсе лоадер или заблокировать
    // ввод на время выполнения запроса
    dispatch({
      type: GET_INGREDIENTS
    })
    // Запрашиваем данные у сервера
    mainApi.getIngredients()
    .then( res  => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients_redux: res.data
      })
    }).catch( err => {
        // Если сервер не вернул данных, также отправляем экшен об ошибке
        dispatch({
          type: GET_INGREDIENTS_FAILED
        })
    })
  }
}