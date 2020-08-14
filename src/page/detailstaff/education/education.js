import React from 'react';
import { useAlertToast  } from 'hooks';
import FormalSection from './FormalSection'
import InformalSection from './InformalSection'
const Education = (props) => {
    const { ToastComponent } = useAlertToast({
        timeout: 3000,
        placement: 'center',
        space: 10,
        animate: 'slide',
        m: 20,
    });
    return (
        <>
            {ToastComponent}
            <FormalSection {...props} />
            <InformalSection {...props} />
        </>
    )
}
export default Education