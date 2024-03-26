import React, { useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { useTranslation } from "react-i18next";


export default function DeleteModal(props) {
    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (props.value) {
            onOpen();
        }
    }, [props.value]);

    return (
        <>
            <Modal isDismissable={false} backdrop="blur" isOpen={isOpen} onClose={onClose} hideCloseButton={true}>
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
                                <Button radius={"sm"} onPress={() => {
                                    props.onClickCancel();
                                    onClose();
                                }}>
                                    {t("cancel")}
                                </Button>
                                <Button radius={"sm"} onPress={() => {
                                    props.onClickDelete();
                                    onClose();
                                }} color="danger">
                                    {t("delete")}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
