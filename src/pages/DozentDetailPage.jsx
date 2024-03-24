import React, { useEffect, useState, useContext } from "react";
import PageContainer from "../components/PageContainer.jsx";
import { useTranslation } from "react-i18next";
import { SectionContainer } from "../components/SectionContainer.jsx";
import { Input } from "@nextui-org/react";
import SelectBox from "../components/SelectBox.jsx";
import { addDozent, getDozentById, deleteDozent, updateDozent } from "../services/dozentService.js";
import { DozentModel } from "../models/dozentModel.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal.jsx";
import { Context } from "../routes/root.jsx";


export default function DozentDetailPage({ isShownAsModal = false, closeModal }) {
    const { t } = useTranslation();
    const { dozentId } = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [setSnackbarData] = useContext(Context)

    const titleOptions = ["keine Angabe", "Prof.", "Prof. Dr."]
    const salutationOptions = ["keine Angabe", "Frau", "Herr"]

    const [salutation, setSalutation] = useState([salutationOptions[0]])
    const [title, setTitle] = useState([titleOptions[0]])
    const [prename, setPrename] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")

    const [errors, setErrors] = useState({
        prename: false,
        lastname: false,
        email: false
    });


    useEffect(() => {
        if (dozentId) {
            getDozentById(dozentId)
                .then(response => {
                    console.log("Dozent fetched: ", response.data)
                    setSalutation([response.data.salutation])
                    setTitle([response.data.title])
                    setPrename(response.data.prename)
                    setLastname(response.data.lastname)
                    setEmail(response.data.email)
                })
                .catch(error => {
                    console.error("Error fetching dozent:", error);
                });
        }
    }, [dozentId])


    const handleSelectionChange = (e) => {
        if (e.target.name === "salutation") {
            setSalutation([e.target.value]);
        }
        if (e.target.name === "title") {
            setTitle([e.target.value]);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault()

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            if (dozentId) {
                const newTeacher = new DozentModel(salutation[0], title[0], prename, lastname, email)
                updateDozent(dozentId, newTeacher)
                    .then(response => {
                        console.log(t("successfullyUpdatedDozent"), response);
                        setSnackbarData({ type: "success", message: t("successfullyUpdatedDozent"), visible: true })
                        navigate("/basicdata")
                    })
                    .catch(error => {
                        console.error(t("errorUpdatingDozent"), error);
                        setSnackbarData({ type: "error", message: t("errorUpdatingDozent"), visible: true })
                    })

                return
            }

            const newTeacher = new DozentModel(salutation[0], title[0], prename, lastname, email)
            addDozent(newTeacher)
                .then(response => {
                    console.log(t("successfullySavedDozent"), response);
                    setSnackbarData({ type: "success", message: t("successfullySavedDozent"), visible: true })

                    if (isShownAsModal) {
                        closeModal()
                        return;
                    }
                    navigate("/basicdata")
                })
                .catch(error => {
                    console.error(t("errorSavingDozent"), error);
                    setSnackbarData({ type: "error", message: t("errorSavingDozent"), visible: true })
                })
        } else {
            console.error("Error: ", errors);
        }
    }


    const handleDelete = () => {
        deleteDozent(dozentId)
            .then(response => {
                console.log(t("successfullyDeletedDozent"), response);
                setSnackbarData({ type: "success", message: t("successfullyDeletedDozent"), visible: true })
                navigate("/basicdata")
            })
            .catch(error => {
                console.error(t("errorDeletingDozent"), error);
                setSnackbarData({ type: "error", message: t("errorDeletingDozent"), visible: true })
            })
    }


    const validateForm = () => {
        let errors = {};

        if (!prename.trim()) {
            errors.prename = true;
        }

        if (!lastname.trim()) {
            errors.lastname = true;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = true;
        }

        setErrors(errors);
        return errors;
    };


    return (
        <form>
            < PageContainer
                title={dozentId ? `${prename} ${lastname}` : `${t("new")} ${t("lecturer")}`
                }
                onClickPrimary={(e) => handleSubmit(e)}
                primaryButtonTitle={t("save")}
                showDeleteButton={dozentId ? true : false}
                onClickDelete={() => setShowModal(true)}
                onClickCancel={() => isShownAsModal ? closeModal() : navigate("/basicdata")}
            >
                <DeleteModal
                    value={showModal}
                    onClickCancel={() => {
                        setShowModal(false)
                    }}
                    onClickDelete={handleDelete}
                    headlineText={t("deleteQuestion")}
                    bodyText={t("deleteDozentInfo")}
                />
                <SectionContainer title={t("general")}>
                    <div className="flex lg:flex-row flex-col gap-5">
                        <SelectBox
                            name={"salutation"}
                            title={t("salutation")}
                            disallowEmptySelection={true}
                            items={salutationOptions}
                            className={"lg:max-w-[175px]"}
                            selectedKeys={salutation}
                            onChange={handleSelectionChange}
                        />
                        <SelectBox
                            name={"title"}
                            title={t("title")}
                            disallowEmptySelection={true}
                            items={titleOptions}
                            className={"lg:max-w-[175px]"}
                            selectedKeys={title}
                            onChange={handleSelectionChange}
                        />
                        <Input
                            name={"prename"}
                            isRequired
                            isInvalid={errors.prename}
                            errorMessage={errors.prename ? `${t("prename")} ${t("isRequired")}` : ""}
                            type="text"
                            label={t("prename")}
                            className={"lg:max-w-[350px]"}
                            value={prename}
                            onValueChange={
                                (value) => {
                                    setPrename(value)
                                    if (!value.trim()) {
                                        setErrors({ ...errors, prename: true })
                                    } else {
                                        setErrors({ ...errors, prename: false })
                                    }
                                }
                            }
                        />
                        <Input
                            name={"lastname"}
                            isRequired
                            isInvalid={errors.lastname}
                            errorMessage={errors.lastname ? `${t("lastname")} ${t("isRequired")}` : ""}
                            type="text"
                            label={t("lastname")}
                            className={"lg:max-w-[350px]"}
                            value={lastname}
                            onValueChange={
                                (value) => {
                                    setLastname(value)
                                    if (!value.trim()) {
                                        setErrors({ ...errors, lastname: true })
                                    } else {
                                        setErrors({ ...errors, lastname: false })
                                    }
                                }
                            }
                        />
                    </div>
                    <Input
                        name={"email"}
                        isRequired
                        isInvalid={errors.email}
                        errorMessage={errors.email ? `${t("email")} ${t("isInvalid")}` : ""}
                        type="email"
                        label={t("email")}
                        className={"lg:max-w-[500px]"}
                        value={email}
                        onValueChange={
                            (value) => {
                                setEmail(value)
                                if (!/\S+@\S+\.\S+/.test(value)) {
                                    setErrors({ ...errors, email: true })
                                } else {
                                    setErrors({ ...errors, email: false })
                                }
                            }
                        }
                    />
                </SectionContainer>
            </PageContainer >
        </form>
    )
}