import React from 'react'
import { useTranslation } from 'react-i18next'
import { OutlinedButton } from './OutlinedButton'
import { FilledButton } from './FilledButton'
import { useNavigate } from 'react-router-dom'

export default function PageContainer({ title, showDeleteButton, onClickDelete, onClickSave, children, row }) {
    const { t } = useTranslation()
    const navigate = useNavigate();

    return (
        <div className={"m-10 flex flex-col gap-10"}>
            <div className={"flex flex-row gap-2 justify-between items-center"}>
                <h2 className={"font-extrabold text-5xl"}>{title !== undefined ? title : t("defaultPageTitle")}</h2>
                <div className={"flex flex-row gap-3"}>
                    {
                        showDeleteButton ?
                            <OutlinedButton
                                text={t("delete")}
                                color={"danger"}
                                onClick={onClickDelete}
                            /> :
                            <></>
                    }
                    <OutlinedButton
                        text={t("cancel")}
                        color={"primary"}
                        onClick={() => navigate("/basicdata")}
                    />
                    <FilledButton
                        text={t("save")}
                        showIcon={true}
                        icon={"plus"}
                        onClick={onClickSave}
                    />
                </div>
            </div>
            <div className={`flex gap-5 ${row ? 'flex-row' : 'flex-col'}`}>
                {children}
            </div>
        </div >
    )
}