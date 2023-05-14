import {Button, ConstructorElement, DragIcon, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
function BurgerConstructor({data}) {
    return (
        <section
            className={'pt-25 pl-4 pr-4'}
        >
            <div className={styles.ingredients}>

                <ul className={styles.ingredientsTop}>
                    {data.map((item) => {
                        if (item.name === "Краторная булка N-200i")
                            return (
                                <ConstructorElement
                                    key={item._id}
                                    type="top"
                                    isLocked={true}
                                    text={`${item.name} (верх)`}
                                    price={item.price}
                                    thumbnail={item.image}
                                />
                            );
                    })}

                </ul>


                <ul className={styles.ingredientsCenter}>
                    {data.map((item) => {
                        if (item.type !== "bun")
                            return (
                                <li key={item._id} className={styles.dragDots}>
                                    <DragIcon type="TIconTypes" />
                                    <ConstructorElement
                                        isLocked={false}
                                        type="undefined"
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                    />
                                </li>
                            );
                    })}
                </ul>


                <ul className={styles.ingredientsBottom}>
                    {data.map((item) => {
                        if (item.name === "Краторная булка N-200i")
                            return (
                                <ConstructorElement
                                    key={item._id}
                                    type="bottom"
                                    isLocked={true}
                                    text={`${item.name} (низ)`}
                                    price={item.price}
                                    thumbnail={item.image}
                                />
                            );
                    })}
                </ul>
            </div>

            <div className={`${styles.totalPriceWrapper} mt-10`}>

                <div className={styles.totalPrice}>
                    <p className="text text_type_digits-medium">{610}</p>
                    <CurrencyIcon type="TIconTypes" />
                </div>
                <Button type="primary" size="large" htmlType="submit">
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

export default BurgerConstructor;