import React from 'react';
import { 
  Col,
  FormControl,
  Textfield,
  Row,
  Button,
  ButtonGroup,
  Segment
} from '@elevenia/master-ui/components/Atom'
import { useInput, useAction  } from 'hooks';
import { RequestCreateAcademic, RequestUpdateAcademic } from 'store/actions/academic'
import { validateForm } from 'helper';

const FromAcademic = ({dataEdit,onClose}) => {
  const { hasFetch } = useAction();
  
  const { value, bindChange } = useInput({
      initialObjects: {
        name: dataEdit ? dataEdit.name : ''
      },
      identity: "academicForm"
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const valid = validateForm(e.target.id, true, false);
    if(dataEdit){
      valid && hasFetch(RequestUpdateAcademic({...value,id:dataEdit.id}))
    }else{
      valid && hasFetch(RequestCreateAcademic(value))
    }
    valid && onClose();
  }
  return (
    <>
      <Segment>
          <form id="leaveTypeForm" onSubmit={handleSubmit}>
            <Row>
                <Col wide={12} pr={8} py={4}>
                    <FormControl label="Academic Grade">
                        <Textfield
                            inputProps={{
                                ...bindChange,
                                name: "name",
                                value: value.name,
                                autoComplete: "off",
                                placeholder: "Academic Grade...",
                                className:'validate[required,minLength[3],maxLength[100]]'
                            }}
                        />
                    </FormControl>
                </Col>
            </Row>
            <Row>
                <Col wide={12}>
                    <Segment mt={16} className="u-tx-right">
                        <ButtonGroup>
                            <Button type="button" variant="secondary-alt" onClick={onClose} >Cancel</Button>
                            <Button type="submit" variant="primary">Save</Button>
                        </ButtonGroup>
                    </Segment>
                </Col>
            </Row>
          </form>
      </Segment>
    </>
  )
}

export default FromAcademic;