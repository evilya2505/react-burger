import React from "react";
import PropTypes from "prop-types";
import orderIngredient from "./order-ingredient.module.css";

export default function OrderIngredient({
  ingredient,
  index,
  isLast,
  remain,
  isFeedPage,
}) {
  const styles = {
    zIndex: `${100 - index}`,
    marginRight: "-16px",
  };
  return (
    <div
      className={orderIngredient.ingredientWrap}
      style={isFeedPage && styles}
    >
      <div className={orderIngredient.ingredient}>
        <img
          className={orderIngredient.ingredientImage}
          src={ingredient.image_mobile}
        ></img>

        {isLast && (
          <div className={orderIngredient.ingredientOverlay}>
            <p className="text text_type_digits-default">{`+${remain}`}</p>
          </div>
        )}
      </div>
    </div>
  );
}
