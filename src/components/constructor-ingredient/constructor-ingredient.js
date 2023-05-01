import React from "react";
import { useDrag, useDrop } from "react-dnd";
import constructorIngredient from "./constructor-ingredient.module.css";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientPropTypes from "../../utils/types";

function ConstructorIngredient({
  item,
  index,
  handleDeleteIngredient,
  swapItems,
}) {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: "constructor-item",
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      swapItems(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constructor-item",
    item: { ...item, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  function handleClickOnDeleteIngredient(index, item) {
    handleDeleteIngredient(index, item);
  }

  return (
    <li
      className={`${constructorIngredient.listItem} mb-4 mr-4`}
      ref={ref}
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      <div className="mr-2">
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => handleClickOnDeleteIngredient(index, item)}
      />
    </li>
  );
}

ConstructorIngredient.propTypes = {
  item: ingredientPropTypes.isRequired,
  index: PropTypes.number.isRequired,
  handleDeleteIngredient: PropTypes.func.isRequired,
  swapItems: PropTypes.func.isRequired,
};

export default ConstructorIngredient;
