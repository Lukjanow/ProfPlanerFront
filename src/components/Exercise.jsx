import React, { useEffect, useState } from 'react'
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
        duration: false,
        pause: false,
        type: false,
        group: false,
    });


    const teachersDropdownhelper = (items) => {
        onChange(items, "dozent", index)
    }

    const roomDropdownhelper = (items) => {
        onChange(items, "room", index)
    }

    const validateForm = () => {
        let errors = {};

        console.log(index)

        if (data.dozent == []) {
            errors.dozent = true;
        }

        if (!/[0-9]/.test(data.duration) || data.duration == "0") {
            errors.duration = true;
        }

        if (!/[0-9]/.test(data.pause)) {
            errors.pause = true;
        }

        if (!data.type.trim()) {
            errors.type = true;
        }

        if (!/[0-9]/.test(data.group)) {
            errors.group = true;
        }

        setErrors(errors);
        (Object.values(errors).indexOf(false) > 0) ? 
            data.error = false
        :   data.error = true
    };

  return (
    <div style={{borderBottom: "solid 2px black", padding: "0 1rem"}}>
        {/* <Switch value={data.addTime} onValueChange={() => onChange(!data.addTime, "addTime", index)}>Add Time to Group</Switch>
        <p className="text-small text-default-500">If selected, the Duration plus Pause given here will be added to the Module Group Duration. Otherwise no extra Time will be added.</p> */}
        {(index != 0) ?
        <div className="flex gap-5 justify-between items-center" style={{alignText: "center", width: "50%"}}>
            <div style={{right: "0", position: "relative"}}>
                <OutlinedButton text={`${t("delete")}`} onClick={() => onDelete(index)} color="danger"/>
            </div>
        </div>: null}
        <div className="flex gap-5" style={{marginTop: "25px"}}>
            <Input
                isRequired
                isInvalid={errors.type}
                errorMessage={errors.type ? `${t("type")} ${t("isRequired")}` : ""}
                type="text"
                label={t("type")}
                className={"lg:max-w-[500px]"}
                value={data.type}
                onValueChange={
                    (value) => {
                        onChange(value, "type", index)
                        if (!value.trim()) {
                            setErrors({ ...errors, type: true })
                        } else {
                            setErrors({ ...errors, type: false })
                        }
                        validateForm()
                    }
                }
            />
            <DropDown Items={teachers} description={`${t("lecturer")}`} selectionMode="multiple"
                        add={{href: "/basicdata/dozent-details",
                        Item: "Lehrende"}}
                        onChange={teachersDropdownhelper}
                        value={data.dozent}
                        width="500px"
                        required={true}
                        >
                    </DropDown>
            <DropDown Items={room} description={`${t("wRoom")}`} selectionMode="multiple"
                                add={{href: "/basicdata/room-details",
                                Item: "Raum"}}
                                onChange={roomDropdownhelper}
                                values={data.room}
                                >
            </DropDown>
        </div>
        <div className="flex gap-5" style={{marginTop: "25px", marginBottom:"25px"}}>
                <Input
                        isRequired
                        isInvalid={errors.duration}
                        errorMessage={errors.duration ? `${t("duration")} ${t("isRequired")}` : ""}
                        className={"lg:max-w-[250px]"}
                        label={`${t("duration")}`}
                        color="default"
                        type="number"
                        onValueChange={(value) => {onChange(value, "duration", index)
                                            if (!value.trim()) {
                                                setErrors({ ...errors, duration: true })
                                            } else {
                                                setErrors({ ...errors, duration: false })
                                            }
                                            validateForm()
                                                }}
                        value={data.duration}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }}}
                    />
                <Input
                        className={"lg:max-w-[250px]"}
                        label={`${t("pause")}`}
                        color="default"
                        type="number"
                        value={data.pause}
                        isRequired
                        isInvalid={errors.pause}
                        errorMessage={errors.pause ? `${t("duration")} ${t("isRequired")}` : ""}
                        onValueChange={(value) => {onChange(value, "pause", index)
                                            if (!value.trim()) {
                                                setErrors({ ...errors, pause: true })
                                            } else {
                                                setErrors({ ...errors, pause: false })
                                            }
                                            validateForm()
                                                }}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }}}
                        />
            <Input
                    className={"lg:max-w-[250px]"}
                    label={`${t("group")}`}
                    color="default"
                    type="number"
                    onChange={(e) => onChange(e.target.value, "group", index)}
                    value={data.group}
                    isRequired
                    isInvalid={errors.group}
                    errorMessage={errors.group ? `${t("group")} ${t("isRequired")}` : ""}
                    onValueChange={(value) => {onChange(value, "group", index)
                                            if (!value.trim()) {
                                                setErrors({ ...errors, group: true })
                                            } else {
                                                setErrors({ ...errors, group: false })
                                            }
                                            validateForm()
                                                }}
                    onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }}}
                    
                />
        </div>
    </div> 
  )
}
