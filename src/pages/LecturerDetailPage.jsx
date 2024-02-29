import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import { useTranslation } from "react-i18next";
import { SectionContainer } from "../components/SectionContainer";
import { RadioGroup, Radio, Input } from "@nextui-org/react";
import SelectBox from "../components/SelectBox";


export default function LecturerDetailPage() {
    const { t } = useTranslation();
    const [qualificationActive, setqualificationActive] = useState(false)

    const moduleTypes = [
        {
            value: "mandatory",
            title: "Pflichtmodul"
        },
        {
            value: "choice",
            title: "Wahlpflichtmodul"
        },
        {
            value: "qualification",
            title: "Qualifikationsschwerpunkt"
        },
        {
            value: "other",
            title: "Sonstiges"
        }
    ]

    const QSP = ["Networks & Security", "Software Engineering & Development", "Visual Computing"];
    const studyCourses = ["B. Sc. Angewandte Informatik", "B. Sc. Angewandte Informatik (dual)", "B. Sc. Wirtschaftsinformatik", "B. Sc. Wirtschaftsinformatik (dual)"]
    const semester = ["1", "2", "3", "4", "5", "6", "7"]
    const teachers = ["Herbert Thielen", "Elisabeth Heinemann"]
    const assistents = ["1", "2", "3", "4", "5", "6", "7"]


    return (
        <PageContainer title={`${t("new")} ${t("module")}`}>
            <SectionContainer title={t("general")}>
                <RadioGroup
                    orientation={"horizontal"}
                    defaultValue={moduleTypes.at(0).value}
                >
                    {
                        moduleTypes.map((item, index) => (
                            <Radio key={index} value={item.value}>{item.title}</Radio>
                        ))
                    }
                </RadioGroup>
                <SelectBox
                    title={"Qualifikationsschwerpunkt"}
                    items={QSP}
                    isMuliple={true}
                />
                <div className="flex flex-row gap-5">
                    <SelectBox
                        title={"Studiengang"}
                        items={studyCourses}
                        isMuliple={true}
                    />
                    <SelectBox
                        title={"Fachsemester"}
                        items={semester}
                        isMuliple={true}
                    />
                </div>
                <div className="flex flex-row gap-5">
                    <Input type="text" label="Bezeichnung" />
                    <Input type="text" label="Modul-Nr." />
                    <Input type="text" label="Code" />
                </div>
            </SectionContainer>



            <SectionContainer title={t("lecture")}>
                <div className="flex flex-row gap-5">
                    <SelectBox
                        title={"Lehrperson"}
                        items={teachers}
                        isMuliple={true}
                    />
                    <SelectBox
                        title={"Assistent"}
                        items={teachers}
                        isMuliple={true}
                    />
                    <Input type="number" label="Dauer" />
                </div>
            </SectionContainer>


            <SectionContainer showContentSwitch={true} title={t("exercise")}>
                <div className="flex flex-row gap-5">
                    <Input type="number" label="Gruppenanzahl" />
                    <Input type="number" label="Dauer" />
                </div>
                <SelectBox
                    title={"Assistent"}
                    items={teachers}
                    isMuliple={true}
                />
            </SectionContainer>


            <SectionContainer showContentSwitch={true} title={t("training")}>
                <div className="flex flex-row gap-5">
                    <Input type="number" label="Gruppenanzahl" />
                    <Input type="number" label="Dauer" />
                </div>
                <SelectBox
                    title={"Assistent"}
                    items={teachers}
                    isMuliple={true}
                />
            </SectionContainer>
        </PageContainer >
    )
}