import React, { useEffect } from 'react'
import { Input } from "@nextui-org/react";
import { OutlinedButton } from './OutlinedButton';
import { useTranslation } from "react-i18next";
import { DropDown } from './DropDown';

export default function Exercise({
    data, onChange, onDelete, index
}) {
    const { t } = useTranslation();

    const assistents = [{
        key: "1s",
        label: "Assi1"
        },
        {
            key: "2s",
            label: "Assi2"
        },
        {
            key: "3s",
            label: "Assi3"
        },
        {
            key: "4s",
            label: "Assi4"
        },
        {
            key: "5s",
            label: "Assi5"
        },
        {
            key: "6s",
            label: "Assi6"
        },
        {
            key: "7s",
            label: "Assi7"
        }
    ]

    const room = [
        {
            key: "B200",
            label: "B200"
        },
        {
            key: "D138",
            label: "D138"
        }
    ]

    const teachers = [
        {
            key: "Thielen",
            label: "Herbert Thielen"
        },
        {
            key: "Heinemann",
            label: "Elisabeth Heinemann"
        },
        {
            key: "Schwarzer",
            label: "Volker Schwarzer"
        },
        {
            key: "Kessler",
            label: "Dagmar Kessler"
        },
        {
            key: "Kohler",
            label: "Jens Kohler"
        },
        {
            key: "Werle-Rutter",
            label: "Micheal Werle-Rutter"
        },
        {
            key: "König",
            label: "Werner König"
        },
        {
            key: "Frank",
            label: "Thorsten Frank"
        },
        {
            key: "Gloger",
            label: "Oliver Gloger"
        },
        {
            key: "Kurpjuweit",
            label: "Stephan Kurpjuweit"
        },
        {
            key: "Wiebel",
            label: "Alexander Wiebel"
        }
    ]

    const assistentsDropdownhelper = (items) => {
        onChange(items, "assistents", index)
    }

    const teachersDropdownhelper = (items) => {
        onChange(items, "dozent", index)
    }

    const roomDropdownhelper = (items) => {
        onChange(items, "room", index)
    }

  return (
    <div style={{borderBottom: "solid 2px black", padding: "0 1rem"}}>
        <div className="flex gap-5 justify-between items-center" style={{alignText: "center", width: "50%"}}>
            {(data.type == 2) ? `${t("exercise")}` : `${t("training")}`}
            <div style={{right: "0", position: "relative"}}>
                <OutlinedButton text={`${t("delete")}`} onClick={() => onDelete(index)} color="danger"/>
            </div>
        </div>
        <div className="flex gap-5" style={{marginTop: "25px"}}>
            <DropDown Items={teachers} description={`${t("lecturer")}`} selectionMode="multiple"
                        add={{href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                        Item: "Lehrende"}}
                        onChange={teachersDropdownhelper}
                        value={data.dozent}
                        width="500px">
                    </DropDown>
            <DropDown Items={assistents} description={`${t("assistent")}`} selectionMode='multiple'
                                    add={{href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                                    Item: "Assistent"}}
                                    width="500px"
                                    onChange={assistentsDropdownhelper}
                                    values={data.assistents}/> 
            <DropDown Items={room} description={`${t("wRoom")}`} selectionMode="multiple"
                                add={{href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                                Item: "Raum"}}
                                onChange={roomDropdownhelper}
                                values={data.room}>
            </DropDown>
        </div>
        <div className="flex gap-5" style={{marginTop: "25px", marginBottom:"25px"}}>
            <div style={{width:"250px", backgroundColor: "#0000000F"}}>
                <Input
                        label={`${t("duration")}`}
                        variant="underlined"
                        color="default"
                        type="number"
                        onChange={(e) => onChange(e.target.value, "duration", index)}
                        value={data.duration}
                    />
            </div>
            <div style={{width:"250px", backgroundColor: "#0000000F"}}>
                <Input
                        label={`${t("group")}`}
                        variant="underlined"
                        color="default"
                        type="number"
                        onChange={(e) => onChange(e.target.value, "group", index)}
                        value={data.group}
                    />
            </div>
            <div style={{width:"250px", backgroundColor: "#0000000F"}}>
                <Input label={`${t("approximateAttendance")}`}
                    variant="underlined"
                    color="default"
                    type="number"
                    onChange={(e) => (
                        onChange(e.target.value, "approximate_attendance", index)
                    )}
                    value={data.approximate_attendance}/>
            </div>
        </div>
    </div> 
  )
}
