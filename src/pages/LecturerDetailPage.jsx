import { useState } from "react";
import PageContainer from "../components/PageContainer";
import { useTranslation } from "react-i18next";
import { SectionContainer } from "../components/SectionContainer";
import { Input } from "@nextui-org/react";
import SelectBox from "../components/SelectBox";
import {DozentModel} from "../models/dozentModel.js";


export default function LecturerDetailPage() {
    const { t } = useTranslation();
    const title = ["-", "Prof.", "Prof. Dr."]
    const [values, setValues] = useState(new DozentModel());

    const onChange = (e) => {
        const newValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setValues({ ...values, [e.target.name]: newValue });
    }

    return (
        <PageContainer
            title={`${t("new")} ${t("lecturer")}`}
            onClickPrimary={() => console.log(values)}
            primaryButtonTitle={t("save")}
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
            </SectionContainer>
        </PageContainer >
    )
}