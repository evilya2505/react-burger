import React from 'react';
import './Main.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import PropTypes from 'prop-types';

function Main(props: any) {
  return (
    <main className='main'>
        <h1 className='ingredients__title text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
        <div className='main__container'>
          <BurgerIngredients ingredients={props.ingredients} />
          <BurgerConstructor bun={props.ingredients[0]} ingredients={[props.ingredients[5],props.ingredients[4], props.ingredients[7], props.ingredients[8], props.ingredients[8]]}/>
        </div>
    </main>
  );
}

Main.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired
})).isRequired
};

export default Main;