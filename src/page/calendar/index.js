import React, { useState, useEffect } from 'react';
import { DatePicker, Segment, Text, ButtonLink, Icon } from '@elevenia/master-ui/components/Atom';
import styled from "styled-components";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import moment from 'moment';
import { useAction } from 'hooks';
import { requestListCalendar } from 'store/actions/calendar'
import { useSelector } from 'react-redux';
import { requestLeaveType } from 'store/actions/leaveType';
import ModalSmall from 'component/ModalCustom/modalSmall';

const Birthday = styled.div`
    background-image: url("data:image/svg+xml,%3Csvg class='icon' style='vertical-align: middle;fill: currentColor;overflow: hidden;' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M848.794624 939.156685 571.780416 939.156685 571.780416 653.17123l341.897539 0 0 221.100654C913.677926 909.960704 884.482867 939.156685 848.794624 939.156685zM571.780403 318.743552c-11.861606-3.210138-31.443354-8.36864-39.829709-16.176435-0.596582-0.561766-1.016218-1.246413-1.613824-1.841971-0.560845 0.596582-1.016218 1.280205-1.613824 1.841971-8.386355 7.807795-15.96631 12.965274-27.827917 16.176435l0 263.544325L141.030675 582.287877 141.030675 355.202884c0-35.687834 29.195059-64.882688 64.883302-64.882688l150.649125 0c-16.984474-9.525965-32.846438-20.56233-46.111027-32.932045-60.250624-56.144691-71.129907-137.062605-24.283034-180.767027 19.615539-18.264986 46.252237-27.124736 75.026739-27.124736 39.933133 0 83.972915 17.070797 118.995968 49.706086 20.353331 18.983322 37.722624 43.405619 50.145075 69.056819 12.457267-25.6512 29.791744-50.074419 50.180915-69.056819 35.022029-32.63529 79.062835-49.706086 118.994944-49.706086 28.74071 0 55.410176 8.860774 75.025715 27.124736 46.882611 43.704422 35.96759 124.622336-24.283034 180.767027-13.264589 12.368691-29.127578 23.40608-46.111027 32.932045l144.649234 0c35.688243 0 64.882278 29.195981 64.882278 64.882688l0 227.084948L571.780416 582.287833 571.780416 318.743508zM435.064218 147.625267c-21.476966-19.965747-49.094144-31.913882-73.868288-31.913882-7.404954 0-21.125018 1.211597-29.863322 9.386803-2.000691 1.824563-8.070144 7.439462-8.070144 21.369754 0 15.650406 8.492749 40.24873 32.319386 62.477926 29.124506 27.12576 77.202432 47.601152 111.76704 47.601152 12.176794 0 16.492237-2.666701 16.527053-2.702541C489.524736 242.54505 475.664486 185.453773 435.064218 147.625267zM577.78135 254.790963c0 0 0.034816-0.034816 0.069632-0.034816 0.807424 0 5.50871 1.790771 15.509914 1.790771 34.564608 0 82.64151-20.47529 111.76704-47.601152 23.826637-22.229299 32.283546-46.810112 32.283546-62.442189 0-13.930291-6.033613-19.562496-8.035328-21.404467-8.77312-8.17623-22.457344-9.386803-29.864346-9.386803-24.808038 0-52.390298 11.948134-73.867264 31.913882C585.325466 185.208218 571.358822 241.73865 577.78135 254.790963zM500.89513 939.156685 205.914017 939.156685c-35.688243 0-64.883302-29.195981-64.883302-64.883712L141.030714 653.17123l359.864462 0L500.895177 939.15666z' /%3E%3C/svg%3E");
    background-repeat: no-repeat;
    width: 50px;
    height: 50px;
`;


