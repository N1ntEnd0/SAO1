import React from 'react';
import {useHistory} from "react-router";

export const StartPage = () => {
    const history = useHistory();

    const routes = [
        {

        }
    ]

    return (
        <div>
            <div>
                <h1>Лабораторная работа #1</h1>
                <h3>Чарный Н.О.</h3>
                <h4>Вариант2012</h4>
            </div>
            <div>
                {routes.map(route =>
                    <div>

                        <div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
