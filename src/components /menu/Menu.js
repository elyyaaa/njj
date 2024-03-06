import React from 'react';
import {NavLink} from "react-router-dom";
import classes from "./Menu.module.css";


const Menu = () => {
    return (
        <div>
            <ul className={classes.ull}>
                <li>
                    <NavLink to="/form" className={({ isActive }) => isActive ? classes.active : ""}>
                        Главная
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/pokemon-class" className={({ isActive }) => isActive ? classes.active : ""}>
                        Покемоны
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/count" className={({ isActive }) => isActive ? classes.active : ""}>
                        Счетчик
                    </NavLink>

                </li>
                <li>
                    <NavLink to="/users" className={({ isActive }) => isActive ? classes.active : ""}>
                        Пользователь
                    </NavLink>
                </li>

            </ul>

        </div>
    );
};

export default Menu;