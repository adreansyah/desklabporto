import React, { useEffect } from 'react';
import { Segment, Text, Button, Icon } from '@elevenia/master-ui/components/Atom';
import { useAlertToast, useSingleToggle, useAction } from 'hooks';
import TableStaff from './TableStaff';
import AddStaff from './AddStaff';
import ModalXlarge from 'component/ModalCustom/modalXlarge';
import { requestListDivision } from 'store/actions/division';
import { requestListDepartement } from 'store/actions/departement';
import { requestListPositionLevel } from 'store/actions/positionlevel';
import { requestListUnitResources } from 'store/actions/unitresource';
import { requestListPositionTitle } from 'store/actions/positiontitle';
import { requestLeaveApproverById } from 'store/actions/staff';
const Staff = (props) => {
    document.title = props.title
    const { hasFetch } = useAction();
    const [open, setOpen] = useSingleToggle(false);
    const { ToastComponent } = useAlertToast({
        timeout: 3000,
        placement: 'center',
        space: 10,
        animate: 'slide',
        m: 20,
    });
    useEffect(() => {
        hasFetch(requestListDivision({ unpaged: true }));
        hasFetch(requestListDepartement({ unpaged: true }));
        hasFetch(requestListPositionLevel({ unpaged: true }));
        hasFetch(requestListUnitResources({ unpaged: true }));
        hasFetch(requestListPositionTitle({ unpaged: true }));
        hasFetch(requestLeaveApproverById())
    }, [hasFetch])
    return (
        <Segment>
            {ToastComponent}
            <Segment justifyContent={'space-between'} alignItems={'center'} mb={20}>
                <Text H28>{document.title}</Text>
                <Button size="medium" onClick={() => setOpen(!open)} >
                    <Icon fillColor="white" size={16} name="plus" mr={4} />
                    Create
                </Button>
            </Segment>
            <TableStaff {...props} />
            <ModalXlarge
                isOpen={open}
                onClose={() => setOpen(!open)}
                title={<Text className="u-tx-center">Create Employee</Text>}
                content={<AddStaff onClose={() => setOpen(!open)} />}
            />
        </Segment>
    )
}
export default Staff;