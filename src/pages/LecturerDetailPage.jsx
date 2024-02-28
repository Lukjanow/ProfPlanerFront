import React from "react";
import PageContainer from "../components/PageContainer";
import { useTranslation } from "react-i18next";
import { SectionContainer } from "../components/SectionContainer";


export default function LecturerDetailPage() {
    const { t } = useTranslation()

    return (
        <PageContainer title={`${t("new")} ${t("lecturer")}`}>
            <SectionContainer title={t("general")}>

            </SectionContainer>
            <SectionContainer title={t("general")}>

            </SectionContainer>
            <SectionContainer showContentSwitch={true} title={t("general")}>

            </SectionContainer>
            <SectionContainer showContentSwitch={true} title={t("general")}>

            </SectionContainer>
        </PageContainer >
    )
}