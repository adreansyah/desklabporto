import React from 'react'
import { Segment, Text } from '@elevenia/master-ui/components/Atom'
import { useAlertToast } from 'hooks';
import TableLeaveBalance from './TableLeaveBalance';

const LeaveBalance = (props) => {
    document.title = props.title;
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
            <Segment justifyContent={'space-between'} alignItems={'center'} mb={32}>
                <Text H28>{document.title}</Text>
            </Segment>
            <TableLeaveBalance />
        </Segment>
    )
}
export default LeaveBalance