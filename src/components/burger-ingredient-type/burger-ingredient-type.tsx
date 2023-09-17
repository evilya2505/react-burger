import React from "react";
import burgerIngredientType from "./burger-ingredient-type.module.css";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { TIngredientItem } from "../../services/types/data";
import { useSelector } from "../../services/hooks";

interface IBurgerIngredientTypeProps {
  type: "bun" | "sauce" | "main";
  handleIngredientClick: (ingredient: TIngredientItem) => void;
}

const BurgerIngredientType: React.FC<IBurgerIngredientTypeProps> = ({
  type,
  handleIngredientClick,
}: IBurgerIngredientTypeProps): JSX.Element => {
  const ingredients = useSelector(
    (state) => state.burgerIngredients.ingredients_redux
  );

  function returnType() {
    let result = "";

    switch (type) {
      case "bun":
        result = "Булки";
        break;
      case "sauce":
        result = "Соусы";
        break;
      case "main":
        result = "Начинки";
        break;
      default:
        break;
    }

    return result;
  }

  return (
    <>
      <h2 className="text text_type_main-medium mb-6 mt-10">{returnType()}</h2>
      <ul className={burgerIngredientType.list}>
        {ingredients.map((item) => {
          if (item.type === type) {
            return (
              <BurgerIngredient
                item={item}
                key={item._id}
                handleIngredientClick={handleIngredientClick}
              />
            );
          } else {
            return null;
          }
        })}
      </ul>
    </>
  );
};

// BurgerIngredientType.propTypes = {
//   type: PropTypes.string.isRequired,
//   handleIngredientClick: PropTypes.func.isRequired,
// };

export default BurgerIngredientType;
