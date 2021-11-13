import React from 'react';
import {Redirect, Route, Switch, useLocation} from "react-router";
import {city_page, start_page} from "../../modules/api";
import {StartPage} from "../../pages/StartPage/StartPage";
import {ContentPage} from "../../pages/ContentPage/ContentPage";


export const Router = () => {

    return (
        <Switch>
            <Route exact path={'/'}>
                <Redirect to={start_page}/>
            </Route>
            <Route exact path={start_page}>
                <StartPage/>
            </Route>
            <Route
                exact
                path={`${city_page}/:id(\\d)`}
            >
                <ContentPage/>
            </Route>
            <Route>
                <Redirect to={start_page} />
            </Route>
        </Switch>
    );
};

