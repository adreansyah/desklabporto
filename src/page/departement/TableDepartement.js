import React, { useState, useEffect } from 'react';
import { useAction, useMultiToogle } from 'hooks';
import { useSelector } from 'react-redux';
import { ButtonGroup, Button, Text } from '@elevenia/master-ui/components/Atom';
import ModalSmall from 'component/ModalCustom/modalSmall';
import DataTable from 'component/DataTable';
import UpdateDepartement from './UpdateDepartement';
import { requestListDepartement, requestDeleteDepartement } from 'store/actions/departement';
import { requestListDivision } from 'store/actions/division';

const TableDepartement = () => {
    const { hasFetch } = useAction();
    const [passId, setPassId] = useState('');
    const [deleteInfo, setDeleteInfo] = useState('');
    const { isToogle, toogler, onClose } = useMultiToogle({
        update: false,
        delete: false
    });
    const [isTable, setTable] = useState({
        page: 0,
        size: 5,
        keyword: "",
        sort: ""
    });
    const payload = useSelector(state => {
        return {
            data: state.departement.data,
            isLoading: state.departement.isLoading,
            totalPages: state.departement.totalPages,
            parameter: state.departement.parameter
        }
    });
    const handleRemove = () => {
        hasFetch(requestDeleteDepartement(passId))
        onClose('delete');
    }
    useEffect(() => {
        hasFetch(requestListDepartement(isTable));
        hasFetch(requestListDivision({ unpaged:true }));
    }, [hasFetch, isTable]);

    return (
        <>
            <DataTable
                defaultSize={isTable.size}
                tableConsume={[{
                    field: 'Departement',
                    rowField: 'name'
                }, {
                    field: 'Division',
                    rowField: 'divisionName'
                }, {
                    field: 'Company',
                    rowField: 'companyName'
                }, {
                    field: 'Action',
                    isEdit: true,
                    isDelete: true,
                    entityFilters: "id"
                }]}
                dataConsume={payload.data}
                isLoading={payload.isLoading}
                totalPages={payload.totalPages}
                createCustomEdit={(entity) => {
                    const isEvent = { target: { id: 'update' } }
                    const { onClick } = toogler;
                    onClick(isEvent);
                    setPassId(entity);
                }}
                createCustomDelete={(entity, item) => {
                    const isEvent = { target: { id: 'delete' } }
                    const { onClick } = toogler;
                    onClick(isEvent);
                    setPassId(entity);
                    setDeleteInfo(item.name);
                }}
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
                        page
                    }
                })}
                createSearchAbles={(e) => {
                    const query = {
                        ...isTable,
                        ...payload.parameter,
                        keyword: e.target.value
                    }
                    e.target.value.length > 3 && hasFetch(requestListDepartement(query));
                    e.target.value.length === 0 && hasFetch(requestListDepartement(query));
                }}
            />
            <ModalSmall
                isOpen={isToogle.update}
                onClose={() => onClose('update')}
                title={<Text className="u-tx-center">Upadate Departement</Text>}
                content={<UpdateDepartement id={passId} onClose={() => onClose('update')} />}
            />
            <ModalSmall
                isOpen={isToogle.delete}
                onClose={() => onClose('delete')}
                title={<Text className="u-tx-center">Delete Departement</Text>}
                content={`Are you sure want to delete data '${deleteInfo}' ?`}
                ButtonFooter={
                    <ButtonGroup reponsive>
                        <Button variant="secondary-alt" onClick={() => onClose('delete')}>
                            <Text>Cancel</Text>
                        </Button>
                        <Button style={{ backgroundColor: 'red' }} onClick={handleRemove}>
                            <Text>Delete</Text>
                        </Button>
                    </ButtonGroup>
                }
            />
        </>
    )
}

export default TableDepartement;