import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import { useTranslation } from "react-i18next";
import { SectionContainer } from "../components/SectionContainer";
import { Switch, Input } from "@nextui-org/react";
import SelectBox from "../components/SelectBox";
import TeacherModel from "../models/TeacherModel.js";


export default function LecturerDetailPage() {
    const { t } = useTranslation();
    const title = [" ", "Prof.", "Prof. Dr."]
    const salutation = [" ", "Frau", "Herr"]
    const [values, setValues] = useState(new TeacherModel);

    const onChange = (e) => {
        const newValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setValues({ ...values, [e.target.name]: newValue });
        console.log(e)
    }

    return (
        <PageContainer
            title={`${t("new")} ${t("lecturer")}`}
            onClickSave={() => console.log(values)}
        >
            <SectionContainer title={t("general")}>
                <div className="flex lg:flex-row flex-col gap-5">
                    <SelectBox
                        name={"salutation"}
                        title={t("salutation")}
                        items={salutation}
                        onChange={onChange}
                        className={"lg:max-w-[175px]"}
                    />
                    <SelectBox
                        name={"title"}
                        title={t("title")}
                        items={title}
                        onChange={onChange}
                        className={"lg:max-w-[175px]"}
                    />
                    <Input
                        name={"prename"}
                        isRequired
                        type="text"
                        label={t("prename")}
                        onChange={onChange}
                        className={"lg:max-w-[350px]"}
                    />
                    <Input
                        name={"lastname"}
                        isRequired
                        type="text"
                        label={t("lastname")}
                        onChange={onChange}
                        className={"lg:max-w-[350px]"}
                    />
                </div>
                <Input
                    name={"email"}
                    isRequired
                    type="email"
                    label={t("email")}
                    onChange={onChange}
                    className={"lg:max-w-[500px]"}
                />
            </SectionContainer>
        </PageContainer >
    )
}