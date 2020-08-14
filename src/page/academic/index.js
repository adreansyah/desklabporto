import React, { useState } from 'react';
import { Segment, Text, ButtonGroup, Button, Icon } from '@elevenia/master-ui/components/Atom';
import { useAlertToast, useMultiToogle, useAction } from 'hooks';
import ModalSmall from 'component/ModalCustom/modalSmall';
import TableAcademic from './component/TableAcademic';
import FormAcademic from './component/FormAcademic';
import { RequestDeleteAcademic } from 'store/actions/academic'


const Academic = (props) => {
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
        hasFetch(RequestDeleteAcademic(dataEdit.id));
        onClose('delete')
        setDataEdit(null);
    }

    const onCloseDelete = () => {
        onClose('delete')
        setDataEdit(null);
    }

    return (
        <Segment>
            {ToastComponent}
            <Segment justifyContent={'space-between'} alignItems={'center'} mb={20}>
                <Text H28>{document.title}</Text>
                <Button size="medium" onClick={() => showFrom()} >
                    <Icon fillColor="white" size={16} name="plus" mr={4} />
                    Create
                </Button>
            </Segment>
            <TableAcademic onDelete={showDelete} dataEdit={dataEdit} setDataEdit={setDataEdit} onShowForm={showFrom} onCloseForm={onCloseFrom} />
            <ModalSmall
                isOpen={isToogle.form}
                onClose={() => onCloseFrom()}
                title={<Text className="u-tx-center">Upadate Academic Grade</Text>}
                content={<FormAcademic dataEdit={dataEdit} onClose={onCloseFrom} />}
            />
            <ModalSmall
                isOpen={isToogle.delete}
                onClose={() => onCloseDelete()}
                title={<Text className="u-tx-center">Delete Academic Grade</Text>}
                content={`Are you sure want to delete data '${dataEdit?.name}' ?`}
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

    )
}
export default Academic;