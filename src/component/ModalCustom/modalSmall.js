import React from "react";
import { ModalLite, ModalHeader, ModalTitle, ModalBody, ModalFooter } from "@elevenia/master-ui/components/Molecules";
import { Segment } from "@elevenia/master-ui/components/Atom";
import PropTypes from 'prop-types';

const ModalSmall = ({ isOpen, onClose, title, content, ButtonFooter, position, target }) => {
    const top = position === "top" ? { position: "absolute", top: 30, width: '400px', padding: '24px' } : { width: '400px', padding: '24px' }
    return (
        <ModalLite isOpen={isOpen} toggle={() => onClose(target)} backdrop={true} style={top}>
            <ModalHeader>
                <ModalTitle>{title}</ModalTitle>
            </ModalHeader>
            <ModalBody>
                {content}
            </ModalBody>
            {
                ButtonFooter &&
                <ModalFooter>
                    <Segment flex={1} justifyContent={'flex-end'}>
                        {ButtonFooter}
                    </Segment>
                </ModalFooter>
            }
        </ModalLite>
    );
}
//Interface
ModalSmall.defaultProps = {
    title: "",
    content: "",
    ButtonFooter: "",
    position: "",
    target: ""
}

//Interface Rules
ModalSmall.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    position: PropTypes.string,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    ButtonFooter: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    target: PropTypes.string,
}
export default ModalSmall