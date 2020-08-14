import React, { useEffect } from 'react';
import { Icon, Table, Segment, ButtonGroup, Button, Text } from '@elevenia/master-ui/components/Atom';
import { useAction, useMultiToogle } from 'hooks';
import { requestCurrentPosition } from 'store/actions/positioninformation';
import { useSelector } from 'react-redux';
import moment from 'moment';
import ModalLarge from 'component/ModalCustom/modalLarge';
import UpdatePosition from './UpdatePosition';

const CurrentPosition = (props) => {
    const { id } = props.match.params;
    const { hasFetch } = useAction();
    const { toogler, isToogle, onClose } = useMultiToogle({
        update: false
    })
    useEffect(() => {
        hasFetch(requestCurrentPosition(id));
    }, [hasFetch, id]);
    const payload = useSelector(state => {
        return {
            currentPosition: state.positionInformation.currentPosition
        }
    })

    return (
        <Segment boxShadow mb={32} p={16} borderRadius={4}>
            <Segment justifyContent={'space-between'} m={'0 -10px'}>
                <Segment m={'0 10px 32px'} flexGrow={1}>
                    <Table responsive>
                        <tbody>
                            <tr>
                                <th>Position</th>
                                <td>:</td>
                                <td>{payload.currentPosition.positionTitleName}</td>
                            </tr>
                            <tr>
                                <th>Join Date</th>
                                <td>:</td>
                                <td>{payload.currentPosition.startDate && moment(payload.currentPosition.startDate, "DD-MM-YYYY HH:mm:ssZ").format('DD MMMM YYYY')}</td>
                            </tr>
                            <tr>
                                <th>Report To</th>
                                <td>:</td>
                                <td>{payload.currentPosition.managerName ? payload.currentPosition.managerName : '[Automatically approved by system]'}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Segment>
                <Segment m={'0 10px 32px'} flexGrow={1}>
                    <Table responsive round>
                        <tbody>
                            <tr>
                                <th>Division</th>
                                <td>:</td>
                                <td>{payload.currentPosition.divisionName}</td>
                            </tr>
                            <tr>
                                <th>Department</th>
                                <td>:</td>
                                <td>{payload.currentPosition.departmentName}</td>
                            </tr>
                            <tr>
                                <th>Unit</th>
                                <td>:</td>
                                <td>{payload.currentPosition.unitName}</td>
                            </tr>
                            <tr>
                                <th>Level</th>
                                <td>:</td>
                                <td>{payload.currentPosition.levelName}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Segment>
            </Segment>
            {
                payload.currentPosition.id &&
                <Segment className={'u-tx-right'}>
                    <ButtonGroup>
                        <Button id="update" {...toogler} variant="primary" size={'small'} style={{ minWidth: 'auto' }} type="button">
                            <Icon name="edit" size="small" fillColor="white" />
                        </Button>
                    </ButtonGroup>
                </Segment>
            }
            <ModalLarge
                isOpen={isToogle.update}
                onClose={() => onClose('update')}
                title={<Text className="u-tx-center">Update Position</Text>}
                content={<UpdatePosition {...props} onClose={() => onClose('update')} />}
            />
        </Segment>
    )
}
export default CurrentPosition;