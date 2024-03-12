import React, { useEffect, useState, useRef } from "react";
import PageContainer from "../components/PageContainer.jsx";
import { useTranslation } from "react-i18next";
import { SectionContainer } from "../components/SectionContainer.jsx";
import { Input, Textarea, Chip, Button } from "@nextui-org/react";
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
import { FilledButton } from "../components/FilledButton.jsx";

export default function StudyCourseDetailPage() {
  const { t } = useTranslation();
  const { studycourseId } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const qualificationFocusInputRef = useRef(null)


  const [name, setName] = useState("");
  const [subjectSemesterCount, setSubjectSemesterCount] = useState("");
  const [qualificationFocus, setQualificationFocus] = useState("");
  const [qualificationFocusList, setQualificationFocusList] = useState(["Visual Computing", "Network Security", "Software Engineering & Development"]);

  const [errors, setErrors] = useState({
    name: false,
    subjectSemesterCount: false,
    qualificationFocus: false,
  });

  // useEffect(() => {
  //   if (studycourseId) {
  //     getRoomById(studycourseId)
  //       .then((response) => {
  //         setRoomNumber(response.data.name);
  //         setCapacity(response.data.subjectSemesterCount);
  //         setRoomType([response.data.qualificationFocus]);
  //         console.log("-------------------------------------> RoomType: ", [
  //           response.data.name,
  //         ]);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching room:", error);
  //       });
  //   }
  // }, [studycourseId]);

  // const handleSelectionChange = (e) => {
  //   if (e.target.name === "roomType") {
  //     setRoomType([e.target.value]);
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const validationErrors = validateForm();

  //   if (Object.keys(validationErrors).length === 0) {
  //     if (studycourseId) {
  //       const newRoom = new RoomModel(
  //         roomNumber,
  //         parseInt(capacity),
  //         roomTypesOptions[0]
  //       );
  //       updateRoom(studycourseId, newRoom)
  //         .then((response) => {
  //           console.log("Room updated: ", response);
  //         })
  //         .catch((error) => {
  //           console.error("Error updating room:", error);
  //         });

  //       return;
  //     }

  //     const newRoom = new RoomModel(
  //       roomNumber,
  //       parseInt(capacity),
  //       roomTypesOptions[0]
  //     );

  //     addRoom(newRoom)
  //       .then((response) => {
  //         console.log("Room saved: ", response);
  //       })
  //       .catch((error) => {
  //         console.error("Error saving room:", error);
  //       });
  //   } else {
  //     console.error("Error: ", errors);
  //   }
  // };

  // const handleDelete = () => {
  //   deleteRoom(studycourseId)
  //     .then((response) => {
  //       console.log("Room deleted: ", response);
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting room:", error);
  //     });
  //   navigate("/basicdata");
  // };

  // const validateForm = () => {
  //   let errors = {};

  //   if (!capacity) {
  //     errors.capacity = true;
  //   }

  //   if (!roomNumber.trim()) {
  //     errors.roomNumber = true;
  //   }

  //   if (!/^\d+$/.test(capacity)) {
  //     errors.capacity = true;
  //   }

  //   setErrors(errors);
  //   return errors;
  // };


  return (
    <PageContainer
      title={studycourseId ? `${name}` : `${t("newStudyCourse")}`}
      //onClickPrimary={(e) => handleSubmit(e)}
      primaryButtonTitle={t("save")}
      showDeleteButton={studycourseId ? true : false}
      onClickDelete={() => setShowModal(true)}
    >
      <DeleteModal
        value={showModal}
        onClickCancel={() => {
          setShowModal(false);
        }}
        //onClickDelete={handleDelete}
        headlineText={t("deleteQuestion")}
        bodyText={t("deleteRoomInfo")}
      />
      <form>
        <SectionContainer title={t("general")}>
          <div className="flex lg:flex-row flex-col gap-5">
            <Input
              name={"name"}
              isRequired
              isInvalid={errors.name}
              errorMessage={
                errors.name ? `${t("name")} ${t("isRequired")}` : ""
              }
              type="text"
              label={t("name")}
              className={"lg:max-w-[350px]"}
              value={name}
              onValueChange={(value) => {
                setName(value);
                if (!value.trim()) {
                  setErrors({ ...errors, name: true });
                } else {
                  setErrors({ ...errors, name: false });
                }
              }}
            />
            <Input
              name={"subjectSemesterCount"}
              isRequired
              isInvalid={errors.subjectSemesterCount}
              errorMessage={
                errors.subjectSemesterCount ? `${t("semesterCount")} ${t("isInvalid")}` : ""
              }
              type="number"
              label={t("semesterCount")}
              className={"lg:max-w-[350px]"}
              value={subjectSemesterCount}
              onValueChange={(value) => {
                setSubjectSemesterCount(value);
                if (!(value > 0)) {
                  setErrors({ ...errors, subjectSemesterCount: true });
                } else {
                  setErrors({ ...errors, subjectSemesterCount: false });
                }
              }}
            />
            <div className="flex flex-col gap-2">
              <Input
                name={"qualificationFocus"}
                ref={qualificationFocusInputRef}
                isRequired
                isInvalid={errors.qualificationFocus}
                errorMessage={
                  errors.qualificationFocus ? `${t("qualificationFocus")} ${t("isInvalid")}` : ""
                }
                type="text"
                label={t("qualificationFocus")}
                endContent={
                  <FilledButton
                    text={t("add")}
                    color="primary"
                    onClick={() => {
                      if (qualificationFocus.trim()) {
                        setQualificationFocusList((prevItems) => [...prevItems, qualificationFocus])
                        setQualificationFocus("")
                        setErrors({ ...errors, qualificationFocus: false });
                        // TODO: Don't use an setTimeout() for waiting to re-render  
                        setTimeout(() => {
                          qualificationFocusInputRef.current.focus();
                        }, 0);
                      } else {
                        setErrors({ ...errors, qualificationFocus: true });
                      }
                    }}
                  />
                }
                value={qualificationFocus}
                onValueChange={(value) => {
                  setQualificationFocus(value);
                  if (!value.trim()) {
                    setErrors({ ...errors, qualificationFocus: true });
                  } else {
                    setErrors({ ...errors, qualificationFocus: false });
                  }
                }}
              />
              <div
                className={"lg:w-96"}
              >
                {
                  qualificationFocusList.map((item, index) => (
                    <Chip
                      size="md"
                      key={index}
                      className={"m-1 px-[10px] py-4"}
                      onClose={() => {
                        const list = qualificationFocusList.filter((searchItem) => searchItem !== item)
                        setQualificationFocusList(list)
                      }}
                    >
                      {item}
                    </Chip>
                  ))
                }
              </div>
            </div>
          </div>
        </SectionContainer>
      </form>
    </PageContainer >
  );
}
