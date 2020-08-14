import { Toast } from '@elevenia/master-ui/components/Molecules';
import { useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useAction } from './useAction';

export const useAlertToast = (options = null) => {
    const { component: ToastComponent, show } = Toast();
    const { hasFetch } = useAction();
    const toastAlerts = useSelector(state => {
        return {
            status: state.setAlertsToast.notify.status,
            statName: state.setAlertsToast.notify.statName,
            message: state.setAlertsToast.notify.message,
        }
    });

    const showToast = useCallback(() => {
        show(toastAlerts.message, toastAlerts.statName, options);
    }, [toastAlerts.message, toastAlerts.statName, options, show])

    useEffect(() => {
        toastAlerts.status && showToast();
    }, [toastAlerts.status, hasFetch, showToast]);

    useEffect(() => {
        toastAlerts.status && hasFetch({ type: 'ALERT_TOAST_CLEARS' });
    }, [toastAlerts.status, hasFetch])

    return {
        ToastComponent
    }
}