const ShowCalendar = (props) => {
    document.title = props.title
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const payload = useSelector(state => {
        return {
            calendar: state.calendar.data,
            isLoading: state.calendar.isLoading,
            leaveType: state.leaveType.data
        }
    })
    const { hasFetch } = useAction();
    const [data, setData] = useState({
        singleDate: new Date()
    });
    const onChange = (name, value) => {
        setData({
            ...data,
            [name]: new Date(value)
        });
    };
    const prevDate = () => {
        let prevDate = new Date(data.singleDate);
        prevDate.setDate(1);
        prevDate.setMonth(prevDate.getMonth() - 1);
        setData({
            singleDate: prevDate
        })
    }
    const nextDate = () => {
        let nextDate = new Date(data.singleDate);
        nextDate.setDate(1);
        nextDate.setMonth(nextDate.getMonth() + 1);
        setData({
            singleDate: nextDate
        })
    }
    useEffect(() => {
        hasFetch(requestListCalendar(moment(data.singleDate, 'YYYY-MM-DD').format('YYYY-MM-DD')))
        hasFetch(requestLeaveType({ unpaged: true, sort: 'name,asc' }))
    }, [hasFetch, data.singleDate]);
    const showDetail = (e) => {
        setModalContent(e)
        setModalOpen(!modalOpen)
    }
    const render = () => {
        return (
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                themeSystem="Materia"
                initialDate={moment(data.singleDate, 'YYYY-MM-DD').format('YYYY-MM-DD')}
                stickyHeaderDates={true}
                headerToolbar={{
                    start: '',
                    center: '',
                    end: ''
                }}
                dayMaxEventRows={5}
                eventDisplay="list-item"
                slotEventOverlap={true}
                events={payload.calendar}
                eventClick={(e) => showDetail(e.event)}
            />
        )
    }
    return (
        <>
            <Segment mb={20}>
                <Text H28>Calendar</Text>
            </Segment>
            <Segment boxShadow borderRadius={4} justifyContent={'center'} alignItems={'center'} bg={'white'} p={16} mb={24}>
                <Segment justifyContent={'space-between'} alignItems={'center'}>
                    <ButtonLink onClick={prevDate} className={''} mr={8}>
                        <Icon name="chevron-left" size="large" fillColor="#115488" />
                    </ButtonLink>
                    <DatePicker
                        placeholderText="Masukkan Bulan"
                        selected={data.singleDate}
                        onChange={data => onChange("singleDate", data)}
                        dateFormat="MMMM yyyy"
                        showMonthYearPicker
                        calendarClassName="month-picker"
                    />
                    <ButtonLink onClick={nextDate} className={''} ml={8}>
                        <Icon name="chevron-right" size="large" fillColor="#115488" />
                    </ButtonLink>
                </Segment>
            </Segment>
            <Segment justifyContent={'space-between'} mb={32}>
                <Segment mr={24} flex={1}>
                    {!payload.isLoading && render()}
                </Segment>
                <Segment boxShadow className={'fc-legend'} bg={'white'} p={24} borderRadius={4}>
                    <Text H16 mb={16}>Keterangan</Text>
                    {
                        payload.leaveType.map((item, index) => {
                            return (
                                <Segment key={index} justifyContent={'flex-start'} alignItems={'center'} mb={8}>
                                    <Segment className={'fc-each-legend'} bg={item.colorCode} mr={8}></Segment>
                                    <Text B12>{item.name}</Text>
                                </Segment>
                            )
                        })
                    }
                    <Segment justifyContent={'flex-start'} alignItems={'center'} mb={8}>
                        <Segment className={'fc-each-legend'} bg={'#A2B59F'} mr={8}></Segment>
                        <Text B12>{'Birthday'}</Text>
                    </Segment>
                    <Segment justifyContent={'flex-start'} alignItems={'center'} mb={8}>
                        <Segment className={'fc-each-legend'} bg={'#B57FB3'} mr={8}></Segment>
                        <Text B12>{'Work Annivesary'}</Text>
                    </Segment>
                </Segment>
            </Segment>
            <ModalSmall
                isOpen={modalOpen}
                onClose={() => setModalOpen(!modalOpen)}
                title={''}
                content={
                    <>
                        <Segment justifyContent={'space-between'} alignItems={'flex-ends'} mt={-16} mb={16} pb={16} borderBottom={'1px solid #DCDEE3'}>
                            <Segment mr={16} alignSelf={'flex-end'}>
                                {modalContent?.extendedProps.eventDescription === 'Birthday' ? <Birthday />
                                    :
                                    <Segment
                                        className={'fc-profile'}
                                        bg={modalContent?.backgroundColor}
                                    >
                                        {modalContent?.extendedProps.eventDescription === "Public Holiday" ? null
                                            :
                                            <Icon name={'profile'} size={'48'} fillColor={"black30"} />
                                        }
                                    </Segment>
                                }
                            </Segment>
                            <Segment>
                                <Text B16 style={{ fontSize: 32 }}>
                                    {moment(modalContent?.extendedProps.eventDate, 'YYYY-MM-DD').format('DD')}
                                </Text>
                                <Text B16 style={{ fontSize: 16 }}>
                                    {moment(modalContent?.extendedProps.eventDate, 'YYYY-MM-DD').format('MMMM YYYY')}
                                </Text>
                            </Segment>
                        </Segment>
                        <Segment>
                            <Text H16 mb={4} style={{ textTransform: 'capitalize' }}>
                                {modalContent?.title}
                            </Text>
                            <Text B12 color="black50" mb={4}>
                                {modalContent?.extendedProps.eventDescription}
                            </Text>
                        </Segment>
                    </>
                }
            />
        </>
    )
}

export default ShowCalendar