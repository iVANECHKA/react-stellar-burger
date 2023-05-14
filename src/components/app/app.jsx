import React from "react";
import { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor"
import BurgerIngredients from "../burger-ingredients/burger-ingredients"
import styles from "./app.module.css";

function App() {
  const [data, setData] = React.useState([]);
  const api = 'https://norma.nomoreparties.space/api/ingredients '
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

 

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data}/>
      </main>
    </>
  );
}

export default App;
