import { useState, useCallback } from 'react';//


export const useSingleToggle = (initial) => {
    const [open, setOpen] = useState(initial);
    const [batch, setbatch] = useState(null);
    return [open, useCallback((batch) => {
        setbatch(batch);
        setOpen(status => !status)
    }, []), batch];
};

export const useMultiToogle = (isStatement) => {
    const [isToogle, setToogle] = useState(isStatement);
    return {
        isToogle,
        toogler: {
            onClick: (e) => {
                const { id } = e.target
                setToogle(prev => {
                    return {
                        ...prev,
                        [id]: !isToogle[id]
                    }
                })
            }
        },
        onClose: (id) => {
            setToogle(prev => {
                return {
                    ...prev,
                    [id]: !isToogle[id]
                }
            })
        }
    }
}
