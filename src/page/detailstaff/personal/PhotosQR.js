import React from 'react';
import { Segment, Text, Button, Icon, Img } from '@elevenia/master-ui/components/Atom';
import { useSelector } from 'react-redux';

const PhotosQR = () => {
    const payload = useSelector(state => {
        return {
            personalData: state.personalInformation.personalData
        }
    })
    return (
        <>
            {/* <Segment position={'relative'} mb={16} border={'1px solid #DCDEE3'} borderRadius={8}> */}
            <Segment position={'relative'} mb={16} border={'1px solid transparant'} borderRadius={8}>
                {
                    payload.personalData.imageUrl !== null ? 
                        <Img src={payload.personalData[0].imageUrl} width={'100%'} />
                        :
                        <Icon name={'profile'} size={'100%'} />
                }
                <Segment position={'absolute'} bottom={16} right={16}>
                    <Text fontWeight={500}>QR</Text>
                </Segment>
            </Segment>
            <Segment className={'u-tx-center'}>
                <Button variant='secondary-alt'>
                    <Icon fillColor="black" size={16} name="fingerprint" mr={4} />
                    Generate QR Code
                </Button>
            </Segment>
        </>
    )
}
export default PhotosQR;