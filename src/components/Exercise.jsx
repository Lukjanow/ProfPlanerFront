import React, { useEffect } from 'react'
import { Input, Switch } from "@nextui-org/react";
import { OutlinedButton } from './OutlinedButton';
import { useTranslation } from "react-i18next";
import { DropDown } from './DropDown';

export default function Exercise({
    data, onChange, onDelete, index, room, teachers
}) {
    const { t } = useTranslation();

    const [errors, setErrors] = useState({
        dozent: false,
        room: false,
        duration: false,
        pause: false,
        type: false,
    });


    const teachersDropdownhelper = (items) => {
        onChange(items, "dozent", index)
    }

    const roomDropdownhelper = (items) => {
        onChange(items, "room", index)
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
                        required={true}
                        >
                    </DropDown>
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
                    <Input
                            label={`${t("duration")}`}
                            color="default"
                            type="number"
                            onChange={(e) => onChange(e.target.value, "duration", index)}
                            value={data.duration}
                            isRequired
                        />
                    <Input
                            label={`${t("pause")}`}
                            color="default"
                            type="number"
                            onChange={(e) => onChange(e.target.value, "pause", index)}
                            value={data.pause}
                            isRequired
                        />
                </div>
             : null
        }
                <Input
                        label={`${t("group")}`}
                        color="default"
                        type="number"
                        onChange={(e) => onChange(e.target.value, "group", index)}
                        value={data.group}
                        isRequired
                    />
                <Input label={`${t("approximateAttendance")}`}
                    color="default"
                    type="number"
                    onChange={(e) => (
                        onChange(e.target.value, "approximate_attendance", index)
                    )}
                    value={data.approximate_attendance}
                    />
        </div>
    </div> 
  )
}
