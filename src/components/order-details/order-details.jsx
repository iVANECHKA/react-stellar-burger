import styles from "./order-details.module.css";
import orderAcceptedImage from "../../images/order-accepted.svg";
import PropTypes from 'prop-types';


function OrderDetails({ orderID }) {
  return (
    <div className={`${styles.wrapper} mt-30 mb-30`}>
      <h1 className={`text text_type_digits-large mb-8`}>{orderID}</h1>
      <p className={`${styles.text} text text_type_main-medium`}>идентификатор заказа</p>
      <img className={`mt-15 mb-15`} src={orderAcceptedImage} alt="Заказ подтверждён" />
      <p className={`${styles.text} text text_type_main-default mb-2`}>Ваш заказ начали готовить</p>
      <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

OrderDetails.propTypes = {
  orderID: PropTypes.string.isRequired,
};

export default OrderDetails;