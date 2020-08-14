import React, { useState, useEffect } from 'react';
import { useAction } from 'hooks';
import { useSelector } from 'react-redux';
import DataTable from 'component/DataTable';
import { requestListHoliday } from 'store/actions/holiday';
import { Text, Segment, DatePicker } from '@elevenia/master-ui/components/Atom';
import moment from "moment"
const TabelHoliday = ({ setDataEdit, onDelete, onShowForm, onCloseForm }) => {
    const { hasFetch } = useAction();
    const [isTable, setTable] = useState({
        page: 0,
        size: 5,
        keyword: "",
        sort: "holidayDate,asc",
        year: "2020"
    });
    const payload = useSelector(state => {
        return {
            data: state.holiday.data,
            isLoading: state.holiday.isLoading,
            totalPages: state.holiday.totalPages,
            params: state.holiday.parameter
        }
    });
    useEffect(() => {
        hasFetch(requestListHoliday(isTable));
    }, [hasFetch, isTable]);

    const [yearSearch, setYearSearch] = useState(new Date());

    const handlingYear = (e) => {
        setYearSearch(new Date(e));
        setTable(prev => {
            return {
                ...prev,
                ...payload.params,
                year: moment(e).format('YYYY')
            }
        })
    }

    return (
        <>
            <DataTable
                defaultSize={isTable.size}
                defaultSortActive={isTable.sort}
                showCustomFilter={true}
                customFilter={<Segment width='200px'>
                    <DatePicker
                        placeholderText="Masukkan Tahun"
                        selected={yearSearch}
                        onChange={data => handlingYear(data)}
                        dateFormat="yyyy"
                        showYearPicker
                        calendarClassName="year-picker"
                    />
                </Segment>}
                tableConsume={[{
                    field: 'Date',
                    isCustomRow: (id, entity) => {
                        return <Text>{moment(entity.holidayDate).utc(true).format('DD MMM YYYY')}</Text>
                    },
                    sortField: 'holidayDate'
                },
                {
                    field: 'Description',
                    rowField: 'holidayDesc'
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
                        keyword: e.target.value,
                        year: isTable.year
                    }
                    e.target.value.length > 3 && hasFetch(requestListHoliday(query));
                    e.target.value.length === 0 && hasFetch(requestListHoliday(query));
                }}
                callSorted={(val, sort) => {
                    const query = {
                        ...isTable,
                        ...payload.params,
                        sort: `${val},${sort}`,
                    }
                    hasFetch(requestListHoliday(query));
                }}
            />
        </>
    )
}

export default TabelHoliday;