import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAction, useAlertToast } from 'hooks';
import { requestListFamilyById, requestListEmergencyContactById } from 'store/actions/familystaff';
import FamilySection from './component/FamilySection'
import EmergencySection from './component/EmergencyContactSection'


const Family = (props) => {

    const { hasFetch } = useAction();
    const { id } = props.match.params;

    const { ToastComponent } = useAlertToast({
        timeout: 3000,
        placement: 'center',
        space: 10,
        animate: 'slide',
        m: 20,
    });
    const payload = useSelector(state => {
        return {
            dataFamily: state.familyStaff.dataFamily,
            dataEmergencyContact: state.familyStaff.dataEmergencyContact,
            isLoading: state.familyStaff.isLoading,
        }
    });

    useEffect(() => {
        hasFetch(requestListFamilyById(id));
        hasFetch(requestListEmergencyContactById(id));
    }, [hasFetch, id])
    return (
        <>
            {ToastComponent}
            <FamilySection {...props} employeeId={id} payload={payload} />
            <EmergencySection {...props} employeeId={id} payload={payload} />
        </>


    )
}
export default Family