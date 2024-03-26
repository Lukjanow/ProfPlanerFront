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
            <Modal isDismissable={false} hideCloseButton={true} backdrop="blur" isOpen={isOpen} onClose={onClose} size='lg'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="py-5 gap-5">
                                <ModalHeader className="h-auto text-2xl">{t("advancedSearch")}</ModalHeader>
                                <p className={"text-md"}>
                                    {t("introAdvancedSearch")}
                                </p>
                                <ul className={"list-disc list-inside"}>
                                    <li><span className={"font-mono font-bold"}>{t("attributeEqualsValue")}</span></li>
                                    <li><span className={"font-mono font-bold"}>{t("attributeBiggerValue")}</span></li>
                                    <li><span className={"font-mono font-bold"}>{t("attributeSmallerValue")}</span></li>
                                </ul>
                                <p className={"text-md"}>
                                    {t("searchByAttributes")}
                                </p>
                                {
                                    props.headlineText === "/module" ?
                                        <>
                                            <ul className={"list-disc list-inside"}>
                                                <li>dozent</li>
                                                <li>room</li>
                                                <li>studyCourse</li>
                                                <li>duration</li>
                                            </ul>
                                            <p className={"text-md"}>
                                                {t("noAttributeBehaviourModule")}
                                            </p>
                                        </> :
                                        <></>
                                }
                                {
                                    props.headlineText === "/room" ?
                                        <>
                                            <ul className={"list-disc list-inside"}>
                                                <li>capacity</li>
                                                <li>roomType</li>
                                            </ul>
                                            <p className={"text-md"}>
                                                {t("noAttributeBehaviourRoom")}
                                            </p>
                                        </> :
                                        <></>
                                }
                                {
                                    props.headlineText === "/dozent" ?
                                        <>
                                            <ul className={"list-disc list-inside"}>
                                                <li>salutation</li>
                                                <li>title</li>
                                                <li>email</li>
                                            </ul>
                                            <p className={"text-md"}>
                                                {t("noAttributeBehaviourDozent")}
                                            </p>
                                        </> :
                                        <></>
                                }
                                {
                                    props.headlineText === "/studycourse" ?
                                        <>
                                            <ul className={"list-disc list-inside"}>
                                                <li>content</li>
                                                <li>semesterCount</li>
                                            </ul>
                                            <p className={"text-md"}>
                                                {t("noAttributeBehaviourStudyCourse")}
                                            </p>
                                        </> :
                                        <></>
                                }
                            </ModalBody>
                            <ModalFooter>
                                <Button onPress={() => {
                                    props.onClickCancel();
                                    onClose();
                                }}>
                                    {t("close")}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >
        </>
    );
}
