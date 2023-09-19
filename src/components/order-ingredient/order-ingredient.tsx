import React from "react";
import orderIngredient from "./order-ingredient.module.css";
import { TIngredientItem } from "../../services/types/data";

interface IOrderIngredientProps {
  ingredient: TIngredientItem;
  index: number;
  isLast?: boolean;
  remain?: number;
  isFeedPage?: boolean;
}

const OrderIngredient: React.FC<IOrderIngredientProps> = ({
  ingredient,
  index,
  isLast,
  remain,
  isFeedPage,
}: IOrderIngredientProps): JSX.Element => {
  const styles: React.CSSProperties = {
    zIndex: `${100 - index}`,
    marginRight: "-16px",
  };
  return (
    <div
      className={orderIngredient.ingredientWrap}
      style={isFeedPage ? styles : undefined}
    >
      <div className={orderIngredient.ingredient}>
        <img
          className={orderIngredient.ingredientImage}
          src={ingredient.image_mobile}
          alt={`изображение ${ingredient.name}`}
        ></img>

        {isLast && (
          <div className={orderIngredient.ingredientOverlay}>
            <p className="text text_type_digits-default">{`+${remain}`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderIngredient;
