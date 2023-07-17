import page from "./page.module.css";
import IngredientDetails from "../components/ingredient-details/ingredient-details";

export default function IngredientPage() {
  return (
    <div className={`${page.page} ${page.pageCenter}`}>
      <IngredientDetails />
    </div>
  );
}
