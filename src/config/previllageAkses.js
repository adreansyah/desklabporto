import { useSelector } from "react-redux"
import Routes from 'config/Route'

export const PrevillageAkses = () => {
    const previllageUrl = useSelector(state => state.menuList.menu)
    let isMappingPrevillageUrl = [];
    let getRoutesPrevillageURL = [];
    previllageUrl.forEach(isRoutesUrl => {
        isRoutesUrl.children.length ? isMappingPrevillageUrl.push(...isRoutesUrl.children) : isMappingPrevillageUrl.push(isRoutesUrl)
    })
    const menus = isMappingPrevillageUrl.map(getItemLink => getItemLink.label)
    const notFound = Routes.private.filter(item => item.name === "Page Not Found");
    menus.push("Home")
    menus.forEach(item => {
        Routes.private.forEach(itemRoutes => {
            if ((itemRoutes.name === item)) {
                getRoutesPrevillageURL = [...getRoutesPrevillageURL, itemRoutes]
            }
        })
    })
    getRoutesPrevillageURL.push(...notFound);
    const isPrevillage = getRoutesPrevillageURL.length !== 2 ? getRoutesPrevillageURL : []
    return {
        isPrevillage
    }
}
