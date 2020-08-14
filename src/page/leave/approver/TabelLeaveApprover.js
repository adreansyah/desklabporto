import React, { useState, useEffect } from 'react';
import { useAction } from 'hooks';
import { useSelector } from 'react-redux';
import DataTable from 'component/DataTable';
import { requestLeaveApprover } from 'store/actions/leaveApprover';

const TabelLeaveType = ({ setDataEdit, onDelete, onShowForm, onCloseForm }) => {
    const { hasFetch } = useAction();

    const [isTable, setTable] = useState({
        page: 0,
        size: 5,
        keyword: "",
        sort: "approverPositionTitle,desc"
    });
    const payload = useSelector(state => {
        return {
            data: state.leaveApprover.data,
            isLoading: state.leaveApprover.isLoading,
            totalPages: state.leaveApprover.totalPages,
            params: state.leaveApprover.params
        }
    });
    useEffect(() => {
        hasFetch(requestLeaveApprover(isTable));
    }, [hasFetch, isTable]);
    return (
        <>
            <DataTable
                defaultSize={isTable.size}
                defaultSortActive={'approverPositionTitle'}
                tableConsume={[
                    {
                        field: 'Approver Position',
                        rowField: 'approverPositionTitle',
                        sortField: 'approverPositionTitle',
                    },
                    {
                        field: 'Approver Name',
                        rowField: 'approverName',
                        sortField: 'approverName',
                    },
                    {
                        field: 'Approver Email',
                        rowField: 'approverEmail',
                        sortField: 'approverEmail',
                    },
                    {
                        
                        field: 'Approver Division',
                        rowField: 'approverDivision',
                        sortField: 'approverDivision',
                    },
                    {
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
                        ...payload.params,
                        size: size.value
                    }
                })}
                showPagination={true}
                createPaginations={(page) => setTable(prev => {
                    return {
                        ...prev,
                        ...payload.params,
                        page
                    }
                })}
                showSize={true}
                showSearch={true}
                createCustomEdit={(entity) => {
                    onShowForm()
                    setDataEdit(payload.data.find(val => val.id === entity))

                }}
                createCustomDelete={(entity) => {
                    onDelete()
                    setDataEdit(payload.data.find(val => val.id === entity))
                }}
                createSearchAbles={(e) => {
                    const query = {
                        ...payload.params,
                        keyword: e.target.value
                    }
                    e.target.value.length > 3 && hasFetch(requestLeaveApprover(query));
                    e.target.value.length === 0 && hasFetch(requestLeaveApprover(query));
                }}
                callSorted={(val, sort) => {
                    const query = {
                        ...payload.params,
                        sort: `${val},${sort}`
                    }
                    hasFetch(requestLeaveApprover(query));
                }}
                
            />


        </>
    )
}

export default TabelLeaveType;