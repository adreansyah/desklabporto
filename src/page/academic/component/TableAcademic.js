import React, { useState, useEffect } from 'react';
import { useAction } from 'hooks';
import { useSelector } from 'react-redux';
import DataTable from 'component/DataTable';
import { requestListAcademic } from 'store/actions/academic';

const TableAcademic = ({setDataEdit,onDelete,onShowForm,onCloseForm}) => {
  const {hasFetch} = useAction();
  const [isTable, setTable] = useState({
      unpaged:false,
      page: 0,
      size: 5,
      keyword: "",
      sort: ""
  });
  const payload = useSelector(state => {
      return {
          data: state.academic.data,
          isLoading: state.academic.isLoading,
          totalPages: state.academic.totalPages,
          params: state.academic.params
      }
  });
  useEffect(() => {
      hasFetch(requestListAcademic(isTable));
  }, [hasFetch, isTable]);
  return (
    <>
      <DataTable
          defaultSize={isTable.size}
          tableConsume={[{
              field: 'Academic Grade',
              rowField: 'name',
              sortField:'name'
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
              e.target.value.length > 3 && hasFetch(requestListAcademic(query));
              e.target.value.length === 0 && hasFetch(requestListAcademic(query));
          }}
          callSorted={(val, sort) => {
              const query = {
                  ...payload.params,
                  sort: `${val},${sort}`
              }
              hasFetch(requestListAcademic(query));
          }}
      />
    </>
  )
}

export default TableAcademic;