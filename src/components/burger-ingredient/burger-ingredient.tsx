import burgerIngredient from "./burger-ingredient.module.css";
import { useDrag } from "react-dnd";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, Link } from "react-router-dom";
import { TIngredientItem } from "../../services/types/data";
import { useSelector } from "../../services/hooks";

interface IBurgerIngredientProps {
  item: TIngredientItem;
  handleIngredientClick: (ingredient: TIngredientItem) => void;
}

const BurgerIngredient: React.FC<IBurgerIngredientProps> = ({
  item,
  handleIngredientClick,
}: IBurgerIngredientProps): JSX.Element => {
  const location = useLocation();

  const cartIngredients = useSelector(
    (store) => store.burgerConstructor.ingredients
  );
  const cartBun = useSelector(
    (store) => store.burgerConstructor.bun
  );
  const id = item._id;
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { id },
  });

  function handleIngredientCardClick() {
    handleIngredientClick(item);
  }

  return (
    <Link
      className={burgerIngredient.linkItem}
      key={id}
      to={`/ingredients/${id}`}
      state={{ background: location }}
    >
      <li
        ref={dragRef}
        key={id}
        className={`${burgerIngredient.listItem} pb-5 pr-4 pl-4`}
        onClick={handleIngredientCardClick}
      >
        {(cartIngredients.includes(item) || cartBun === item) && (
          <Counter
            count={
              item.type !== "bun"
                ? cartIngredients.reduce((stack, value) => {
                    if (value === item) stack += 1;
                    return stack;
                  }, 0)
                : 1
            }
            size="default"
            extraClass="m-1"
          />
        )}
        <img
          src={item.image}
          alt={`изображение ингредиента ${item.name}`}
          className={`${burgerIngredient.img} mb-2`}
        />
        <div className={burgerIngredient.subtitle}>
          <div className={`${burgerIngredient.priceContainer} mb-2`}>
            <h3 className="text text_type_digits-default mr-2">{item.price}</h3>
            <CurrencyIcon type="primary" />
          </div>
          <p className="text text_type_main-small">{item.name}</p>
        </div>
      </li>
    </Link>
  );
};

export default BurgerIngredient;
