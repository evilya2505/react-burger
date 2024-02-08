import React from "react";
import ingredientDetails from "./ingredient-details.module.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "../../services/hooks";
import { ADD_INGREDIENT_ID } from "../../services/actions/ingredientsDetails";

function IngredientDetails() {
  let { id } = useParams();
  const ingredient = useSelector(
    (store) => store.ingredientsDetails.ingredient
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({
      type: ADD_INGREDIENT_ID,
      ingredient_id: id,
    });
  }, [id, dispatch]);

  return (
    <div className={`${ingredientDetails.card} pr-10 pl-10`}>
      <h1 className={`text text_type_main-large mb-5`}>Детали ингредиента</h1>
      <div className={ingredientDetails.container}>
        <img
          className={`${ingredientDetails.image} mb-4`}
          src={ingredient?.image_large}
          alt={`изображение ингредиента ${ingredient?.name}`}
        ></img>
        <h2 className="text text_type_main-medium mb-8">{ingredient?.name}</h2>
        <table className={ingredientDetails.foodEnergy}>
          <thead>
            <tr>
              <th
                className={`text text_type_main-default text_color_inactive ${ingredientDetails.foodEnergyItem}`}
              >
                Калории,ккал
              </th>
              <th
                className={`text text_type_main-default text_color_inactive ${ingredientDetails.foodEnergyItem}`}
              >
                Белки, г
              </th>
              <th
                className={`text text_type_main-default text_color_inactive ${ingredientDetails.foodEnergyItem}`}
              >
                Жиры, г
              </th>
              <th
                className={`text text_type_main-default text_color_inactive ${ingredientDetails.foodEnergyItem}`}
              >
                Углеводы, г
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                className={`text text_type_main-default text_color_inactive ${ingredientDetails.foodEnergyItem}`}
              >
                {ingredient?.calories}
              </td>
              <td
                className={`text text_type_main-default text_color_inactive ${ingredientDetails.foodEnergyItem}`}
              >
                {ingredient?.proteins}
              </td>
              <td
                className={`text text_type_main-default text_color_inactive ${ingredientDetails.foodEnergyItem}`}
              >
                {ingredient?.fat}
              </td>
              <td
                className={`text text_type_main-default text_color_inactive ${ingredientDetails.foodEnergyItem}`}
              >
                {ingredient?.carbohydrates}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IngredientDetails;
