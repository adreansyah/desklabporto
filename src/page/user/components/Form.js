import React, { useEffect } from 'react';
import { 
  Col,
  FormControl,
  Textfield,
  Row,
  Button,
  ButtonGroup,
  Segment,
  OptionBox
} from '@elevenia/master-ui/components/Atom'
import { useInput, useAction  } from 'hooks';

import { validateForm } from 'helper';
import { useSelector } from 'react-redux';
import { RegisterUser, UpdateUser } from 'store/actions/user'
import { requestListCompany } from 'store/actions/company';

const From = ({dataEdit,onClose}) => {
  
  const { hasFetch } = useAction();
  useEffect(() => {
    hasFetch(requestListCompany({unpaged:true}))
  }, [hasFetch])
  const { value, bindChange, bindSelect } = useInput({
      initialObjects: {
        email: dataEdit ? dataEdit.email : '',
        companyId: dataEdit ? dataEdit.companyId : '',
        firstName: dataEdit ? dataEdit.firstName : '',
        lastName: dataEdit ? dataEdit.lastName : '',
        password: dataEdit ? dataEdit.password : ''
      },
      identity: "userForm"
  })

  const payload = useSelector(state => {
      return {
          params: state.users.params,
          listCompany: state.company?.data?.map(({id:value,name:label})=>({label,value}))
      }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const valid = validateForm(e.target.id, true, false);
    // console.log({value})
    if(dataEdit){
      let dataSubmitEdit = {
        email:  value.email,
        companyId:  value.companyId,
        firstName:  value.firstName,
        lastName:  value.lastName,
      }
      valid && hasFetch(UpdateUser(dataSubmitEdit,dataEdit.id,payload.params))
    }else{
      valid && hasFetch(RegisterUser(value,payload.params))
    }
    valid && onClose();
  }
  return (
    <>
      <Segment>
          <form id="leaveTypeForm" onSubmit={handleSubmit}>
              <Segment>
                <Row>
                  <Col wide={6} pr={4}>
                    <FormControl label="Username" mb={16}>
                          <Textfield
                              disabled={dataEdit?true:false}
                              inputProps={{
                                  ...bindChange,
                                  name: "email",
                                  value: value.email,
                                  autoComplete: "off",
                                  placeholder: "Username...",
                                  className:'validate[required,email,minLength[3],maxLength[100]]',
                                  disabled:dataEdit?true:false
                              }}
                          />
                      </FormControl>
                  </Col>
                  <Col wide={6} pl={4}>
                    {
                        dataEdit === null && <FormControl label="Password" mb={16}>
                            <Textfield
                                inputProps={{
                                    ...bindChange,
                                    name: "password",
                                    value: value.password,
                                    autoComplete: "off",
                                    type:"password",
                                    placeholder: "Password...",
                                    className:'validate[required,minLength[6],maxLength[10]]'
                                }}
                            />
                        </FormControl>
                    }
                  </Col>
                </Row>
                <Row>
                  <Col wide={6} pr={4}>
                    <FormControl label="Firstname" mb={16}>
                      <Textfield
                            inputProps={{
                                ...bindChange,
                                name: "firstName",
                                value: value.firstName,
                                autoComplete: "off",
                                placeholder: "Firstname...",
                                className:'validate[required,minLength[3],maxLength[100]]'
                            }}
                        />
                    </FormControl>
                  </Col>
                  <Col wide={6} pl={4}>
                    <FormControl label="Lastname" mb={16}>
                        <Textfield
                            inputProps={{
                                ...bindChange,
                                name: "lastName",
                                value: value.lastName,
                                autoComplete: "off",
                                placeholder: "Lastname...",
                                className:'validate[required,minLength[3],maxLength[100]]'
                            }}
                        />
                    </FormControl>
                  </Col>
                </Row>
                <FormControl label="Company" mb={24}>
                  <OptionBox
                      {...bindSelect}
                      status={'normal'}
                      name="companyId"
                      value={payload?.listCompany?.find(val=>val.value===value.companyId)}
                      options={payload.listCompany}
                      placeholder={'--Select Company'}
                      inputClassName="validate[required]"
                      isDisabled={dataEdit?true:false}
                  />
                </FormControl>
                <Segment className="u-tx-right">
                    <ButtonGroup>
                        <Button type="button" variant="secondary-alt" onClick={onClose} >Cancel</Button>
                        <Button type="submit" variant="primary">Save</Button>
                    </ButtonGroup>
                </Segment>
              </Segment>
          </form>
      </Segment>
    </>
  )
}

export default From;