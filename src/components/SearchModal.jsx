import React, { useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';


export default function SearchModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = useTranslation();

    useEffect(() => {
        if (props.value) {
            onOpen();
        }
    }, [props.value]);

    return (
        <>
            <Modal isDismissable={false} hideCloseButton={true} backdrop="blur" isOpen={isOpen} onClose={onClose} size='5xl'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="py-5 gap-5">
                                <ModalHeader className="h-auto text-2xl">{t("advancedSearch")}</ModalHeader>
                                <p style={{ whiteSpace: "pre-line" }}>
                                    {props.headlineText}
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
