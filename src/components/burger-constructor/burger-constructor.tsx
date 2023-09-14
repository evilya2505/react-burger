import React from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructor from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";
import { TIngredientItem } from "../../services/types/data";
import { RootState } from "../../services/types";

interface IBurgerConstructorProps {
  total: number;
  handleMakeOrderButton: () => void;
  handleDropConstructorItem: (ingredientId: string) => void;
  handleDeleteIngredient: (index: number, ingredient: TIngredientItem) => void;
  swapItems: (dragIndex: number, hoverIndex: number) => void;
}

interface IItemId {
  id: string;
}

const BurgerConstructor: React.FC<IBurgerConstructorProps> = ({
  total,
  handleMakeOrderButton,
  handleDropConstructorItem,
  handleDeleteIngredient,
  swapItems,
}: IBurgerConstructorProps): JSX.Element => {
  const cartIngredients = useSelector(
    (store: RootState) => store.burgerConstructor.ingredients
  );
  const cartBun = useSelector(
    (store: RootState) => store.burgerConstructor.bun
  );
  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(itemId: IItemId) {
      onDropHandler(itemId);
    },
  });

  function onDropHandler(itemId: IItemId) {
    handleDropConstructorItem(itemId.id);
  }

  function handleMakeOrderButtonClick() {
    handleMakeOrderButton();
  }

  return (
    <section className={burgerConstructor.burgerConstructor} ref={dropTarget}>
      <ul className={burgerConstructor.list}>
        {cartBun != null && cartBun._id !== "" && (
          <li className={`${burgerConstructor.listItem} mb-4 mr-5`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${cartBun.name} (верх)`}
              price={cartBun.price}
              thumbnail={cartBun.image}
            />
          </li>
        )}

        <div className={burgerConstructor.scrollArea}>
          {cartIngredients != null &&
            cartIngredients.map((item, index) => {
              if (item.name !== "") {
                return (
                  <ConstructorIngredient
                    key={item.uuid}
                    index={index}
                    item={item}
                    swapItems={swapItems}
                    handleDeleteIngredient={handleDeleteIngredient}
                  />
                );
              } else {
                return <></>;
              }
            })}
        </div>
        {cartBun != null && cartBun._id !== "" && (
          <li className={`${burgerConstructor.listItem} mb-4 mr-5`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${cartBun.name} (низ)`}
              price={cartBun.price}
              thumbnail={cartBun.image}
            />
          </li>
        )}
      </ul>
      <div className={`${burgerConstructor.total} mt-5`}>
        <div className={`${burgerConstructor.priceContainer} mr-10`}>
          <p className="text text_type_digits-medium mr-2">{total}</p>
          <CurrencyIcon type="primary" />
        </div>

        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleMakeOrderButtonClick}
          disabled={cartBun === null}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  total: PropTypes.number.isRequired,
  handleMakeOrderButton: PropTypes.func.isRequired,
  handleDropConstructorItem: PropTypes.func.isRequired,
  handleDeleteIngredient: PropTypes.func.isRequired,
  swapItems: PropTypes.func.isRequired,
};

export default BurgerConstructor;
