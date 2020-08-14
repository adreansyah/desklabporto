import React, { useState, useEffect } from 'react';
import { useAction, useMultiToogle } from 'hooks';
import { useSelector } from 'react-redux';
import { ButtonGroup, Button, Text, Segment, ButtonLink } from '@elevenia/master-ui/components/Atom';
import ModalSmall from 'component/ModalCustom/modalSmall';
import ModalLarge from 'component/ModalCustom/modalLarge';
import UpdateStaff from './UpdateStaff';
import DataTable from 'component/DataTable';
import { requestDeleteStaff, requestListStaff, requestActivationKey } from 'store/actions/staff';

const TableStaff = (props) => {
    const { hasFetch } = useAction();
    const [passId, setPassId] = useState('');
    const [isOpenAlert, setOpenAlert] = useState(false);
    const [getMail, setGetMail] = useState("");
    const { isToogle, toogler, onClose } = useMultiToogle({
        update: false,
        delete: false
    });
    const [isTable, setTable] = useState({
        sameCompany: true,
        page: 0,
        size: 5,
        keyword: "",
        sort: "firstName,asc"
    });
    const payload = useSelector(state => {
        return {
            data: state.staff.data,
            isLoading: state.staff.isLoading,
            totalPages: state.staff.totalPages,
            parameter: state.staff.parameter
        }
    });
    const getPropertyNameOfEmployee = payload.data.filter(propertyOfEmployeeName => propertyOfEmployeeName.id === passId);
    const handleRemove = () => {
        hasFetch(requestDeleteStaff(passId))
        onClose('delete');
    }
    const alertMessageActivation = (email) => {
        setOpenAlert(!isOpenAlert)
        setGetMail(email)
    }
    const resendActivationKey = (email) => {
        hasFetch(requestActivationKey(email));
        setOpenAlert(!isOpenAlert)
    }
    useEffect(() => {
        hasFetch(requestListStaff(isTable));
    }, [hasFetch, isTable]);
    return (
        <>
            <DataTable
                defaultSortActive={isTable.sort}
                defaultSize={isTable.size}
                tableConsume={[{
                    field: 'Employee Name',
                    sortField: 'firstName',
                    isCustomRow: (id, entity) => {
                        return (
                            <ButtonLink onClick={() => props.history.push(`/employee/list-employee/${id}`, {
                                id
                            })}>
                                <Text fontWeight={'normal'} textAlign={'left'}>{entity.firstName + " " + entity.lastName}</Text>
                            </ButtonLink>
                        )
                    },
                    entityFilters: "id"
                }, {
                    field: 'NIK',
                    sortField: 'nik',
                    rowField: 'nik'
                }, {
                    field: 'Position',
                    sortField: 'position',
                    rowField: 'position'
                }, {
                    field: 'Department',
                    sortField: 'departmentName',
                    rowField: 'departmentName'
                }, {
                    field: 'Division',
                    sortField: 'divisionName',
                    rowField: 'divisionName'
                }, {
                    field: 'Status',
                    sortField: 'status',
                    isCustomRow: (id, entity) => {
                        return (
                            <>
                                {
                                    entity.status === 'INACTIVE' ?
                                        <Button variant={'secondary'} size={'small'} onClick={() => alertMessageActivation(entity.email)}>
                                            <Text fontWeight={'normal'}>Resend Activation</Text>
                                        </Button> : entity.status
                                }
                            </>
                        )
                    },
                }, {
                    field: 'Action',
                    isEdit: true,
                    isDelete: false,
                    entityFilters: "id"
                }]}
                dataConsume={payload.data}
                isLoading={payload.isLoading}
                totalPages={payload.totalPages}
                createShowPerSize={(size) => setTable(prev => {
                    return {
                        ...prev,
                        ...payload.parameter,
                        size: size.value
                    }
                })}
                createPaginations={(page) => setTable(prev => {
                    return {
                        ...prev,
                        ...payload.parameter,
                        page
                    }
                })}
                createCustomEdit={(entity) => {
                    const isEvent = { target: { id: 'update' } }
                    toogler.onClick(isEvent);
                    setPassId(entity);
                }}
                createCustomDelete={(entity) => {
                    const isEvent = { target: { id: 'delete' } }
                    toogler.onClick(isEvent);
                    setPassId(entity);
                }}
                callSorted={(val, sort) => {
                    const query = {
                        ...isTable,
                        ...payload.parameter,
                        sort: `${val},${sort}`
                    }
                    hasFetch(requestListStaff(query));
                }}
                createSearchAbles={(e) => {
                    const query = {
                        ...payload.parameter,
                        size: isTable.size,
                        keyword: e.target.value,
                    }
                    e.target.value.length > 3 && hasFetch(requestListStaff(query));
                    e.target.value.length === 0 && hasFetch(requestListStaff(query));
                }}
            />
            <ModalLarge
                isOpen={isToogle.update}
                onClose={() => onClose('update')}
                title={<Text className="u-tx-center">Update Employee</Text>}
                content={<UpdateStaff id={passId} onClose={() => onClose('update')} />}
            />
            <ModalSmall
                isOpen={isToogle.delete}
                onClose={() => onClose('delete')}
                title={<Text className="u-tx-center">Delete Employee</Text>}
                content={
                    <Segment>
                        <Text>Are You Sure Want To Delete <b>"{getPropertyNameOfEmployee.length !== 0 && getPropertyNameOfEmployee[0].firstName}"</b> ?</Text>
                    </Segment>
                }
                ButtonFooter={
                    <ButtonGroup responsive>
                        <Button variant="secondary-alt" size="small" onClick={() => onClose('delete')}>
                            <Text>Cancel</Text>
                        </Button>
                        <Button size="small" style={{ backgroundColor: 'red' }} onClick={handleRemove}>
                            <Text>Delete</Text>
                        </Button>
                    </ButtonGroup>
                }
            />
            <ModalSmall
                isOpen={isOpenAlert}
                onClose={() => onClose()}
                title={<Text className="u-tx-center">Resend Activation</Text>}
                content={`Are you sure want to resend this activation?`}
                ButtonFooter={
                    <ButtonGroup responsive>
                        <Button variant="secondary-alt" onClick={() => setOpenAlert(!isOpenAlert)}>
                            <Text>Cancel</Text>
                        </Button>
                        <Button onClick={() => resendActivationKey(getMail)}>
                            <Text>Yes</Text>
                        </Button>
                    </ButtonGroup>
                }
            />
        </>
    )
}

export default TableStaff;