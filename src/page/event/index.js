import React from 'react';
import { Segment, Text } from '@elevenia/master-ui/components/Atom';
import TableEvent from './TableEvent';
import { useAlertToast } from 'hooks';

const Event = (props) => {
    document.title = props.title;
    const { ToastComponent } = useAlertToast({
        timeout: 3000,
        placement: 'center',
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
            <TableEvent />
        </Segment>
    )
}

export default Event