import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import { useTranslation } from "react-i18next";
import { SectionContainer } from "../components/SectionContainer";
import { Input } from "@nextui-org/react";
import SelectBox from "../components/SelectBox";
import { addDozent } from "../services/dozentService.js";
import { DozentModel } from "../models/dozentModel.js";


export default function LecturerDetailPage() {
    const { t } = useTranslation();
    const title = ["keine Angabe", "Prof.", "Prof. Dr."]
    const salutation = ["keine Angabe", "Frau", "Herr"]


    const [formData, setFormData] = useState(new DozentModel);
    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
        const newValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setErrors({ ...errors, [e.target.name]: !e.target.validity?.valid })
        setFormData({ ...formData, [e.target.name]: newValue });
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length === 0) {
            // Form is valid, submit data or perform other actions
            console.log("Data: ", formData);
            addDozent(formData);
        } else {
            // Display validation errors
            setErrors(validationErrors);
            console.log("Error: ", errors);
        }
    }


    const validateForm = (formData) => {
        let errors = {};

        if (!formData.salutation.trim()) {
            errors.salutation = true;
        }

        if (!formData.title.trim()) {
            errors.title = true;
        }

        if (!formData.prename.trim()) {
            errors.prename = true;
        }

        if (!formData.lastname.trim()) {
            errors.lastname = true;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = true;
        }

        return errors;
    };


    return (
        <PageContainer
            title={`${t("new")} ${t("lecturer")}`}
            onClickPrimary={handleSubmit}
            primaryButtonTitle={t("save")}
        >
            <form>
                <SectionContainer title={t("general")}>
                    <div className="flex lg:flex-row flex-col gap-5">
                        <SelectBox
                            name={"salutation"}
                            title={t("salutation")}
                            disallowEmptySelection={true}
                            isInvalid={errors.salutation}
                            errorMessage={errors.salutation ? `${t("salutation")} ${t("isRequired")}` : ""}
                            items={salutation}
                            defaultSelectedKeys={[salutation[0]]}
                            onChange={handleChange}
                            className={"lg:max-w-[175px]"}
                        />
                        <SelectBox
                            name={"title"}
                            title={t("title")}
                            disallowEmptySelection={true}
                            isInvalid={errors.title}
                            errorMessage={errors.title ? `${t("title")} ${t("isRequired")}` : ""}
                            items={title}
                            defaultSelectedKeys={[title[0]]}
                            onChange={handleChange}
                            className={"lg:max-w-[175px]"}
                        />
                        <Input
                            name={"prename"}
                            isRequired
                            isInvalid={errors.prename}
                            errorMessage={errors.prename ? `${t("prename")} ${t("isRequired")}` : ""}
                            type="text"
                            label={t("prename")}
                            onChange={handleChange}
                            className={"lg:max-w-[350px]"}
                        />
                        <Input
                            name={"lastname"}
                            isRequired
                            isInvalid={errors.lastname}
                            errorMessage={errors.lastname ? `${t("lastname")} ${t("isRequired")}` : ""}
                            type="text"
                            label={t("lastname")}
                            onChange={handleChange}
                            className={"lg:max-w-[350px]"}
                        />
                    </div>
                    <Input
                        name={"email"}
                        isRequired
                        isInvalid={errors.email}
                        errorMessage={errors.email ? `${t("email")} ${t("isInvalid")}` : ""}
                        type="email"
                        label={t("email")}
                        onChange={handleChange}
                        className={"lg:max-w-[500px]"}
                    />
                </SectionContainer>
            </form>
        </PageContainer >
    )
}