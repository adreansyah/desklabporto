import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {
    Button,
    ButtonGroup,
    Icon,
    Segment,
    Text
} from '@elevenia/master-ui/components/Atom';

import { useAlertToast, useMultiToogle, useAction } from 'hooks';
import TableUser from './components/TableUser'
import ModalSmall from 'component/ModalCustom/modalSmall';
import ModalLarge from 'component/ModalCustom/modalLarge';
import Form from './components/Form'
import { DeleteUser } from 'store/actions/user'

const User = (props) => {
    document.title = props.title
    const { hasFetch } = useAction();
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
            params: state.leaveApprover.params,
            //detailUser : state.personalInformation.personalData
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
        hasFetch(DeleteUser(dataEdit.id, payload.params));
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
            <TableUser onDelete={showDelete} dataEdit={dataEdit} setDataEdit={setDataEdit} onShowForm={showFrom} onCloseForm={onCloseFrom} />
            <ModalLarge
                isOpen={isToogle.form}
                onClose={() => onCloseFrom()}
                title={<Text className="u-tx-center">{dataEdit ? 'Update' : 'Create'} User</Text>}
                content={<Form dataEdit={dataEdit} onClose={onCloseFrom} />}
            />
            <ModalSmall
                isOpen={isToogle.delete}
                onClose={() => onCloseDelete()}
                title={<Text className="u-tx-center">Delete User</Text>}
                content={`Are you sure want to delete data '${dataEdit?.firstName} ${dataEdit?.lastName}' ?`}
                ButtonFooter={
                    <ButtonGroup>
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

export default User;