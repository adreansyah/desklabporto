import React, { useEffect } from 'react';
import { Segment, Text, Button, Icon } from '@elevenia/master-ui/components/Atom';
import CurrentPosition from './CurrentPosition';
import PreviousPosition from './PreviousPosition';
import ModalLarge from 'component/ModalCustom/modalLarge';
import { useMultiToogle, useAction } from 'hooks';
import CreatePosition from './CreatePosition';
import { requestListDivision } from 'store/actions/division';
import { requestListDepartement } from 'store/actions/departement';
import { requestListPositionLevel } from 'store/actions/positionlevel';
import { requestListUnitResources } from 'store/actions/unitresource';
import { requestListPositionTitle } from 'store/actions/positiontitle';
import { requestLeaveApproverById } from 'store/actions/staff';

const Position = (props) => {
    const { id } = props.match.params
    const { hasFetch } = useAction();
    const { isToogle, toogler, onClose } = useMultiToogle({
        create: false
    });
    useEffect(() => {
        hasFetch(requestListDivision({ unpaged: true }));
        hasFetch(requestListDepartement({ unpaged: true }));
        hasFetch(requestListPositionLevel({ unpaged: true }));
        hasFetch(requestListUnitResources({ unpaged: true }));
        hasFetch(requestListPositionTitle({ unpaged: true }));
        hasFetch(requestLeaveApproverById(id))

    }, [hasFetch, id]);
    return (
        <Segment mb={32}>
            <Segment display='flex' justifyContent='space-between' alignItems='center' mb={24}>
                <Text H16 color='black70'>Current Position</Text>
                <Button id="create" {...toogler}>
                    <Icon fillColor="white" size={16} name="plus" mr={4} />
                    Create
                </Button>
            </Segment>
            <Segment mb={24}>
                <CurrentPosition {...props} />
            </Segment>
            <Segment display='flex' justifyContent='space-between' alignItems='center' mb={24}>
                <Text H16 color='black70'>Previous Position</Text>
            </Segment>
            <Segment mb={24}>
                <PreviousPosition {...props} />
            </Segment>
            <ModalLarge
                isOpen={isToogle.create}
                onClose={() => onClose('create')}
                title={<Text className="u-tx-center">Create Position</Text>}
                content={<CreatePosition {...props} onClose={() => onClose('create')} />}
            />
        </Segment>
    )
}
export default Position