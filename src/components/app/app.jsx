import React, { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor"
import BurgerIngredients from "../burger-ingredients/burger-ingredients"
import styles from "./app.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {

  const [data, setData] = React.useState([]);


  const [isModalOpen, setModal] = useState();
  const [orderDetailsOpen, setOrderDetailsOpen] = React.useState(false);
  const [ingredientDetailOpen, setIngredientDetailsOpen] = React.useState(false);
  const [selectedIngredient, setSelectedIngredient] = React.useState();


  const api = 'https://norma.nomoreparties.space/api/ingredients';
  const orderID = '034536';
  useEffect(() => {
    fetch(api)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [api]);


  function handleOrderDetailsOpen() {
    setModal(true);
    setOrderDetailsOpen(true);
  }

  function handleOrderDetailsClose() {
    setModal(false);
    setOrderDetailsOpen(false);
  }

  function handleIngredientDetailsOpen(ingredient) {
    setSelectedIngredient(ingredient);
    setModal(true);;
    setIngredientDetailsOpen(true);
  }

  function handleIngredientDetailsClose() {
    setModal(false);
    setIngredientDetailsOpen(false);
  }



  const modal = isModalOpen && orderDetailsOpen ?
    (
      <Modal onClose={handleOrderDetailsClose}>
        <OrderDetails orderID={orderID} />
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
        <BurgerIngredients data={data} handleIngredientDetails={handleIngredientDetailsOpen} />
        <BurgerConstructor data={data} handleOrderDetailsOpen={handleOrderDetailsOpen} />
      </main>
      {modal}
    </>
  );
}

export default App;
