import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { getCurrentIngredients } from "../../services/store-selectors.js";
import PropTypes from 'prop-types';


function Ingredient({ item, onClick }) {

  const { count } = useSelector(getCurrentIngredients);

  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: ({ item, source: "ingredients" }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div className={styles.wrapper} onClick={onClick} ref={dragRef}>
      {count[item._id] > 0 && <Counter count={count[item._id]} size="default" />}
      <img className={styles.img} src={item.image} alt={item.name} />
      <div className={`${styles.price} mt-1 mb-1`}>
        <span className="text text_type_digits-default">{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{item.name}</p>
    </div>
  );

}

Ingredient.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Ingredient;