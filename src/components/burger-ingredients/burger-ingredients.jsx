import styles from "./burger-ingredients.module.css";
import Tabs from "../tabs/tabs.jsx";
import Ingredient from "../ingredient/ingredient";
function BurgerIngredients({ data }) {

    return (
        <section className={`${styles.wrapper} pt-10`}>
            <h1 className={`text text_type_main-large mb-5`}>Соберите бургер</h1>
            <Tabs />
            <div className={`${styles.ingredients} `}>

                <div className={`${styles.ingredientType} pt-6`}>
                    <h2 className={`text text_type_main-medium`}>Булки</h2>
                    <div className={`${styles.ingredientWrapper}`}>
                        {data.map((item) => {
                            if (item.type === "bun") {
                                return (
                                    <Ingredient
                                        key={item._id}
                                        image={item.image}
                                        name={item.name}
                                        price={item.price}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>

                <div className={`${styles.ingredientType} pt-6`}>
                    <h2 className={`text text_type_main-medium`}>Соусы</h2>
                    <div className={`${styles.ingredientWrapper}`}>
                        {data.map((item) => {
                            if (item.type === "sauce") {
                                return (
                                    <Ingredient
                                        key={item._id}
                                        image={item.image}
                                        name={item.name}
                                        price={item.price}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>

                <div className={`${styles.ingredientType} pt-6`}>
                    <h2 className={`text text_type_main-medium`}>Начинки</h2>
                    <div className={`${styles.ingredientWrapper}`}>
                        {data.map((item) => {
                            if (item.type === "main") {
                                return (
                                    <Ingredient
                                        key={item._id}
                                        image={item.image}
                                        name={item.name}
                                        price={item.price}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>

            </div>
        </section>
    )
}

export default BurgerIngredients;