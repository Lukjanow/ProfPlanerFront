import React, { useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';


export default function DeleteModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (props.value) {
            onOpen();
        }
    }, [props.value]);

    return (
        <>
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} hideCloseButton={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="py-5 gap-5">
                                <ModalHeader className="h-auto text-2xl">{props.headlineText}</ModalHeader>
                                <p>
                                    {props.bodyText}
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button onPress={() => {
                                    props.onClickCancel();
                                    onClose();
                                }}>
                                    Abbrechen
                                </Button>
                                <Button onPress={() => {
                                    props.onClickDelete();
                                    onClose();
                                }} color="danger">
                                    Löschen
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
