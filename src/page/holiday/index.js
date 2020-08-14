import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Segment, Text, ButtonGroup, Button, Icon } from '@elevenia/master-ui/components/Atom';
import { useAlertToast, useMultiToogle, useAction } from 'hooks';
import ModalSmall from 'component/ModalCustom/modalSmall';
import TabelHoliday from './TableHoliday';
import Form from './HolidayForm';
import { requestDeleteHoliday } from 'store/actions/holiday';

const Holiday = (props) => {
    document.title = props.title
    const { hasFetch } = useAction()
    const { isToogle, toogler, onClose } = useMultiToogle({
        form: false,
        delete: false
    });
    const [dataEdit, setDataEdit] = useState(null)
    const { ToastComponent } = useAlertToast({
        timeout: 3000,
        placement: 'right',
        space: 10,
        animate: 'slide',
        m: 20,
    });

    const payload = useSelector(state => {
        return {
            params: state.leaveType.params
        }
    });

    const showFrom = () => {
        const isEvent = { target: { id: 'form' } }
        toogler.onClick(isEvent);
    }
    const onCloseFrom = () => {
        onClose('form')
        setDataEdit(null);
    }

    const showDelete = () => {
        const isEvent = { target: { id: 'delete' } }
        toogler.onClick(isEvent);
    }

    const handleDelete = () => {
        hasFetch(requestDeleteHoliday(dataEdit.id, payload.params));
        onClose('delete')
        setDataEdit(null);
    }

    const onCloseDelete = () => {
        onClose('delete')
        setDataEdit(null);
    }
    return (
        <>
            {ToastComponent}
            <Segment>
                <Segment justifyContent={'space-between'} alignItems={'center'} mb={20}>
                    <Text H28>Libur Nasional</Text>
                    <Button size="medium" onClick={() => showFrom()} >
                        <Icon fillColor="white" size={16} name="plus" mr={4} />
                        Create
                    </Button>
                </Segment>
                <TabelHoliday onDelete={showDelete} dataEdit={dataEdit} setDataEdit={setDataEdit} onShowForm={showFrom} onCloseForm={onCloseFrom} />
                <ModalSmall
                    isOpen={isToogle.form}
                    onClose={() => onCloseFrom()}
                    title={<Text className="u-tx-center">New / Edit Holiday</Text>}
                    content={<Form dataEdit={dataEdit} onClose={onCloseFrom} />}
                />
                <ModalSmall
                    isOpen={isToogle.delete}
                    onClose={() => onCloseDelete()}
                    title={<Text className="u-tx-center">Delete Libur Nasional</Text>}
                    content={`Are you sure want to delete the Libur Nasional '${dataEdit?.holidayDesc}' ?`}
                    ButtonFooter={
                        <ButtonGroup reponsive>
                            <Button variant="secondary-alt" onClick={() => onCloseDelete()}>
                                <Text>Cancel</Text>
                            </Button>
                            <Button style={{ backgroundColor: 'red' }} onClick={handleDelete}>
                                <Text>Delete</Text>
                            </Button>
                        </ButtonGroup>
                    }
                />
            </Segment>
        </>
    )
}
export default Holiday;