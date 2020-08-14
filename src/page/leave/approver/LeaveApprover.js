import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Segment, Text, ButtonGroup, Button, Icon } from '@elevenia/master-ui/components/Atom';
import { useAlertToast, useMultiToogle, useAction } from 'hooks';
import ModalSmall from 'component/ModalCustom/modalSmall';
import TabelLeaveApprover from './TabelLeaveApprover';
import Form from './LeaveApproverForm';
import { RequestDeleteLeaveApprover } from 'store/actions/leaveApprover'


const LeaveApprover = (props) => {
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
            params: state.leaveApprover.params
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
        hasFetch(RequestDeleteLeaveApprover(dataEdit.id, payload.params));
        onClose('delete')
        setDataEdit(null);
    }

    const onCloseDelete = () => {
        onClose('delete')
        setDataEdit(null);
    }
    
    useEffect(() => {
        if(!isToogle.form){
           hasFetch({
             type:'RESET_LIST_APPROVER_NAME'
           })
        }
      }, [hasFetch,isToogle.form])

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
            <TabelLeaveApprover onDelete={showDelete} dataEdit={dataEdit} setDataEdit={setDataEdit} onShowForm={showFrom} onCloseForm={onCloseFrom} />
            <ModalSmall
                isOpen={isToogle.form}
                onClose={() => onCloseFrom()}
                title={<Text className="u-tx-center">{dataEdit ? 'Update' : 'Create'} Leave Approver</Text>}
                content={<Form dataEdit={dataEdit} onClose={onCloseFrom} />}
            />
            <ModalSmall
                isOpen={isToogle.delete}
                onClose={() => onCloseDelete()}
                title={<Text className="u-tx-center">Delete Leave Approver</Text>}
                content={`Are you sure want to delete data '${dataEdit?.approverName}' ?`}
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
export default LeaveApprover;