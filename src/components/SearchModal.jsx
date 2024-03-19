import React, { useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';


export default function SearchModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (props.value) {
            onOpen();
        }
    }, [props.value]);

    return (
        <>
            <Modal isDismissable={false} backdrop="blur" isOpen={isOpen} onClose={onClose} hideCloseButton={true} size='5xl'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="py-5 gap-5">
                                <ModalHeader className="h-auto text-2xl">{props.headlineText}</ModalHeader>
                                <p style={{whiteSpace: "pre-line"}}>
                                    {props.bodyText}
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button onPress={() => {
                                    props.onClickCancel();
                                    onClose();
                                }}>
                                    Schließen
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
