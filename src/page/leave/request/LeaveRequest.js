import React, {useState} from 'react';
import { Segment, Text, Row, Col, ButtonGroup, Button } from '@elevenia/master-ui/components/Atom';
import { useAlertToast, useMultiToogle, useAction } from 'hooks';
import TableRequest from './TableRequest';
import ModalSmall from 'component/ModalCustom/modalSmall';
import { RequestChangeStatusLeave } from 'store/actions/leaveList'
import ContentModal from './ContentModal';
import { validateForm } from 'helper';

const textStatus = {
  'Accept':'APPROVED',
  'Cancel':'CANCELED',
  'Reject':'REJECTED'
}
const LeaveRequest = (props) => {
  document.title = props.title;
  const { toogler, isToogle, onClose } = useMultiToogle({
      action: false
  });
  const [notes, setNotes] = useState("");
  const { hasFetch } = useAction()
  const [dataSelected, setDataSelected] = useState(null)
  const [action, setAction] = useState('')
  const { ToastComponent } = useAlertToast({
      timeout: 3000,
      placement: 'right',
      space: 10,
      animate: 'slide',
      m: 20,
  });
  const showModalAction = (id, data, actionType) => {
    const isEvent = { target: { id: 'action' } }
    toogler.onClick(isEvent);
    setAction(actionType)
    setDataSelected(data)

  }

  const onCancel = () => {
    setDataSelected(null)
    setAction('')
    setNotes('');
    onClose('action')
  }

  

  const onChangeStatus = () => {
    let dataSubmit = {
      leaveRequestId: dataSelected.id,
      note: notes,
      status: textStatus[action]
    }
    const valid = validateForm('formAction', true, false);
    valid && hasFetch(RequestChangeStatusLeave(dataSubmit))
    valid && onClose('action')
    valid && setNotes('')
  }

  const handleChangeNotes = (e) => {
    const { value } = e.target;
    
    setNotes(value)
  }
  return (
    <>
      {ToastComponent}
      <Segment py={21}>
          <Text H28>{document.title}</Text>
      </Segment>
      <Row mb={16}>
          <Col wide={12}>
              <TableRequest showModalAction={showModalAction} />
          </Col>
      </Row>
      <ModalSmall
          isOpen={isToogle.action}
          onClose={() => onCancel()}
          title={''}
          content={<ContentModal status={action} employeeName={dataSelected?.employeeName} notes={notes} handleNotes={handleChangeNotes} />}
          ButtonFooter={
              <Segment className="u-tx-right">
                <ButtonGroup>
                    <Button type="button" variant="secondary-alt" onClick={() => onCancel()}>No</Button>
                    <Button type="button" variant="primary-alt" onClick={()=> onChangeStatus()}>Yes</Button>
                </ButtonGroup>
            </Segment>
          }
      />
            
    </>
  )
}

export default LeaveRequest;