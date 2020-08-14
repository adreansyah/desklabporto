import { useSelector } from 'react-redux'
const ListSidebar = () => {
    const Trees = useSelector(state => state.menuList.menu);
    return {
        NavTrees: Trees
    }
}

export default ListSidebar