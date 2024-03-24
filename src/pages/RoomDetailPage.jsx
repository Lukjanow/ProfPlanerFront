import React, { useEffect, useState, useContext } from "react";
import PageContainer from "../components/PageContainer.jsx";
import { useTranslation } from "react-i18next";
import { SectionContainer } from "../components/SectionContainer.jsx";
import { Input } from "@nextui-org/react";
import SelectBox from "../components/SelectBox.jsx";
import {
  addRoom,
  updateRoom,
  deleteRoom,
  getRoomById,
} from "../services/roomService.js";
import { RoomModel } from "../models/roomModel.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal.jsx";
import { Context } from "../routes/root.jsx";


export default function RoomDetailPage({ isShownAsModal = false, closeModal }) {
  const { t } = useTranslation();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [setSnackbarData] = useContext(Context)

  // const roomTypesOptions = [t("auditorium"), t("laboratory")];
  const roomTypesOptions = ["auditorium", "laboratory"];

  const [roomType, setRoomType] = useState([roomTypesOptions[0]]);
  const [roomNumber, setRoomNumber] = useState("");
  const [capacity, setCapacity] = useState();

  const [errors, setErrors] = useState({
    roomNumber: false,
    capacity: false,
  });

  useEffect(() => {
    if (roomId) {
      getRoomById(roomId)
        .then((response) => {
          setRoomNumber(response.data.roomNumber);
          setCapacity(response.data.capacity);
          setRoomType([response.data.roomType]);
          console.log("-------------------------------------> RoomType: ", [
            response.data.roomType,
          ]);
        })
        .catch((error) => {
          console.error("Error fetching room:", error);
        });
    }
  }, [roomId]);

  const handleSelectionChange = (e) => {
    if (e.target.name === "roomType") {
      setRoomType([e.target.value]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      if (roomId) {
        const newRoom = new RoomModel(
          roomNumber,
          parseInt(capacity),
          roomType[0]
        );
        updateRoom(roomId, newRoom)
          .then((response) => {
            console.log(t("successfullyUpdatedRoom"), response);
            setSnackbarData({ type: "success", message: t("successfullyUpdatedRoom"), visible: true })
            navigate("/basicdata")
          })
          .catch((error) => {
            console.error(t("errorUpdatingRoom"), error);
            setSnackbarData({ type: "error", message: t("errorUpdatingRoom"), visible: true })
          });

        return;
      }

      const newRoom = new RoomModel(
        roomNumber,
        parseInt(capacity),
        roomType[0]
      );

      addRoom(newRoom)
        .then((response) => {
          console.log(t("successfullySavedRoom"), response);
          setSnackbarData({ type: "success", message: t("successfullySavedRoom"), visible: true })

          if (isShownAsModal) {
            closeModal()
            return;
          }
          navigate("/basicdata")
        })
        .catch((error) => {
          console.error(t("errorSavingRoom"), error);
          setSnackbarData({ type: "error", message: t("errorSavingRoom"), visible: true })
        });
    } else {
      console.error("Error: ", errors);
    }
  };

  const handleDelete = () => {
    deleteRoom(roomId)
      .then((response) => {
        console.log(t("successfullyDeletedRoom"), response);
        setSnackbarData({ type: "success", message: t("successfullyDeletedRoom"), visible: true })
        navigate("/basicdata")
      })
      .catch((error) => {
        console.error(t("errorDeletingRoom"), error);
        setSnackbarData({ type: "error", message: t("errorDeletingRoom"), visible: true })
      });
  };

  const validateForm = () => {
    let errors = {};

    if (!capacity) {
      errors.capacity = true;
    }

    if (!roomNumber.trim()) {
      errors.roomNumber = true;
    }

    if (!/^\d+$/.test(capacity)) {
      errors.capacity = true;
    }

    setErrors(errors);
    return errors;
  };

  return (
    <form>
      <PageContainer
        title={roomId ? `${roomNumber}` : `${t("newRoom")}`}
        onClickPrimary={(e) => handleSubmit(e)}
        primaryButtonTitle={t("save")}
        showDeleteButton={roomId ? true : false}
        onClickDelete={() => setShowModal(true)}
        onClickCancel={() => isShownAsModal ? closeModal() : navigate("/basicdata")}
      >
        <DeleteModal
          value={showModal}
          onClickCancel={() => {
            setShowModal(false);
          }}
          onClickDelete={handleDelete}
          headlineText={t("deleteQuestion")}
          bodyText={t("deleteRoomInfo")}
        />
        <SectionContainer title={t("general")}>
          <div className="flex lg:flex-row flex-col gap-5">
            <SelectBox
              name={"roomType"}
              title={t("roomType")}
              disallowEmptySelection={true}
              items={roomTypesOptions}
              className={"lg:max-w-[175px]"}
              selectedKeys={roomType}
              onChange={handleSelectionChange}
            />
            <Input
              name={"roomNumber"}
              isRequired
              isInvalid={errors.roomNumber}
              errorMessage={
                errors.roomNumber ? `${t("roomNumber")} ${t("isRequired")}` : ""
              }
              type="text"
              label={t("roomNumber")}
              className={"lg:max-w-[350px]"}
              value={roomNumber}
              onValueChange={(value) => {
                setRoomNumber(value);
                if (!value.trim()) {
                  setErrors({ ...errors, roomNumber: true });
                } else {
                  setErrors({ ...errors, roomNumber: false });
                }
              }}
            />
            <Input
              name={"capacity"}
              isRequired
              isInvalid={errors.capacity}
              errorMessage={
                errors.capacity ? `${t("capacity")} ${t("isInvalid")}` : ""
              }
              type="text"
              label={t("capacity")}
              className={"lg:max-w-[350px]"}
              value={capacity}
              onValueChange={(value) => {
                setCapacity(value);
                if (!value) {
                  setErrors({ ...errors, capacity: true });
                } else {
                  setErrors({ ...errors, capacity: false });
                }
              }}
            />
          </div>
        </SectionContainer>
      </PageContainer>
    </form>
  );
}
