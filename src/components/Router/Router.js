import React from 'react';
import {Redirect, Route, Switch, useLocation} from "react-router";
import {coordinate_page, city_page, human_page, start_page} from "../../modules/api";
import {StartPage} from "../../pages/StartPage/StartPage";
import {ContentPage} from "../../pages/ContentPage/ContentPage";


export const Router = (children, ...props) => {
    const location = useLocation();

    return (
        <Switch>
            {/*<Route*/}
            {/*    exact*/}
            {/*    path={[*/}
            {/*        person_page,*/}
            {/*        location_page,*/}
            {/*        coordinate_page*/}
            {/*    ]}*/}
            {/*>*/}
            {/*    <Redirect to={`/${location.pathname}/1`} />*/}
            {/*</Route>*/}
            <Route exact path={'/'}>
                <Redirect to={start_page}/>
            </Route>
            <Route exact path={start_page}>
                <StartPage/>
            </Route>
            <Route
                exact
                path={[
                    `${city_page}/:id(\\d)`,
                    `${human_page}/:id(\\d+)`,
                    `${coordinate_page}/:id(\\d+)`
                ]}
            >
            <ContentPage/>
            </Route>
            <Route>
                <Redirect to={start_page} />
            </Route>
            {/*{children}*/}
        </Switch>
    );
};

