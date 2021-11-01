import React from 'react';
import style from './Header.module.scss';
import {city_page, coordinate_page, human_page, start_page} from "../../modules/api";
import {useHistory, useLocation} from "react-router";

export const Header = () => {

    const history = useHistory();
    const location = useLocation();


    const routes = [
        {
            label: 'Start',
            link: start_page
        },
        {
            label: 'City',
            link: `${city_page}/1`
        }
        // ,
        // {
        //     label: 'Coordinate',
        //     link: `${coordinate_page}/1`
        // },
        // {
        //     label: 'Human',
        //     link: `${human_page}/1`
        // },
    ]

    const changePage = (route) => {
        // if(!location.pathname.includes(route.label.split('/')[1]))
        history.push(route.link)
    }

    return (
        <header className={style.Header}>
            <h1 className={style.Header__title}>
                Lab1
                <span className={style.Header__title__label}>
                    Чарный Н. О.
                </span>
            </h1>
            <div className={style.Header__menu}>
                {routes.map(route =>
                    <button
                    onClick={() => changePage(route)}>
                        {route.label}
                    </button>
                )}
            </div>
        </header>
    );
};

