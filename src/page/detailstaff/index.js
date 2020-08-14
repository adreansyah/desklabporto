import React, { useState, useEffect } from 'react';
import { Segment, Text, Button, ButtonGroup } from '@elevenia/master-ui/components/Atom';
import { Tabs } from '@elevenia/master-ui/components/Molecules';
import Personal from './personal/personal';
import Family from './family/family';
import Education from './education/education';
import Position from './position/position';
import WorkingHistory from './workinghistory/WorkingHistory';
import { useAlertToast, useAction } from 'hooks';
import { useSelector } from 'react-redux';
import { resignActionPopUp } from 'store/actions/personalInformation';
import { requestCurrentPosition } from 'store/actions/positioninformation';
import ModalSmall from 'component/ModalCustom/modalSmall';

const DetailStaff = (props) => {
    document.title = props.title
    const { id } = props.match.params;
    const { hasFetch } = useAction();
    const [stateByTab, setstateByTab] = useState('personal');
    const [isOpen, setOpen] = useState(false);
    const [isOpenAlert, setOpenAlert] = useState(false);
    const contentRender = () => {
        switch (stateByTab) {
            case "personal":
                return (<Personal {...props} />)
            case "family":
                return (<Family {...props} />)
            case "education":
                return (<Education {...props} />)
            case "position":
                return (<Position  {...props} />)
            case "workinghistory":
                return (<WorkingHistory {...props} />)
            default:
                break;
        }
    }

    useEffect(() => {
        hasFetch(requestCurrentPosition(id));
    }, [hasFetch, id]);

    const { ToastComponent } = useAlertToast({
        timeout: 3000,
        placement: 'center',
        space: 10,
        animate: 'slide',
        m: 20,
    });
    const payload = useSelector(state => {
        return {
            personalData: state.personalInformation.personalData,
            currentPosition: state.positionInformation.currentPosition
        }
    })
    const openAlert = () => {
        setOpenAlert(!isOpenAlert)
    }
    const hasResignPopUpExec = (id) => {
        payload.currentPosition.id !== null
            ? hasFetch(resignActionPopUp(id))
            : setOpenAlert(!isOpenAlert) || setOpen(!isOpen)
    }
    return (
        <Segment>
            {ToastComponent}
            {
                payload.personalData[0] !== undefined &&
                <>
                    <Segment mb={24}>
                        <Text H28 color='black70'>Details {document.title}</Text>
                    </Segment>
                    <Segment style={{ position: "absolute", top: 75, right: 0 }} pr={16}>
                        {
                            payload.personalData[0].status === "ACTIVE" && <Button onClick={() => openAlert()} type="button">Resigned</Button>
                        }
                    </Segment>
                    <Tabs active={stateByTab} onChange={active => setstateByTab(active)} style={{ marginBottom: 16 }}>
                        <div key="personal">Personal</div>
                        <div key="family">Family</div>
                        <div key="education">Education</div>
                        <div key="position">Position</div>
                        <div key="workinghistory">Working History</div>
                    </Tabs>
                    <Segment py={8}>
                        {contentRender()}
                    </Segment>
                </>
            }
            <ModalSmall
                isOpen={isOpen}
                onClose={() => setOpen(!isOpen)}
                title={<Text className="u-tx-center" style={{ color: "red" }}>Employee "Position" must be required !!! </Text>}
                ButtonFooter={
                    <ButtonGroup responsive>
                        <Button variant="secondary-alt" onClick={() => setOpen(!isOpen)}>
                            <Text>Close</Text>
                        </Button>
                    </ButtonGroup>
                }
            />
            <ModalSmall
                isOpen={isOpenAlert}
                onClose={() => setOpenAlert(!isOpenAlert)}
                title={<Text className="u-tx-center">Resigned Employee</Text>}
                content={`Are you sure you want to update this employee status?`}
                ButtonFooter={
                    <ButtonGroup responsive>
                        <Button variant="secondary-alt" onClick={() => setOpenAlert(!isOpenAlert)}>
                            <Text>Cancel</Text>
                        </Button>
                        <Button onClick={() => hasResignPopUpExec(payload.personalData[0].id)}>
                            <Text>Yes</Text>
                        </Button>
                    </ButtonGroup>
                }
            />
        </Segment>
    )
}
export default DetailStaff