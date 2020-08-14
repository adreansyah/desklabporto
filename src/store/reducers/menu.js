const initialState = {
    listMenu: [],
    menu: [],
    isMenu: [],
    loading: false
}

export const menuList = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_MENU_LIST':
            return {
                ...state,
                loading: true
            }
        case 'GET_MENU_LIST_BY_USER':
            return {
                ...state,
                loading: false,
                menu: action.payload,
            }
        case 'GET_MENU_LIST':
            let showMenus = [{
                id: null,
                key: "home",
                icon: "home",
                label: "Home",
                link: "/",
                children: []
            }];
            action.payload.parent.forEach((item) => {
                showMenus = [...showMenus, {
                    ...item,
                    children: action.payload.child.filter(val => val.id === item.id)
                }];
            })
            return {
                ...state,
                loading: false,
                isMenu: showMenus,
                listMenu: action.payload.isList
            }
        case 'GET_REFRESH_MENU_LIST':
            return {
                ...state,
                loading: false,
                listMenu: action.payload.isList
            }

        default:
            return state
    }
}