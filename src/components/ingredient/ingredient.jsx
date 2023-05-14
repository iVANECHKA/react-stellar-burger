import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';


function Ingredient(props) {



  return (
    <div className={styles.wrapper}>
      <img src={props.image} alt={props.name} />
      <div className={`${styles.price} mt-1 mb-1`}>
        <span className="text text_type_digits-default">{props.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{props.name}</p>
    </div>
  );

}


export default Ingredient;