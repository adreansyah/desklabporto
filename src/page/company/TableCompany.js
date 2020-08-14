import React, { useState, useEffect } from 'react';
import { useAction, useMultiToogle } from 'hooks';
import { requestListCompany, requestDeleteCompany } from 'store/actions/company';
import { useSelector } from 'react-redux';
import { ButtonGroup, Button, Text } from '@elevenia/master-ui/components/Atom';
import ModalSmall from 'component/ModalCustom/modalSmall';
import UpdateCompany from './UpdateCompany';
import DataTable from 'component/DataTable';

const TableCompany = () => {
    const { hasFetch } = useAction();
    const { isToogle, toogler, onClose } = useMultiToogle({
        update: false,
        delete: false
    });
    const [isTable, setTable] = useState({
        page: 0,
        size: 5,
        search: "",
        sort: ""
    });
    const payload = useSelector(state => {
        return {
            data: state.company.data,
            isLoading: state.company.isLoading,
            totalPages: state.company.totalPages,
            parameter: state.company.parameter
        }
    });
    const [passId, setPassId] = useState('');
    const [deleteInfo, setDeleteInfo] = useState('');
    const handleRemove = () => {
        hasFetch(requestDeleteCompany(passId))
        onClose('delete');
    }
    useEffect(() => {
        hasFetch(requestListCompany(isTable));
    }, [hasFetch, isTable]);
    return (
        <>
            <DataTable
                defaultSize={isTable.size}
                tableConsume={[{
                    field: 'Company',
                    rowField: 'name'
                }, {
                    field: 'Action',
                    isEdit: true,
                    isDelete: true,
                    entityFilters: "id"
                }]}
                dataConsume={payload.data}
                isLoading={payload.isLoading}
                totalPages={payload.totalPages}
                createShowPerSize={(size) => setTable(prev => {
                    return {
                        ...prev,
                        size: size.value
                    }
                })}
                createPaginations={(page) => setTable(prev => {
                    return {
                        ...prev,
                        page
                    }
                })}
                createCustomEdit={(entity) => {
                    const isEvent = { target: { id: 'update' } }
                    toogler.onClick(isEvent);
                    setPassId(entity);
                }}
                createCustomDelete={(entity, item) => {
                    const isEvent = { target: { id: 'delete' } }
                    toogler.onClick(isEvent);
                    setPassId(entity);
                    setDeleteInfo(item.name);
                }}
                showSearch={false}
            />
            <ModalSmall
                isOpen={isToogle.update}
                onClose={() => onClose('update')}
                title={<Text className="u-tx-center">EDIT COMPANY</Text>}
                content={<UpdateCompany id={passId} onClose={() => onClose('update')} />}
            />
            <ModalSmall
                isOpen={isToogle.delete}
                onClose={() => onClose('delete')}
                title={<Text className="u-tx-center">DELETE COMPANY</Text>}
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

export default TableCompany;