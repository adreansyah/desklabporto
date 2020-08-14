import React from 'react';
import { Segment, Text, Button, Icon } from '@elevenia/master-ui/components/Atom';
import { useAlertToast, useSingleToggle } from 'hooks';
import AddVenue from './AddVenue';
import ModalSmall from 'component/ModalCustom/modalSmall';
import TableVenue from './TableVenue';
const Venue = (props) => {
    document.title = props.title
    const [open, setOpen] = useSingleToggle(false);
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
                <Button size="medium" onClick={() => setOpen(!open)} >
                    <Icon fillColor="white" size={16} name="plus" mr={4} />
                    Create
                </Button>
            </Segment>
            <TableVenue />
            <ModalSmall
                isOpen={open}
                onClose={() => setOpen(!open)}
                title={<Text className="u-tx-center">Create Venue</Text>}
                content={<AddVenue onClose={() => setOpen(!open)} />}
            />
        </Segment>
    )
}
export default Venue;