import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor"
import BurgerIngredients from "../burger-ingredients/burger-ingredients"
import styles from "./app.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { fetchData } from "../../services/data-slice.js";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder } from "../../services/order-slice.js";
import { selectedIngredientSlice } from "../../services/selected-ingredient-slice.js";
import { orderSlice } from "../../services/order-slice.js";
import { getCurrentIngredients, getCurrentOrder, getData, getSelectedIngredient } from "../../services/store-selectors.js";
import { useModal } from "../../hooks/use-modal.js";

const api = 'https://norma.nomoreparties.space/api/';

function App() {
  const dispatch = useDispatch();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [orderDetailsOpen, setOrderDetailsOpen] = React.useState(false);
  const [ingredientDetailOpen, setIngredientDetailsOpen] = React.useState(false);
  const { selectedIngredient } = useSelector(getSelectedIngredient);
  const { order } = useSelector(getCurrentOrder);
  const data = useSelector(getData);
  const currentIngredients = useSelector(getCurrentIngredients);

  useEffect(() => {
    if (data.data.length === 0) {
      dispatch(fetchData(api));
    }
  }, [api]);

  function handlePlaceOrder() {
    dispatch(placeOrder(api, currentIngredients));
  };


  async function handleOrderDetailsOpen() {
    try {
      handlePlaceOrder();
      openModal();
      setOrderDetailsOpen(true);
    } catch (err) {
      console.log(err);
    }
  }

  function handleOrderDetailsClose() {
    openModal();
    setOrderDetailsOpen(false);
    dispatch(orderSlice.actions.resetOrder());
  }

  function handleIngredientDetailsOpen(item) {
    dispatch(selectedIngredientSlice.actions.mountIngredient(item));
    openModal();
    setIngredientDetailsOpen(true);
  }

  function handleIngredientDetailsClose() {
    closeModal();
    setIngredientDetailsOpen(false);
    dispatch(selectedIngredientSlice.actions.unmountIngredient());
  }



  const modal = isModalOpen && orderDetailsOpen && order ?
    (
      <Modal onClose={handleOrderDetailsClose}>
        {order.loading ? (
          <p>Загрузка...</p>
        ) : (
          <OrderDetails orderNumber={order.number} />
        )}
      </Modal>
    ) : isModalOpen && ingredientDetailOpen ?
      (
        <Modal onClose={handleIngredientDetailsClose}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      ) : null;




  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients handleIngredientDetails={handleIngredientDetailsOpen} />
          <BurgerConstructor handleOrderDetailsOpen={handleOrderDetailsOpen} />
        </DndProvider>
      </main>
      {modal}
    </>
  );
}

export default App;
