import React, { useEffect, useState } from 'react';
import logo from 'assets/image/desklab.png';
import NavDrawer from '@elevenia/master-ui/components/Molecules/NavDrawer';
import { Segment } from '@elevenia/master-ui/components/Atom';
import ListSidebar from 'config/Menu'

const Sidebar = (props) => {
    const { NavTrees } = ListSidebar();
    const [path, setPath] = useState("");
    useEffect(() => {
        const explodeURIS = props.location.pathname.split('/');
        const fixUri = explodeURIS.filter(pressUri => pressUri !== "")
        const active = fixUri[fixUri.length - 1] ? fixUri[1] : "home";
        setPath(active);
    }, [props.location.pathname])

    return (
        <aside>
            <Segment p={8}>
                <Segment display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} mb={24} pt={8}>
                    <img src={logo} alt="Logo" style={{ width: '100%', maxWidth: 154 }} />
                </Segment>
                <Segment bg="white" s mb={30}>
                    {
                        <NavDrawer
                            tree={NavTrees}
                            activeNav={path}
                            className={"nav-drawer"}
                        />
                    }
                </Segment>
            </Segment>
        </aside>
    )
}

export default Sidebar