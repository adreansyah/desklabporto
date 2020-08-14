import React from 'react';
import { Segment, Text } from '@elevenia/master-ui/components/Atom';
import { useAlertToast } from 'hooks';
import TableMenu from './TableMenu';
import CreateMenu from './CreateMenu';

const Menu = (props) => {
    document.title = props.title

    const { ToastComponent } = useAlertToast({
        timeout: 3000,
        placement: 'right',
        space: 10,
        animate: 'slide',
        m: 20,
    });

    return (
        <Segment>
            {ToastComponent}
            <Segment justifyContent={'space-between'} alignItems={'center'} mb={20}>
                <Text H28>{document.title}</Text>
            </Segment>
            <Segment mb={32}>
                <CreateMenu />
            </Segment>
            <TableMenu />
        </Segment>
    )
}
export default Menu;