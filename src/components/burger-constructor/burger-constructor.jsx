import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import PropTypes from 'prop-types';
import { ingredientsSlice } from "../../services/ingredients-slice";
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import DraggableIngredient from "../draggable-ingredient/draggable-ingredient.jsx";
import { getCurrentIngredients, getData } from "../../services/store-selectors.js";

function BurgerConstructor({ handleOrderDetailsOpen }) {

  const dispatch = useDispatch();
  const currentIngredients = useSelector(getCurrentIngredients);
  const { data } = useSelector(getData);


  const totalPrice = currentIngredients.ingredients.reduce((acc, ingredient) => {
    return acc + ingredient.price;
  }, 0) + (currentIngredients.bun ? currentIngredients.bun.price * 2 : 0);


  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop({ item, source }) {

      if (item.type === "bun") {
        dispatch(ingredientsSlice.actions.changeBun(item));
      }

      if (source === "ingredients" && item.type !== "bun") {
        const uuid = uuidv4();
        dispatch(ingredientsSlice.actions.addIngredient({ item, uuid }));
      }
    },

    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const moveCard = useCallback((sourceIndex, hoverIndex) => {
    dispatch(ingredientsSlice.actions.reorderIngredients({ sourceIndex, hoverIndex }));
  }, [])

  const handleClose = (item) => {
    dispatch(ingredientsSlice.actions.removeIngredient(item));
  };


  const ingredientsWrapperStyle = isHover ? `${styles.ingredients} ${styles.ingredientsHover}` : `${styles.ingredients}`;

  return (
    <section
      className={`${styles.wrapper} pt-25 pl-4 pr-4`}
    >
      <div className={ingredientsWrapperStyle} ref={dropTarget}>


        <ul className={styles.ingredientsTop}>
          {data.map((item) => {
            return currentIngredients.bun === item
              ? (
                <ConstructorElement
                  key={item._id}
                  type="top"
                  isLocked={true}
                  text={`${item.name} (верх)`}
                  price={item.price}
                  thumbnail={item.image}

                />
              )
              : null;
          })}

        </ul>


        <ul className={styles.ingredientsCenter} >
          {currentIngredients.ingredients.map((item, index) => {
            return item
              ? (
                <DraggableIngredient
                  key={item.uuid}
                  uuid={item.uuid}
                  item={item}
                  handleClose={handleClose}
                  index={index}
                  moveCard={moveCard} />
              )
              : null;
          })}
        </ul>

        <ul className={styles.ingredientsBottom}>
          {data.map((item) => {
            return currentIngredients.bun === item
              ? (
                <ConstructorElement
                  key={item._id}
                  type="bottom"
                  isLocked={true}
                  text={`${item.name} (низ)`}
                  price={item.price}
                  thumbnail={item.image}
                />
              )
              : null;
          })}
        </ul>
      </div>

      <div className={`${styles.totalPrice} mt-10`}>

        <div className={styles.totalPriceText}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="TIconTypes" />
        </div>
        <Button onClick={handleOrderDetailsOpen} type="primary" size="large" htmlType="submit">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}


BurgerConstructor.propTypes = {
  handleOrderDetailsOpen: PropTypes.func.isRequired,
};


export default BurgerConstructor;