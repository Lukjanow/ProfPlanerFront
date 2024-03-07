import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { OutlinedButton } from "./OutlinedButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ModuleInfo({ isOpen, onOpenChange, event, removeFunction }) {
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
                <span>{event.studySemester}</span>
              </div>
              <div className="flex">
                <span className="flex justify-center items-center justify-self-center w-[30px]">
                  <FontAwesomeIcon icon="fa-solid fa-user" />
                </span>
                <span>{event.dozent}</span>
              </div>
              <div className="flex">
                <span className="flex justify-center items-center justify-self-center w-[30px]">
                  <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                </span>
                <span>{event.room}</span>
              </div>
            </ModalBody>
            <ModalFooter>
              <OutlinedButton
                color={"primary"}
                text={"Entfernen"}
                onClick={() => {
                  removeFunction();
                  onClose();
                }}
              />
              <OutlinedButton
                color={"danger"}
                text={"Schließen"}
                onClick={onClose}
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
