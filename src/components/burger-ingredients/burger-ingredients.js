import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInView } from "react-intersection-observer";
import React from "react";
import burgerIngerdients from "./burger-ingredients.module.css";
import BurgerIngredientType from "../burger-ingredient-type/burger-ingredient-type";
import PropTypes from "prop-types";

function BurgerIngredients({ handleIngredientClick }) {
  const [current, setCurrent] = React.useState("one");
  const [part1Ref, part1InView, part1] = useInView({ threshold: 0 });
  const [part2Ref, part2InView, part2] = useInView({ threshold: 0 });
  const [part3Ref, part3InView, part3] = useInView({ threshold: 0 });

  React.useEffect(() => {
    part3InView && setCurrent("three");
    part2InView && setCurrent("two");
    part1InView && setCurrent("one");
  }, [part1InView, part2InView, part3InView]);

  function onLinkClick(n, entry) {
    setCurrent(n);
    entry.target.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className={burgerIngerdients.ingredients}>
      <div className={burgerIngerdients.menu}>
        <Tab
          href="/1"
          value="one"
          active={current === "one"}
          onClick={() => onLinkClick(1, part1)}
        >
          Булки
        </Tab>
        <Tab
          href="/2"
          value="two"
          active={current === "two"}
          onClick={() => onLinkClick(2, part2)}
        >
          Соусы
        </Tab>
        <Tab
          href="/3"
          value="three"
          active={current === "three"}
          onClick={() => onLinkClick(3, part3)}
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
}

BurgerIngredients.propTypes = {
  handleIngredientClick: PropTypes.func.isRequired,
};

export default BurgerIngredients;
