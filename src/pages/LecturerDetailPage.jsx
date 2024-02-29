import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import { useTranslation } from "react-i18next";
import { SectionContainer } from "../components/SectionContainer";
import { Switch, Input } from "@nextui-org/react";
import SelectBox from "../components/SelectBox";
import TeacherModel from "../models/TeacherModel.js";


export default function LecturerDetailPage() {
    const { t } = useTranslation();
    const title = ["-", "Prof.", "Prof. Dr."]
    const [values, setValues] = useState(new TeacherModel);

    const onChange = (e) => {
        const newValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setValues({ ...values, [e.target.name]: newValue });
    }

    return (
        <PageContainer
            title={`${t("new")} ${t("lecturer")}`}
            onClickSave={() => console.log(values)}
        >
            <SectionContainer title={t("general")}>
                <div className="flex flex-row gap-5">
                    <SelectBox
                        name={"title"}
                        title={t("title")}
                        items={title}
                        isRequired={true}
                        onChange={onChange}
                    />
                    <Input
                        name={"prename"}
                        isRequired
                        type="text"
                        label={t("prename")}
                        onChange={onChange}
                    />
                    <Input
                        name={"lastname"}
                        isRequired
                        type="text"
                        label={t("lastname")}
                        onChange={onChange}
                    />
                </div>
                <Input
                    name={"email"}
                    isRequired
                    type="email"
                    label={t("email")}
                    onChange={onChange}
                />
                <Switch
                    name={"intern"}
                    defaultSelected
                    onChange={onChange}
                >
                    {t("internal")} {t("lecturer")}
                </Switch>
            </SectionContainer>
        </PageContainer >
    )
}