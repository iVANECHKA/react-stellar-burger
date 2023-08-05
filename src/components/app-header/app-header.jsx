import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <ul className={styles.menu}>
                    <li className={`${styles.menuItem} pl-5 pt-4 pr-5 pb-4`}>
                        <BurgerIcon type="TIconTypes" />
                        <p className="text text_type_main-default ml-2">Конструктор</p>
                    </li>
                    <li className={`${styles.menuItem} pl-5 pt-4 pr-5 pb-4`}>
                        <ListIcon type="TIconTypes" />
                        <p className="text text_type_main-default ml-2">Лента заказов</p>
                    </li>

                </ul>
            </nav>

            <div>
                <Logo />
            </div>

            <nav>
                <ul className={styles.menu}>
                    <li className={`${styles.menuItem} pl-5 pt-4 pr-5 pb-4`}>
                        <ProfileIcon type="TIconTypes" />
                        <p className="text text_type_main-default ml-2">Личный кабинет</p>
                    </li>
                </ul>
            </nav>



        </header>
    )
}

export default AppHeader;