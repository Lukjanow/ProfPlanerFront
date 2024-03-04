import {RadioGroup, Radio, Input, Checkbox, Textarea} from "@nextui-org/react";
import PageContainer from "../components/PageContainer";
import { useTranslation } from "react-i18next";
import { DropDown } from "../components/DropDown";
import { SectionContainer } from "../components/SectionContainer";
import { HexColorPicker } from "react-colorful";
import React, { useEffect } from "react";
import { ModuleItem } from "../components/ModuleItem";

//Deal with Dozent, Room, duration, type

export default function EditModulesPage({
    module = null, edit = false
}
) {
    const { t } = useTranslation();

    const [ModuleID, setModuleID] = React.useState(module?.id)
    const [ModuleName, setModuleName] = React.useState((module?.name) ? module.name : "Dies ist ein Testname")
    const [ModuleCode, setModuleCode] = React.useState(module?.code)
    const [ModuleDozent, setModuleDozent] = React.useState(module?.dozent)
    const [ModuleAssistent, setModuleAssistent] = React.useState(module?.assistents)
    const [ModuleRoom, setModuleRoom] = React.useState(module?.room)
    const [ModuleStudySemester, setModuleStudySemester] = React.useState(module?.studySemester)
    const [ModuleDuration, setModuleDuration] = React.useState(module?.duration)
    const [ModuleAttendance, setModuleAttendance] = React.useState(module?.approximate_attendance)
    const [ModuleNeed, setModuleNeed] = React.useState(module?.need)
    const [ModuleType, setModuleType] = React.useState(module?.type)
    const [ModuleFrequency, setModuleFrequency] = React.useState(module?.frequency)
    const [ModuleSelected, setModuleSelected] = React.useState(module?.selected)
    const [color, setColor] = React.useState(module?.color)
    const [bordercolor, setBorderColor] = React.useState(module?.bordercolor)
    const [ModuleNote, setModuleNote] = React.useState(module?.note)
    const [ModuleGroups, setModuleGroups] = React.useState(module?.groups)

    const [QSP, setQSP] = React.useState("")
    const [studyCourse, setStudyCourse] = React.useState([])
    
    
    const QSPsa = [{
            key: "NetSec",
            label: "Networks & Security"
            },
            {
                key: "SE&D",
                label: "Software Engineering & Development"
            },
            {
                key: "VisCo",
                label: "Visual Computing"
            }
    ]

    const studyCourses = [{
        key: "bScAI",
        label: "B. Sc. Angewandte Informatik"
        },
        {
            key: "bScAId",
            label: "B. Sc. Angewandte Informatik (dual)"
        },
        {
            key: "bScWI",
            label: "B. Sc. Wirtschaftsinformatik"
        },
        {
            key: "bScWId",
            label: "B. Sc. Wirtschaftsinformatik (dual)"
        }
    ]
    
    const semester = [{
        key: "1s",
        label: "1"
        },
        {
            key: "2s",
            label: "2"
        },
        {
            key: "3s",
            label: "3"
        },
        {
            key: "4s",
            label: "4"
        },
        {
            key: "5s",
            label: "5"
        },
        {
            key: "6s",
            label: "6"
        },
        {
            key: "7s",
            label: "7"
        }
    ]
    
    const WinSom = [
        {
            key: "Win",
            label: "Winter"
        },
        {
            key: "Som",
            label: "Sommer"
        },
        {
            key: "Com",
            label: "Winter und Sommer"
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

    return (
        <>
        <PageContainer title={(edit) ? `${t("editModule")}`:`${t("newModule")}`} primaryButtonTitle={`${t("save")}`}>
            <SectionContainer title={`${t("general")}`}>
                <div className="flex gap-5" style={{marginBottom: "25px"}}>
                    <DropDown Items={studyCourses} description={`${t("studycourse")}`} selectionMode="multiple"
                        onChange={setStudyCourse}
                        values={studyCourse}
                        width="500px">
                    </DropDown>
                    <DropDown Items={semester} description={`${t("semester")}`} selectionMode="multiple"
                     onChange={setModuleStudySemester}
                     values={ModuleStudySemester}>
                    </DropDown>
                    <DropDown Items={WinSom} description={`${t("offeredIn")}`}
                     onChange={setModuleFrequency} values={ModuleFrequency}>
                    </DropDown>
                    <Checkbox
                        defaultSelected color="primary"
                        onChange={setModuleSelected}
                        value={ModuleSelected}
                        >{`${t("isOffered")}`}
                    </Checkbox>
                </div>
                <RadioGroup
                    orientation="horizontal"
                    value={ModuleType}
                    onValueChange={setModuleType}
                    >
                    <Radio value="Pflicht">{`${t("mandatory")}`}</Radio>
                    <Radio value="Wahlpflicht">{`${t("compulsoryElectivemodule")}`}</Radio>
                    <Radio value="QSP">{`${t("focusOfQualification")}`}</Radio>
                    <Radio value="Sonstiges">{`${t("other")}`}</Radio>
                </RadioGroup>
                {(ModuleType == "QSP") ? 
                <DropDown Items={QSPsa} description={`${t("focusOfQualification")}`} selectionMode="multiple"
                    onChange={setQSP}
                    values={QSP}
                    width="500px">
                </DropDown>: 
                null}
                <div className="flex gap-5" style={{marginTop: "25px",marginBottom: "25px"}}>
                    <div style={{width:"500px", backgroundColor: "#0000000F"}}>
                        <Input
                            label={`${t("moduleName")}`}
                            variant="underlined"
                            color="default"
                            type="text"
                            onChange={(e) => setModuleName(e.target.value)}
                            value={ModuleName}
                        />
                    </div>
                    <div style={{width:"250px", backgroundColor: "#0000000F"}}>
                        <Input
                            label={`${t("moduleNr")}`}
                            variant="underlined"
                            color="default"
                            type="text"
                            onChange={(e) => setModuleID(e.target.value)}
                            value={ModuleID}
                        />
                    </div>
                    <div style={{width:"250px", backgroundColor: "#0000000F"}}>
                        <Input
                            label="Code"
                            variant="underlined"
                            color="default"
                            onChange={(e) => setModuleCode(e.target.value)}
                            value={ModuleCode}
                        />
                    </div>
                </div>
                <div className="flex gap-5">
                    <p>{t("colorSelector")}</p>
                </div>
                <div className="flex gap-5">
                    <div className="flex gap-5 flex-col" id="colorGrid">
                        <div className="flex gap-5">
                            <div style={{backgroundColor: "#FF0000", width: "50px", height: "50px", margin: "5px", cursor: "pointer", fontSize: "0", border: "solid black 1px"}} onClick={() => setColor("#FF0000")}></div>
                            <div style={{backgroundColor: "#00FF00", width: "50px", height: "50px", margin: "5px", cursor: "pointer", fontSize: "0", border: "solid black 1px"}} onClick={() => setColor("#00FF00")}></div>
                            <div style={{backgroundColor: "#0000FF", width: "50px", height: "50px", margin: "5px", cursor: "pointer", fontSize: "0", border: "solid black 1px"}} onClick={() => setColor("#0000FF")}></div>
                            <div style={{backgroundColor: "#FFFF00", width: "50px", height: "50px", margin: "5px", cursor: "pointer", fontSize: "0", border: "solid black 1px"}} onClick={() => setColor("#FFFF00")}></div>
                            <div style={{backgroundColor: "#FF00FF", width: "50px", height: "50px", margin: "5px", cursor: "pointer", fontSize: "0", border: "solid black 1px"}} onClick={() => setColor("#FF00FF")}></div>
                        </div>
                        <div className="flex gap-5">
                            <div style={{backgroundColor: "#00FFFF", width: "50px", height: "50px", margin: "5px", cursor: "pointer", fontSize: "0", border: "solid black 1px"}} onClick={() => setColor("#00FFFF")}></div>
                            <div style={{backgroundColor: "#FFA500", width: "50px", height: "50px", margin: "5px", cursor: "pointer", fontSize: "0", border: "solid black 1px"}} onClick={() => setColor("#FFA500")}></div>
                            <div style={{backgroundColor: "#327207", width: "50px", height: "50px", margin: "5px", cursor: "pointer", fontSize: "0", border: "solid black 1px"}} onClick={() => setColor("#327207")}></div>
                            <div style={{backgroundColor: "#000000", width: "50px", height: "50px", margin: "5px", cursor: "pointer", fontSize: "0", border: "solid black 1px"}} onClick={() => setColor("#000000")}></div>
                            <div style={{backgroundColor: "#FFFFFF", width: "50px", height: "50px", margin: "5px", cursor: "pointer", fontSize: "0", border: "solid black 1px"}} onClick={() => setColor("#FFFFFF")}></div>
                        </div>
                    </div>
                    <ModuleItem moduleItemData={{
                                                title: ModuleName,
                                                studySemester: ModuleStudySemester?.label,
                                                dozent: ModuleDozent?.label,
                                                room: ModuleRoom?.label,
                                                backgroundcolor: color,
                                                bordercolor: bordercolor,
                                                }} />
                </div>
            </SectionContainer>

            <SectionContainer title={t("lecture")}>
                <div className="flex gap-5" style={{marginTop: "25px"}}>
                    <DropDown Items={teachers} description={`${t("lecturer")}`} selectionMode="multiple"
                        add={{href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                        Item: "Lehrende"}}
                        onChange={setModuleDozent}
                        value={ModuleDozent}
                        width="500px">
                    </DropDown>
                    <DropDown Items={assistents} description={`${t("assistent")}`} selectionMode="multiple"
                        add={{href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                        Item: "Assistent"}}
                        onChange={setModuleAssistent}
                        values={ModuleAssistent}>
                    </DropDown>
                    <DropDown Items={room} description={`${t("wRoom")}`} selectionMode="multiple"
                        add={{href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                        Item: "Raum"}}
                        onChange={setModuleRoom}
                        values={ModuleRoom}>
                    </DropDown>
                </div>
                <div className="flex gap-5" style={{marginTop: "25px"}}>
                    <div style={{width:"237.5px", backgroundColor: "#0000000F"}}>
                        <Input
                            label={`${t("duration")}`}
                            variant="underlined"
                            color="default"
                            type="number"
                            onChange={(e) => setModuleDuration(e.target.value)}
                            value={ModuleDuration}
                        />
                    </div>
                    <div style={{width:"237.5px", backgroundColor: "#0000000F"}}>
                        <Input
                            label={`${t("approximateAttendance")}`}
                            variant="underlined"
                            color="default"
                            type="number"
                            onChange={(e) => setModuleAttendance(e.target.value)}
                            value={ModuleAttendance}
                        />
                    </div>
                </div>
            </SectionContainer>

            <SectionContainer showContentSwitch={true} title={t("exercise")}>
                <div className="flex flex-row gap-5">
                    <div style={{width:"250px", backgroundColor: "#0000000F"}}>
                        <Input type="number" label={`${t("groupNumber")}`} variant="underlined" onChange={(e) => setModuleGroups(e.target.value)} value={ModuleGroups}/>
                    </div>
                    <div style={{width:"250px", backgroundColor: "#0000000F"}}>
                        <Input type="number" label={`${t("duration")}`} variant="underlined" onChange={(e) => setModuleDuration(e.target.value)} value={ModuleDuration}/>
                    </div>
                </div>
                <div className="flex gap-5">
                    <DropDown Items={assistents} description="Assitent"
                            add={{href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                            Item: "Assistent"}}
                            width="500px"
                            onChange={setModuleAssistent}
                            values={ModuleAssistent}>
                    </DropDown>
                    <DropDown Items={room} description={`${t("wRoom")}`} selectionMode="multiple"
                            add={{href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                            Item: "Raum"}}
                            onChange={setModuleRoom}
                            values={ModuleRoom}>
                    </DropDown>
                </div>
                <Checkbox
                        defaultSelected color="primary"
                        >{t("exercise")} und {t("lecture")} als ein Block darstellen
                </Checkbox>
            </SectionContainer>


            <SectionContainer showContentSwitch={true} title={t("training")}>
                <div className="flex flex-row gap-5">
                    <div style={{width:"250px", backgroundColor: "#0000000F"}}>
                        <Input type="number" label={`${t("groupNumber")}`} variant="underlined" onChange={setModuleGroups} value={ModuleGroups}/>
                    </div>
                    <div style={{width:"250px", backgroundColor: "#0000000F"}}>
                        <Input type="number" label={`${t("duration")}`} variant="underlined" onChange={setModuleDuration} value={ModuleDuration}/>
                    </div>
                </div>
                <div className="flex gap-5">
                    <DropDown Items={assistents} description="Assistent"
                            add={{href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                            Item: "Assistent"}}
                            width="500px"
                            onChange={setModuleAssistent}
                            values={ModuleAssistent}>
                    </DropDown>
                    <DropDown Items={room} description={`${t("wRoom")}`} selectionMode="multiple"
                            add={{href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                            Item: "Raum"}}
                            onChange={setModuleRoom}
                            values={ModuleRoom}>
                    </DropDown>
                </div>
                <Checkbox
                        defaultSelected color="primary"
                        >{t("training")} und {t("lecture")} als ein Block darstellen
                </Checkbox>
            </SectionContainer>
            
            <SectionContainer title={`${t("note")}`}>
                <Textarea
                    minRows={3}
                    label={`${t("note")}`}
                    placeholder={`${t("writeNotes")}`}
                    onChange={(e) => setModuleNote(e.target.value)}
                    value={ModuleNote}
                />
            </SectionContainer>
        </PageContainer>
        </>
    );
}