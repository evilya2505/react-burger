import React from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import constructorIngredient from "./constructor-ingredient.module.css";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredientItem } from "../../services/types/data";

interface IConstructorIngredientProps {
  item: TIngredientItem;
  index: number;
  handleDeleteIngredient: (index: number, ingredient: TIngredientItem) => void;
  swapItems: (dragIndex: number, hoverIndex: number) => void;
}

const ConstructorIngredient: React.FC<IConstructorIngredientProps> = ({
  item,
  index,
  handleDeleteIngredient,
  swapItems,
}: IConstructorIngredientProps): JSX.Element => {
  const ref = React.useRef<HTMLLIElement>(null);

  const [, drop] = useDrop({
    accept: "constructor-item",
    hover(item: any, monitor: DropTargetMonitor) {
      console.log(item);
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();

      if (mousePosition !== null) {
        const hoverClientY = mousePosition.y - hoveredRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

        swapItems(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
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

  function handleClickOnDeleteIngredient(index: number, item: TIngredientItem) {
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
};

export default ConstructorIngredient;
