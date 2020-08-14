import React, { useEffect, Suspense } from 'react';
import { PublicRoute, PrivateRoute } from 'helper';
import { Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { DefaultLayout } from 'layout';
import Routes from 'config/Route';

const history = createBrowserHistory()

const App = () => {
    useEffect(() => {
        history.listen((location, action) => {
            // console.log(location, action, 'a')
            /**
             * listen history (can use redux clear in here: component will unmount alternative )
             */
        })
    }, [])

    const loading = () => (
        <></>
    )
    return (
        <Router basename="/" history={history}>
            <Suspense fallback={loading()}>
                <Switch>
                    {Routes.public.map((route, idx) => {
                        return route.component ? (
                            <PublicRoute
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                component={props => {
                                    return <route.component {...props} title={route.name} />
                                }}
                            />
                        ) : null
                    })}
                    <PrivateRoute path="/" component={DefaultLayout} />
                </Switch>
            </Suspense>
        </Router>
    )
}

export default App
