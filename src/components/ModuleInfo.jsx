import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { OutlinedButton } from "./OutlinedButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

export function ModuleInfo({ isOpen, onOpenChange, event, removeFunction }) {
    const { t } = useTranslation();
  const modalStyle = {
    backgroundColor: event.backgroundcolor,
    borderColor: event.bordercolor,
    borderInlineStartWidth: "15px",
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="border-1" style={modalStyle}>
        {(onClose) => (
          <>
            <ModalBody>
              <ModalHeader></ModalHeader>
              <p className="font-semibold">{event.name}</p>
              <div className="flex">
                <span className="flex justify-center items-center justify-self-center w-[30px]">
                  <FontAwesomeIcon icon="fa-solid fa-graduation-cap" />
                </span>
                <span>{event.study_semester_string}</span>
              </div>
              <div className="flex">
                <span className="flex justify-center items-center justify-self-center w-[30px]">
                  <FontAwesomeIcon icon="fa-solid fa-user" />
                </span>
                <span>{event.dozent_string}</span>
              </div>
              <div className="flex">
                <span className="flex justify-center items-center justify-self-center w-[30px]">
                  <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                </span>
                <span>{event.room_string}</span>
              </div>
            </ModalBody>
            <ModalFooter>
              <OutlinedButton
                color={"primary"}
                text={t("remove")}
                onClick={() => {
                  onClose();
                  removeFunction();
                }}
              />
              <OutlinedButton
                color={"danger"}
                text={t("close")}
                onClick={onClose}
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
