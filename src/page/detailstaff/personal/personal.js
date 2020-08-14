import React, { useEffect } from 'react';
import { Segment, Row, Col, Text, Button, Icon } from '@elevenia/master-ui/components/Atom';
import DetailPersonal from './DetailPersonal';
import { useMultiToogle, useAction } from 'hooks';
import CreatePersonal from './CreatePersonal';
import ModalXlarge from 'component/ModalCustom/modalXlarge';
import { requestIdentityType, requestPersonalInformation } from 'store/actions/personalInformation';
import PhotosQR from './PhotosQR';
import { useSelector } from 'react-redux';
import UpdatePersonal from './UpdatePersonal';

const Personal = (props) => {
    const { id } = props.match.params;
    const { hasFetch } = useAction();
    const { isToogle, toogler, onClose } = useMultiToogle({
        create: false,
        update: false
    })
    useEffect(() => {
        hasFetch(requestIdentityType());
        hasFetch(requestPersonalInformation(id));
    }, [hasFetch, id])
    const payload = useSelector(state => {
        return {
            data: state.personalInformation.data
        }
    })

    return (
        <>
            <Row mb={24}>
                <Col wide={3} pr={16}>
                    <PhotosQR />
                </Col>
                <Col wide={9} pl={16}>
                    <Segment boxShadow borderRadius={4} p={16}>
                        <DetailPersonal  {...props} />
                        <Segment justifyContent={'flex-end'} mt={24}>
                            {
                                payload.data.id === null ? <Button id="create" {...toogler}>
                                    <Icon fillColor="white" size={16} name="plus" mr={4} />
                                    Create
                                </Button>
                                    :
                                    <Button id="update" {...toogler} variant="primary"{...toogler}>
                                        <Icon fillColor="white" size={16} name="plus" mr={4} />
                                    Update
                                </Button>
                            }
                        </Segment>
                    </Segment>
                </Col>
            </Row>
            <ModalXlarge
                isOpen={isToogle.create}
                onClose={() => onClose('create')}
                title={<Text className="u-tx-center">Create Personal Information</Text>}
                content={<CreatePersonal {...props} onClose={() => onClose('create')} />}
            />
            <ModalXlarge
                isOpen={isToogle.update}
                onClose={() => onClose('update')}
                title={<Text className="u-tx-center">Update Personal Information</Text>}
                content={<UpdatePersonal {...props} onClose={() => onClose('update')} />}
            />
        </>
    )
}
export default Personal