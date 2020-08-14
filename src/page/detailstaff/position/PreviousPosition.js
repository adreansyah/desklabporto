import React, { useEffect } from 'react';
import { Table } from '@elevenia/master-ui/components/Atom';
import { requestPreviousPosition } from 'store/actions/positioninformation';
import { useAction } from 'hooks';
import { useSelector } from 'react-redux';
import Segment from '@elevenia/master-ui/components/Atom/Segment';
import moment from 'moment';

const PreviousPosition = (props) => {
    const { id } = props.match.params;
    const { hasFetch } = useAction();
    useEffect(() => {
        hasFetch(requestPreviousPosition(id));
    }, [hasFetch, id]);
    const payload = useSelector(state => {
        return {
            previousPosition: state.positionInformation.previousPosition,
            isLoading: state.positionInformation.isLoading
        }
    })
    return (
        <>
            {
                payload.previousPosition.map((item, index) => {
                    return (
                        <Segment key={index} boxShadow mb={32} p={16} borderRadius={8}>
                            <Segment justifyContent={'space-between'} m={'0 -10px'}>
                                <Segment m={'0 10px 32px'} flexGrow={1}>
                                    <Table responsive>
                                        <tbody>
                                            <tr>
                                                <th>Position</th>
                                                <th>:</th>
                                                <td>{item.positionTitleName}</td>
                                            </tr>
                                            <tr>
                                                <th>Join Date</th>
                                                <th>:</th>
                                                <td>{moment(item.startDate, "DD-MM-YYYY HH:mm:ssZ").format('DD MMMM YYYY')}</td>
                                            </tr>
                                            <tr>
                                                <th>End Date</th>
                                                <th>:</th>
                                                <td>{moment(item.endDate, "DD-MM-YYYY HH:mm:ssZ").format('DD MMMM YYYY')}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Segment>
                                <Segment m={'0 10px 32px'} flexGrow={1}>
                                    <Table responsive round>
                                        <tbody>
                                            <tr>
                                                <th>Division</th>
                                                <th>:</th>
                                                <td>{item.divisionName}</td>
                                            </tr>
                                            <tr>
                                                <th>Department</th>
                                                <th>:</th>
                                                <td>{item.departmentName}</td>
                                            </tr>
                                            <tr>
                                                <th>Unit</th>
                                                <th>:</th>
                                                <td>{item.unitName}</td>
                                            </tr>
                                            <tr>
                                                <th>Level</th>
                                                <th>:</th>
                                                <td>{item.levelName}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Segment>
                            </Segment>
                        </Segment>
                    )
                })
            }
        </>
    )
}
export default PreviousPosition;