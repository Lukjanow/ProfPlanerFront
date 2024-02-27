import React from 'react'
import { useTranslation } from 'react-i18next'

export default function PageContainer(props) {
    const { t } = useTranslation()

    return (
        <div className={"m-10 flex flex-col gap-10"}>
            <h2 className={"font-extrabold text-5xl"}>{props.title !== undefined ? props.title : t("defaultPageTitle")}</h2>
            <div className={`flex gap-5 ${props.row ? 'flex-row' : 'flex-col'}`}>
                {props.children}
            </div>
        </div>
    )
}