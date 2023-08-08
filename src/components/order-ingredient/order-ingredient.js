import React from "react";
import PropTypes from "prop-types";
import orderIngredient from "./order-ingredient.module.css";
import { ingredientPropTypes } from "../../utils/types";

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
}

OrderIngredient.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  index: PropTypes.number.isRequired,
  isLast: PropTypes.bool,
  remain: PropTypes.number,
  isFeedPage: PropTypes.bool,
};
