import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInView } from "react-intersection-observer";
import React from "react";
import burgerIngerdients from "./burger-ingredients.module.css";
import BurgerIngredientType from "../burger-ingredient-type/burger-ingredient-type";
import PropTypes from "prop-types";
import { TIngredientItem } from "../../services/types/data";

interface BurgerIngredientsState {
  current: "one" | "two" | "three";
}

interface IBurgerIngredientsProps {
  handleIngredientClick: (ingredient: TIngredientItem) => void;
  handleCurrentBurgerConstructor: (ingredient: TIngredientItem) => void;
}

const BurgerIngredients: React.FC<IBurgerIngredientsProps> = ({
  handleIngredientClick,
  handleCurrentBurgerConstructor,
}: IBurgerIngredientsProps): JSX.Element => {
  const [current, setCurrent] = React.useState<BurgerIngredientsState>({
    current: "one",
  });
  const [part1Ref, part1InView, part1] = useInView({ threshold: 0 });
  const [part2Ref, part2InView, part2] = useInView({ threshold: 0 });
  const [part3Ref, part3InView, part3] = useInView({ threshold: 0 });

  React.useEffect(() => {
    part3InView && setCurrent({ current: "three" });
    part2InView && setCurrent({ current: "two" });
    part1InView && setCurrent({ current: "one" });
  }, [part1InView, part2InView, part3InView]);

  function onLinkClick(
    n: BurgerIngredientsState,
    entry: IntersectionObserverEntry | undefined
  ) {
    setCurrent(n);
    entry?.target.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className={burgerIngerdients.ingredients}>
      <div className={burgerIngerdients.menu}>
        <Tab
          value="one"
          active={current.current === "one"}
          onClick={() => onLinkClick({ current: "one" }, part1)}
        >
          Булки
        </Tab>
        <Tab
          value="two"
          active={current.current === "two"}
          onClick={() => onLinkClick({ current: "two" }, part2)}
        >
          Соусы
        </Tab>
        <Tab
          value="three"
          active={current.current === "three"}
          onClick={() => onLinkClick({ current: "three" }, part3)}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${burgerIngerdients.items}`}>
        <div ref={part1Ref}>
          <BurgerIngredientType
            type="bun"
            handleIngredientClick={handleIngredientClick}
          />
        </div>
        <div ref={part2Ref}>
          <BurgerIngredientType
            type="sauce"
            handleIngredientClick={handleIngredientClick}
          />
        </div>
        <div ref={part3Ref}>
          <BurgerIngredientType
            type="main"
            handleIngredientClick={handleIngredientClick}
          />
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  handleIngredientClick: PropTypes.func.isRequired,
};

export default BurgerIngredients;
