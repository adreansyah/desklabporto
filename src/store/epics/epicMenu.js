import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'
import { camelCaseToDash, capitalize } from 'helper/Generics'

export const RequestMenuLists = (action$, store) =>
    action$.pipe(
        ofType('REQUEST_MENU_LIST', 'REQUEST_MENU_LIST_BY_USER', 'REQUEST_CREATE_MENU_LIST', 'REQUEST_UPDATE_MENU_LIST'),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_MENU_LIST_BY_USER':
                        const rawResponseMenuUSer = await Services().get('/services/eofmnu/api/menu-trees/me');
                        return dispatch => {
                            const defaults = [{
                                id: null,
                                key: "home",
                                icon: "home",
                                label: "Home",
                                link: "/",
                                children: []
                            }]
                            const menuPrevillage = rawResponseMenuUSer.data.map((item, index) => {
                                return {
                                    authorities: item.authorities,
                                    id: item.id,
                                    key: camelCaseToDash(item.menu),
                                    icon: item.menuIcon,
                                    label: capitalize(item.menu),
                                    link: item.pageUri === null ? null : item.pageUri,
                                    children: item.childs.map((child, index) => {
                                        return {
                                            authorities: child.authorities,
                                            id: item.id,
                                            menuId: child.id,
                                            key: camelCaseToDash(child.menu),
                                            icon: '',
                                            label: child.menu,
                                            link: `/${camelCaseToDash(item.menu)}/${camelCaseToDash(child.pageUri === null ? "noParam" : child.pageUri)}`,
                                            parent: item.menu ? item.menu.toLowerCase() : '',
                                            children: []
                                        }
                                    })
                                }
                            })
                            dispatch({
                                type: 'GET_MENU_LIST_BY_USER',
                                payload: [...defaults, ...menuPrevillage]
                            })
                        }
                    case 'REQUEST_MENU_LIST':
                        const rawResponse = await Services().get('/services/eofmnu/api/m-menus', {
                            size: 100,
                            page: 0,
                            sort: 'sortOrder'
                        });
                        const data = rawResponse.data.content.filter((val) => val.isUse === true);
                        const childs = rawResponse.data.content.filter(val => val.parent === false);
                        let getParent = [];
                        let children = [];
                        data.forEach((val) => {
                            if (val.isUse && val.menuParentId === null) {
                                getParent = [...getParent, {
                                    authorities: val.authorities,
                                    id: val.id,
                                    key: camelCaseToDash(val.menuName),
                                    icon: val.menuIcon,
                                    label: capitalize(val.menuName),
                                    link: val.pageUri === null ? null : val.pageUri,
                                    children: []
                                }]
                            }
                        });
                        childs.forEach((val) => {
                            if (val.isUse) {
                                const nameFilter = val.menuParentName !== null ? val.menuParentName : "noParam"
                                children = [...children, {
                                    authorities: val.authorities,
                                    id: val.menuParentId,
                                    menuId: val.id,
                                    key: camelCaseToDash(val.menuName),
                                    icon: '',
                                    label: val.menuName,
                                    link: `/${camelCaseToDash(nameFilter)}/${camelCaseToDash(val.pageUri === null ? "noParam" : val.pageUri)}`,
                                    parent: val.menuParentName ? val.menuParentName.toLowerCase() : '',
                                    children: []
                                }]
                            }
                        })
                        return dispatch => {
                            dispatch({
                                type: 'GET_MENU_LIST',
                                payload: {
                                    parent: getParent,
                                    child: children,
                                    isList: data
                                },
                            })
                            dispatch({
                                type: "REQUEST_MENU_LIST_BY_USER"
                            })
                        }
                    case "REQUEST_CREATE_MENU_LIST":
                        await Services().post('/services/eofmnu/api/m-menus', action.payload.mMenuDTO);
                        return dispatch => {
                            dispatch({ type: "ALERT_TOAST_SUCCESS", payload: { message: "Create Menu Success" } });
                            dispatch({ type: "REQUEST_MENU_LIST" });
                        }
                    case "REQUEST_UPDATE_MENU_LIST":
                        await Services().put('/services/eofmnu/api/m-menus', action.payload.mMenuDTO);
                        return dispatch => {
                            dispatch({ type: "ALERT_TOAST_SUCCESS", payload: { message: "Update Menu Success" } });
                            dispatch({ type: "REQUEST_MENU_LIST" });
                        }
                    default:
                        break
                }
            } catch (e) {
                const { message } = e
                return dispatch => {
                    dispatch({ type: "ALERT_ERROR", payload: { message: message } })
                }
            }
        }),
    )
