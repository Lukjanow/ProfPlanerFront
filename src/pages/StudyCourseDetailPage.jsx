import React, { useEffect, useState, useRef, useContext } from "react";
import PageContainer from "../components/PageContainer.jsx";
import { useTranslation } from "react-i18next";
import { SectionContainer } from "../components/SectionContainer.jsx";
import { Input, Chip } from "@nextui-org/react";
import {
  addStudyCourse,
  updateStudyCourse,
  deleteStudyCourse,
  getStudyCourseById,
} from "../services/studyCourseService.js";
import { StudyCourseModel } from "../models/studyCourseModel.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal.jsx";
import { FilledButton } from "../components/FilledButton.jsx";
import { Context } from "../routes/root.jsx";


export default function StudyCourseDetailPage() {
  const { t } = useTranslation();
  const { studycourseId } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const qualificationFocusInputRef = useRef(null)
  const [setSnackbarData] = useContext(Context)


  const [name, setName] = useState("");
  const [subjectSemesterCount, setSubjectSemesterCount] = useState("");
  const [qualificationFocus, setQualificationFocus] = useState("");
  const [qualificationFocusList, setQualificationFocusList] = useState([]);

  const [errors, setErrors] = useState({
    name: false,
    subjectSemesterCount: false,
    qualificationFocus: false,
  });

  useEffect(() => {
    if (studycourseId) {
      getStudyCourseById(studycourseId)
        .then((response) => {
          setName(response.data.name);
          setSubjectSemesterCount([response.data.semesterCount]);
          setQualificationFocusList(response.data.content);
          console.log("StudyCourse fetched: ", response.data);
        })
        .catch((error) => {
          console.error("Error fetching studyCourse:", error);
        });
    }
  }, [studycourseId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      if (studycourseId) {
        const newStudyCourse = new StudyCourseModel(
          name,
          parseInt(subjectSemesterCount),
          qualificationFocusList
        );

        updateStudyCourse(studycourseId, newStudyCourse)
          .then((response) => {
            console.log(t("successfullyUpdatedStudyCourse"), response);
            setSnackbarData({ type: "success", message: t("successfullyUpdatedStudyCourse"), visible: true })
            navigate("/basicdata")
          })
          .catch((error) => {
            console.error(t("errorUpdatingStudyCourse"), error);
            setSnackbarData({ type: "error", message: t("errorUpdatingStudyCourse"), visible: true })
          });

        return;
      }

      const newStudyCourse = new StudyCourseModel(
        name,
        parseInt(subjectSemesterCount),
        qualificationFocusList
      );

      addStudyCourse(newStudyCourse)
        .then((response) => {
          console.log(t("successfullySavedStudyCourse"), response);
          setSnackbarData({ type: "success", message: t("successfullySavedStudyCourse"), visible: true })
          navigate("/basicdata")
        })
        .catch((error) => {
          console.error(t("errorSavingStudyCourse"), error);
          setSnackbarData({ type: "error", message: t("errorSavingStudyCourse"), visible: true })
        });
    } else {
      console.error("Error: ", errors);
    }
  };

  const handleDelete = () => {
    deleteStudyCourse(studycourseId)
      .then((response) => {
        console.log(t("successfullyDeletedStudyCourse"), response);
        setSnackbarData({ type: "success", message: t("successfullyDeletedStudyCourse"), visible: true })
        navigate("/basicdata")
      })
      .catch((error) => {
        console.error(t("errorDeletingStudyCourse"), error);
        setSnackbarData({ type: "error", message: t("errorDeletingStudyCourse"), visible: true })
      });
  };

  const validateForm = () => {
    let errors = {};

    if (!name.trim()) {
      errors.name = true;
    }

    if (!(subjectSemesterCount > 0)) {
      errors.subjectSemesterCount = true;
    }

    setErrors(errors);
    return errors;
  };


  return (
    <form>
      <PageContainer
        title={studycourseId ? `${name}` : `${t("newStudyCourse")}`}
        onClickPrimary={(e) => handleSubmit(e)}
        primaryButtonTitle={t("save")}
        showDeleteButton={studycourseId ? true : false}
        onClickDelete={() => setShowModal(true)}
        onClickCancel={() => navigate("/basicdata")}
      >
        <DeleteModal
          value={showModal}
          onClickCancel={() => {
            setShowModal(false);
          }}
          onClickDelete={handleDelete}
          headlineText={t("deleteQuestion")}
          bodyText={t("deleteStudyCourseInfo")}
        />
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
              radius={"sm"}
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
              radius={"sm"}
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
                    size={"sm"}
                    isDisabled={qualificationFocus ? false : true}
                    onClick={(e) => {
                      e.preventDefault();

                      if (qualificationFocus.trim()) {
                        setQualificationFocusList((prevItems) => [...prevItems, qualificationFocus])
                        setQualificationFocus("")
                        setErrors({ ...errors, qualificationFocus: false });
                        setTimeout(() => {
                          qualificationFocusInputRef.current.focus();
                        }, 0);
                      }
                    }}
                  />
                }
                radius={"sm"}
                value={qualificationFocus}
                onValueChange={(value) => {
                  setQualificationFocus(value);
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
      </PageContainer >
    </form>
  );
}
