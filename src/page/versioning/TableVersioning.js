import React, { useState, useEffect } from 'react';
import { useAction } from 'hooks';
import { useSelector } from 'react-redux';
import DataTable from 'component/DataTable';
import { requestAppVersioning } from 'store/actions/appVersioning';
import moment from 'moment';

const TabelVersioning = ({setDataEdit,onDelete,onShowForm,onCloseForm}) => {
    const { hasFetch } = useAction();
    
    const [isTable, setTable] = useState({
        page: 0,
        size: 5,
        keyword: "",
        sort: "version,desc"
    });
    const payload = useSelector(state => {
        return {
            data: state.appVersioning.data,
            isLoading: state.appVersioning.isLoading,
            totalPages: state.appVersioning.totalPages,
            params: state.appVersioning.params
        }
    });
    useEffect(() => {
        hasFetch(requestAppVersioning(isTable));
    }, [hasFetch, isTable]);
    return (
        <>
            <DataTable
                defaultSize={isTable.size}
                defaultSortActive={'version'}
                tableConsume={[{
                    field: 'Version',
                    rowField: 'version',
                    sortField:'version'
                }, 
                {
                    field: 'Release Type',
                    rowField: 'updateType',
                    sortField: 'updateType',
                    // isCustomRow: (id, entity) => {
                    //     return (
                    //       entity.updateType==='N01' ? 'Normal':'Critical'
                    //     )
                    // }
                },
                {
                    field: 'Release Date',
                    rowField: 'updateDate',
                    sortField: 'updateDate',
                    isCustomRow: (id, entity) => {
                        return (
                            entity.updateDate ? moment(entity.updateDate,'YYYY-MM-DD').format('DD MMM YYYY') : '-'
                        )
                    }
                },
                {
                    field: 'Device',
                    rowField: 'device',
                    sortField: 'device',
                    // isCustomRow: (id, entity) => {
                    //     return (
                    //       entity.device==='101' ? 'Android':'IOS'
                    //     )
                    // }
                },
                {
                    field: 'Description',
                    rowField: 'description',
                    sortField: 'description'
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
                    setDataEdit(payload.data.find(val=>val.id===entity))
                    
                }}
                createCustomDelete={(entity) => {
                    onDelete()
                    setDataEdit(payload.data.find(val=>val.id===entity))
                }}
                createSearchAbles={(e) => {
                    const query = {
                        ...payload.params,
                        keyword: e.target.value
                    }
                    e.target.value.length > 3 && hasFetch(requestAppVersioning(query));
                    e.target.value.length === 0 && hasFetch(requestAppVersioning(query));
                }}
                callSorted={(val, sort) => {
                    const query = {
                        ...isTable,
                        ...payload.params,
                        sort: `${val},${sort}`
                    }
                    hasFetch(requestAppVersioning(query));
                }}
            />
            
            
        </>
    )
}

export default TabelVersioning;