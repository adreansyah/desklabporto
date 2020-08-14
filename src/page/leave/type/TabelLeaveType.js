import React, { useState, useEffect } from 'react';
import { useAction } from 'hooks';
import { useSelector } from 'react-redux';
import DataTable from 'component/DataTable';
import { requestLeaveType } from 'store/actions/leaveType';
import { Segment } from '@elevenia/master-ui/components/Atom';

const TabelLeaveType = ({ setDataEdit, onDelete, onShowForm, onCloseForm }) => {
    const { hasFetch } = useAction();

    const [isTable, setTable] = useState({
        page: 0,
        size: 5,
        keyword: "",
        sort: "name,desc"
    });
    const payload = useSelector(state => {
        return {
            data: state.leaveType.data,
            isLoading: state.leaveType.isLoading,
            totalPages: state.leaveType.totalPages,
            params: state.leaveType.params
        }
    });
    useEffect(() => {
        hasFetch(requestLeaveType(isTable));
    }, [hasFetch, isTable]);
    return (
        <>
            <DataTable
                defaultSize={isTable.size}
                defaultSortActive={'name'}
                tableConsume={[{
                    field: 'Name',
                    rowField: 'name',
                    sortField: 'name'
                },
                {
                    field: 'Color',
                    rowField: 'colorCode',
                    isCustomRow: (id, entity) => {
                        return <>
                            <Segment justifyContent={'flex-start'} alignItems={'center'} mb={8}>
                                <Segment className={'fc-each-legend'} bg={entity.colorCode} mr={8}></Segment>
                            </Segment>
                        </>
                    }
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
                    e.target.value.length > 3 && hasFetch(requestLeaveType(query));
                    e.target.value.length === 0 && hasFetch(requestLeaveType(query));
                }}
                callSorted={(val, sort) => {
                    const query = {
                        ...isTable,
                        ...payload.params,
                        sort: `${val},${sort}`
                    }
                    hasFetch(requestLeaveType(query));
                }}
            />


        </>
    )
}

export default TabelLeaveType;