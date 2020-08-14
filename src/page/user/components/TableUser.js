import React, { useState, useEffect } from 'react';
import { useAction } from 'hooks';
import { useSelector } from 'react-redux';
import DataTable from 'component/DataTable';
import { GetListUsers } from 'store/actions/user'
const TableUser = ({ setDataEdit, onDelete, onShowForm, onCloseForm }) =>{
  const { hasFetch } = useAction();
    
  const [isTable, setTable] = useState({
      page: 0,
      size: 5,
      keyword: "",
      sort: ""
  });
  const payload = useSelector(state => {
      return {
          data: state.users.data,
          isLoading: state.users.isLoading,
          totalPages: state.users.totalPages,
          params: state.users.params
      }
  });
  useEffect(() => {
      hasFetch(GetListUsers(isTable));
  }, [hasFetch, isTable]);
  return (
    <>
      <DataTable
        defaultSize={isTable.size}
        tableConsume={[
        {
            field: 'Email',
            rowField: 'email'
        }, 
        {
          field: 'Name',
          isCustomRow: (id, entity) => {
              return (
                `${entity.firstName}  ${entity.lastName}`
              )
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
                size: size.value
            }
        })}
        showPagination={true}
        createPaginations={(page) => setTable(prev => {
            return {
                ...prev,
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
            e.target.value.length > 3 && hasFetch(GetListUsers(query));
            e.target.value.length === 0 && hasFetch(GetListUsers(query));
        }}
    />
    </>
  )
}

export default TableUser;