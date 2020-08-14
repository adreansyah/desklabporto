import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAction } from './useAction';

export const useAlertBlock = ({TimeOut}) => {
    const { hasFetch } = useAction();
    const AlertBlock = useSelector(state => {
        return {
            Block: state.setAlerts.notify.componentMessage.block,
            status: state.setAlerts.notify.status
        }
    });

    useEffect(() => {
        AlertBlock.status && setTimeout(() => hasFetch({ type: 'ALERT_CLEARS' }), TimeOut)
    }, [hasFetch, AlertBlock.status, TimeOut])

    return { AlertBlockComponent: AlertBlock.Block }
}