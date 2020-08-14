import React, { useEffect, useState } from 'react';
import { 
  Col,
  FormControl,
  Textfield,
  OptionBox,
  Row,
  Button,
  ButtonGroup,
  Segment
} from '@elevenia/master-ui/components/Atom'
import { useAction  } from 'hooks';
import { requestEmployeeByIdTitle, RequestSubmitLeaveApprover, requestPositionTitleApprover, RequestUpdateLeaveApprover } from 'store/actions/leaveApprover'
// import { requestListPositionTitle } from 'store/actions/positiontitle';
import { validateForm } from 'helper';
import { useSelector } from 'react-redux';

const From = ({dataEdit,onClose}) => {
  const { hasFetch } = useAction();
  
  useEffect(() => {
    hasFetch(requestPositionTitleApprover())
  }, [hasFetch])
  
  const [dataForm, setDataForm ] = useState({
    companyId:dataEdit ? dataEdit.approverCompanyId : '',
    employeeId:dataEdit ? dataEdit.approverEmpId : '',
    positionTitleId:dataEdit ? dataEdit.approverPositionTitleId : '',
    approverEmail:dataEdit ? dataEdit.approverEmail : '',
  })

  const payload = useSelector(state => {
      return {
          params: state.leaveApprover.params,
          listPosition: state.leaveApprover?.listApproverTitle?.map(({approverPositionTitle:label,approverPositionTitleId:value})=>({label,value})),
          listNameApprover: state.leaveApprover?.listEmployee?.map(val=>{return{label:`${val.firstName} ${val.lastName}`,value:val.id,companyId:val.companyId,email:val.email}})
      }
  });

  

  const handleChangePosition = (val) => {
    setDataForm(prev=>{
      return {
          ...prev,
          positionTitleId:val.value,
          employeeId:'',
          companyId:'',
          approverEmail:''
      }
    })
    
  }

  const handleChangeApproverName = (val) => {
    //console.log({val})
    setDataForm(prev=>{
      return {
          ...prev,
          employeeId:val.value,
          companyId:val.companyId,
          approverEmail:val.email
      }
    })
  }
  
  useEffect(() => {
    if(dataForm.positionTitleId){
      hasFetch(requestEmployeeByIdTitle(dataForm.positionTitleId))
    }
  }, [hasFetch,dataForm.positionTitleId])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const valid = validateForm(e.target.id, true, false);
    if(dataEdit){
      const dataSubmitEdit = {
        companyId: dataForm.companyId,
        employeeId: dataForm.employeeId,
        positionTitleId: dataForm.positionTitleId,
        id: dataEdit.id,
        isDeleted: false,
        approverCode: dataEdit.approverCode
      }
      //console.log({dataEdit,dataForm})
      valid && hasFetch(RequestUpdateLeaveApprover(dataSubmitEdit,payload.params))
    }else{
      const dataSubmit = {
        companyId: dataForm.companyId,
        employeeId: dataForm.employeeId,
        positionTitleId: dataForm.positionTitleId,
        
      }
      //console.log({dataSubmit,dataForm})
      valid && hasFetch(RequestSubmitLeaveApprover(dataSubmit,payload.params))
    }
    valid && onClose();
  }
  return (
    <>
      <Segment>
          <form id="leaveTypeForm" onSubmit={handleSubmit}>
            <Row>
                <Col wide={12} pr={8} py={4}>
                    <FormControl label="Approver Position">
                        <OptionBox
                            onChange={(val)=>handleChangePosition(val)}
                            status={'normal'}
                            name="positionTitleId"
                            value={payload.listPosition.find(val=>val.value===dataForm.positionTitleId)}
                            options={payload.listPosition}
                            placeholder={'--Select Approver Position'}
                            inputClassName="validate[required]"
                                
                        />
                    </FormControl>
                </Col>
                <Col wide={12} pr={8} py={4}>
                    <FormControl label="Approver Name">
                        <OptionBox
                            status={'normal'}
                            name="employeeId"
                            value={dataForm.employeeId ? payload.listNameApprover.find(val=>val.value===dataForm.employeeId):''}
                            options={payload.listNameApprover}
                            placeholder={'--Select Approver Name'}
                            inputClassName="validate[required]"
                            onChange={(val)=>handleChangeApproverName(val)}
                                
                        />
                    </FormControl>
                </Col>
                <Col wide={12} pr={8} py={4}>
                    <FormControl label="Approver Email">
                        <Textfield
                            disabled={true}
                            inputProps={{
                                name: "approverEmail",
                                value: dataForm.approverEmail,
                                autoComplete: "off",
                                placeholder: "Email...",
                                disabled:true
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

export default From;