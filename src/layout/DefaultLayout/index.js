import React, { Suspense, useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
// import { DynamicRoute } from 'helper'
import HeaderBlock from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { PrevillageAkses } from 'config/previllageAkses'
import { Segment } from '@elevenia/master-ui/components/Atom'
import { useAction } from 'hooks'
import { requestMenuListByUser, requestMenuList } from 'store/actions/menu'
import { useSelector } from 'react-redux';
import { requestLoginInfo } from 'store/actions/authentication'

const Layout = props => {
    const { hasFetch } = useAction();
    const { isPrevillage } = PrevillageAkses()
    const loading = () => (
        <></>
    )
    const [showMenu, setShowMenu] = useState(false)
    const handleMenu = e => {
        setShowMenu(!showMenu)
    }
    useEffect(() => {
        hasFetch(requestMenuListByUser());
        hasFetch(requestMenuList())
    }, [hasFetch])
    const userInfo = useSelector(state => state.authentication.userInfo);
    useEffect(() => {
        if (userInfo === null) {
            hasFetch(requestLoginInfo())
        }
    }, [userInfo, hasFetch])
    return (
        <>
            <div className={`grid-container ${showMenu ? 'is-closed' : ''}`}>
                <Sidebar {...props} list={[]} />
                <main>
                    <HeaderBlock {...props} click={e => handleMenu(e)} userInfo={userInfo} />
                    <Segment p={16}>
                        <Suspense fallback={loading()}>
                            <Switch>
                                {isPrevillage.map((route, idx) => {
                                    return route.component ? (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={props => {
                                                return <route.component {...props} title={route.name} />
                                            }}
                                        />
                                    ) : null
                                })}
                                {/* <Route render={(props) => <DynamicRoute {...props} />} /> */}
                            </Switch>
                        </Suspense>
                    </Segment>
                </main>
            </div>
            <Footer />
        </>
    )
}

export default Layout