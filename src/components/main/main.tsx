import React from "react";
import main from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TIngredientItem } from "../../services/types/data";

interface IMainProps {
  total: number;
  handleCurrentBurgerConstructor: (ingredient: TIngredientItem) => void;
  handleIngredientClick: (ingredient: TIngredientItem) => void;
  handleMakeOrderButton: () => void;
  handleDropConstructorItem: (ingredientId: string) => void;
  handleDeleteIngredient: (index: number, ingredient: TIngredientItem) => void;
  swapItems: (dragIndex: number, hoverIndex: number) => void;
}

function Main({
  total,
  handleCurrentBurgerConstructor,
  handleIngredientClick,
  handleMakeOrderButton,
  handleDropConstructorItem,
  handleDeleteIngredient,
  swapItems,
}: IMainProps) {
  return (
    <main className={main.main}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={main.container}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients
            handleIngredientClick={handleIngredientClick}
            handleCurrentBurgerConstructor={handleCurrentBurgerConstructor}
          />
          <BurgerConstructor
            swapItems={swapItems}
            total={total}
            handleDropConstructorItem={handleDropConstructorItem}
            handleMakeOrderButton={handleMakeOrderButton}
            handleDeleteIngredient={handleDeleteIngredient}
          />
        </DndProvider>
      </div>
    </main>
  );
}

export default Main;
