import React, { useEffect } from 'react'
import { Input, Switch } from "@nextui-org/react";
import { OutlinedButton } from './OutlinedButton';
import { useTranslation } from "react-i18next";
import { DropDown } from './DropDown';

export default function Exercise({
    data, onChange, onDelete, index, assistents, room, teachers, equipment
}) {
    const { t } = useTranslation();


    const assistentsDropdownhelper = (items) => {
        onChange(items, "assistents", index)
    }

    const teachersDropdownhelper = (items) => {
        onChange(items, "dozent", index)
    }

    const roomDropdownhelper = (items) => {
        onChange(items, "room", index)
    }

    const needDropdownhelper = (items) => {
        onChange(items, "need", index)
    }


  return (
    <div style={{borderBottom: "solid 2px black", padding: "0 1rem"}}>
        <Switch value={data.addTime} onValueChange={() => onChange(!data.addTime, "addTime", index)}>Add Time to Group</Switch>
        <p className="text-small text-default-500">If selected, the Duration plus Pause given here will be added to the Module Group Duration. Otherwise no extra Time will be added.</p>
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
                        width="500px"
                        >
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
                                values={data.room}
                                >
            </DropDown>
        </div>
        <div className="flex gap-5" style={{marginTop: "25px", marginBottom:"25px"}}>
        {(data.addTime) ? 
                <div className="flex gap-5">
                    <div style={{width:"240px", backgroundColor: "#0000000F"}}>
                    <Input
                            label={`${t("duration")}`}
                            variant="underlined"
                            color="default"
                            type="number"
                            onChange={(e) => onChange(e.target.value, "duration", index)}
                            value={data.duration}
                            isRequired
                        />
                    </div>
                    <div style={{width:"240px", backgroundColor: "#0000000F"}}>
                    <Input
                            label={`${t("pause")}`}
                            variant="underlined"
                            color="default"
                            type="number"
                            onChange={(e) => onChange(e.target.value, "pause", index)}
                            value={data.pause}
                            isRequired
                        />
                    </div>
                </div>
            
             : null
        }
            <div style={{width:"240px", backgroundColor: "#0000000F"}}>
                <Input
                        label={`${t("group")}`}
                        variant="underlined"
                        color="default"
                        type="number"
                        onChange={(e) => onChange(e.target.value, "group", index)}
                        value={data.group}
                        isRequired
                    />
            </div>
            {(!data.addTime) ?
                <div style={{width:"240px", backgroundColor: "#0000000F"}}>
                    <Input label={`${t("approximateAttendance")}`}
                        variant="underlined"
                        color="default"
                        type="number"
                        onChange={(e) => (
                            onChange(e.target.value, "approximate_attendance", index)
                        )}
                        value={data.approximate_attendance}
                        isRequired/>
                </div> : null
            }
{/*             <DropDown Items={equipment} description={`${t("equipment")}`} selectionMode="multiple"
                        onChange={needDropdownhelper}
                        values={data.need}
                        width="250px">
            </DropDown> */}
        </div>
    </div> 
  )
}
