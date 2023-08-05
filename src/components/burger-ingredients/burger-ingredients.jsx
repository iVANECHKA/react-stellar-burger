import { useEffect } from "react";
import { PropTypes, func } from 'prop-types';
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tabs from "../tabs/tabs.jsx";
import Ingredient from "../ingredient/ingredient.jsx";
import styles from "./burger-ingredients.module.css";
import { tabsNavigationSlice } from "../../services/tabs-navigation-slice.js";
import { getData } from "../../services/store-selectors.js";


function BurgerIngredients({ handleIngredientDetails }) {

    const tabData = [
        { value: "Булки", label: "Булки" },
        { value: "Соусы", label: "Соусы" },
        { value: "Начинки", label: "Начинки" },
      ];

    const dispatch = useDispatch();
    const { data } = useSelector(getData);

    const containerRef = useRef(null);
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const headerRefs = [bunRef, sauceRef, mainRef];

        const handleScroll = () => {
            const containerTop = container.getBoundingClientRect().top;
            const scrollPosition = window.scrollY;

            const distances = headerRefs.map((ref) => {
                const header = ref.current;
                if (header) {
                    const headerTop = header.getBoundingClientRect().top;
                    const distance = Math.abs(headerTop - containerTop - scrollPosition);
                    return distance;
                }
                return Infinity;
            });

            const minDistanceIndex = distances.indexOf(Math.min(...distances));
            dispatch(tabsNavigationSlice.actions.selectTab(tabData[minDistanceIndex].value));
        };

        container.addEventListener("scroll", handleScroll);
        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, [dispatch, tabData]);


    const scrollToHeader = (tabValue) => {
        const headerRef = tabValue === "Булки" ? bunRef.current :
            tabValue === "Соусы" ? sauceRef.current :
                tabValue === "Начинки" ? mainRef.current : null;

        if (headerRef && containerRef.current) {
            const containerTop = containerRef.current.getBoundingClientRect().top;
            const headerTop = headerRef.getBoundingClientRect().top;
            const scrollTop = headerTop - containerTop + containerRef.current.scrollTop;
            containerRef.current.scrollTo({
                top: scrollTop,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className={`${styles.wrapper} pt-10`}>
            <h1 className={`text text_type_main-large mb-5`}>Соберите бургер</h1>
            <Tabs tabData={tabData} onTabClick={scrollToHeader} />

            <div ref={containerRef} className={styles.ingredients}>

                <div className={`${styles.ingredientType} pt-6`}>
                    <h2
                        id={"Булки"}
                        className={`text text_type_main-medium `}
                        ref={bunRef}
                    >Булки</h2>
                    <div className={styles.ingredientWrapper}>
                        {data.map((item) => {
                            if (item.type === "bun") {
                                return (
                                    <Ingredient
                                        key={item._id}
                                        item={item}
                                        onClick={() => handleIngredientDetails(item)}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>

                <div className={`${styles.ingredientType} pt-6`}>
                    <h2
                        id={"Соусы"}
                        className={`text text_type_main-medium `}
                        ref={sauceRef}
                    >Соусы</h2>
                    <div className={styles.ingredientWrapper}>
                        {data.map((item) => {
                            if (item.type === "sauce") {
                                return (
                                    <Ingredient
                                        key={item._id}
                                        item={item}
                                        onClick={() => handleIngredientDetails(item)}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>

                <div className={`${styles.ingredientType} pt-6`}>
                    <h2
                        id={"Начинки"}
                        className={`text text_type_main-medium `}
                        ref={mainRef}
                    >Начинки</h2>
                    <div className={`${styles.ingredientWrapper} `}>
                        {data.map((item) => {
                            if (item.type === "main") {
                                return (
                                    <Ingredient
                                        key={item._id}
                                        item={item}
                                        onClick={() => handleIngredientDetails(item)}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}

BurgerIngredients.propTypes = {
    handleIngredientDetails: func.isRequired,
};

export default BurgerIngredients;