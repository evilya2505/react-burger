import page from "./page.module.css";
import IngredientDetails from "../components/ingredient-details/ingredient-details";

const IngredientPage: React.FC = ({}): JSX.Element => {
  return (
    <div className={`${page.page} ${page.pageCenter}`}>
      <IngredientDetails />
    </div>
  );
};

export default IngredientPage;
