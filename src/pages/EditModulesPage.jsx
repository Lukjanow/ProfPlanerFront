import {RadioGroup, Radio, Input, Checkbox, Textarea} from "@nextui-org/react";
import PageContainer from "../components/PageContainer";
import { useTranslation } from "react-i18next";
import { DropDown } from "../components/DropDown";
import { SectionContainer } from "../components/SectionContainer";
import React, { useEffect, useState } from "react";
import { ModuleItem } from "../components/ModuleItem";
import { OutlinedButton } from "../components/OutlinedButton";
import Exercise from "../components/Exercise";
import { getAllDozents } from "../services/dozentService";
import { getAllRooms } from "../services/roomService";
import { getAllStudySemesters } from "../services/studySemesterService"
import { ModuleModel } from "../models/moduleModel";
import { addModule } from "../services/moduleService";

//Deal with Dozent, Room, duration, type
//TODO: Allow to send data

export default function EditModulesPage({
    module = null, edit = false
}
) {
    const { t } = useTranslation();

    const [ModuleID, setModuleID] = React.useState(module?.id)
    const [ModuleName, setModuleName] = React.useState(module?.name)
    const [ModuleCode, setModuleCode] = React.useState(module?.code)
    const [ModuleDozent, setModuleDozent] = React.useState(module?.dozent)
    const [ModuleAssistent, setModuleAssistent] = React.useState(module?.assistents)
    const [ModuleRoom, setModuleRoom] = React.useState(module?.room)
    const [ModuleStudySemester, setModuleStudySemester] = React.useState(module?.studySemester)
    const [ModuleDuration, setModuleDuration] = React.useState(module?.duration)
    const [ModuleAttendance, setModuleAttendance] = React.useState(module?.approximate_attendance)
    const [ModuleNeed, setModuleNeed] = React.useState(module?.need)                                //TODO
    const [ModuleType, setModuleType] = React.useState(module?.type)
    const [ModuleFrequency, setModuleFrequency] = React.useState(module?.frequency)
    const [ModuleSelected, setModuleSelected] = React.useState((module?.selected) ? module.selected : true)
    const [color, setColor] = React.useState(module?.color)
    const [bordercolor, setBorderColor] = React.useState(module?.bordercolor)
    const [ModuleNote, setModuleNote] = React.useState(module?.note)
    const [ModuleGroups, setModuleGroups] = React.useState(module?.groups)                          //To be dropped/Reworked

    const [QSP, setQSP] = React.useState("")
    const [studyCourse, setStudyCourse] = React.useState([])

    const [extra, setExtra] = React.useState([])            //Elements regarding Exercise/Training

    const [room, setRooms] = useState([])     //rooms to display
    const [teachers, setTeachers] = useState([])     //teachers to display
    const [semester, setSemester] = useState([])     //Studysemester to display
    const [QSPsa, setQSPsa] = useState([])           //QSP to display
    
    function setRoomsHelper(data){
        let rooms = []
        data.forEach(room => {
            let dict = {}
            dict["key"] = room["_id"]
            dict["label"] = room["name"]
            rooms.push(dict)
        });
        setRooms(rooms)
    }

    function setTeachersHelper(data){
        let dozents = []
        data.forEach((dozent) => {
            let dict = {}
            dict["key"] = dozent["_id"]
            dict["label"] = dozent["prename"] + " " + dozent["lastname"]
            dozents.push(dict)
        });
        setTeachers(dozents)
    }

    function setStudySemesterQSPHelper(data){
        let StudySemester = []
        let QSP = []
        data.forEach((semester) => {
            let dict = {}
            dict["key"] = semester["_id"]
            dict["label"] = semester["name"]
            if (semester["content"] < 3){
                StudySemester.push(dict)
            } else if (semester["content"] == 3){
                QSP.push(dict)
            }
        });
        setSemester(StudySemester)
        setQSPsa(QSP)
    }

     useEffect(() => {
        async function fetchData() {
            try {
              const resultRooms = await getAllRooms();
              const resultTeacher = await getAllDozents();
              const resultStudySemester = await getAllStudySemesters();
              setRoomsHelper(resultRooms.data);
              setTeachersHelper(resultTeacher.data);
              setStudySemesterQSPHelper(resultStudySemester.data);
            } catch (error) {
              console.error("Error fetching modules:", error);
            }
          }
          fetchData();
        }, []) 

    const DeleteExercise = (index) => {
        const list = [...extra]
        list.splice(index, 1)
        setExtra(list)

    }
    
    const setExtraHelper = (value, attribute ,index) => {
        const list = [...extra]
        list[index][attribute] = value
        setExtra(list)
    }
    
    

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
    
    
    const WinSom = [
        {
            key: "1",
            label: "Wintersemester"
        },
        {
            key: "2",
            label: "Sommersemester"
        },
        {
            key: "3",
            label: "Winter- und Sommersemester"
        }
    ]
    

    const assistents = [{
        key: "1s",
        label: "Assistent1"
        },
        {
            key: "2s",
            label: "Assistent2"
        },
        {
            key: "3s",
            label: "Assistent3"
        },
        {
            key: "4s",
            label: "Assistent4"
        },
        {
            key: "5s",
            label: "Assistent5"
        },
        {
            key: "6s",
            label: "Assistent6"
        },
        {
            key: "7s",
            label: "Assistent7"
        }
    ]

    const equipment = [
        {
            key: "1",
            label: "Computer"
        },
        {
            key: "2",
            label: "Network"
        }
    ]

    function saveToDB(){
        let groups = new Set([])
        let Module = new ModuleModel(
            ModuleID,
            ModuleName,
            (ModuleCode) ? ModuleCode : null,
            new Set(Array.from(ModuleDozent.keys)),
            new Set(Array.from(ModuleRoom.keys)),
            Array.from(ModuleStudySemester.keys),
            ModuleDuration,
            ModuleAttendance,
            null,
            new Set([1])/* (ModuleType?.keys ? Array.from(ModuleType?.keys): []) */,
            parseInt(Array.from(ModuleFrequency.keys)[0]),
            ModuleSelected,
            color,
            (ModuleNote) ? ModuleNote: null,
            (ModuleGroups) ? ModuleGroups: 0
        )
        extra.forEach((training) =>(
            (training["group"] == "1") ? (
                Module.type.add(training["type"]),
                Module.dozent.add(...training["dozent"].keys),
                Module.room.add(...training["room"].keys),
                (training["addTime"]) ? 
                    Module.duration = String(parseInt(Module.duration) + parseInt(training.pause) + parseInt(training.duration))
                : {}
            ) : 
                groups.add(training["group"])
            
        ))
        Module.type = Array.from(Module.type)
        Module.dozent = Array.from(Module.dozent)
        Module.room = Array.from(Module.room)
    }

    return (
        <>
        <PageContainer title={(edit) ? `${t("editModule")}`:`${t("newModule")}`} primaryButtonTitle={`${t("save")}`} showDeleteButton={edit} onClickPrimary={saveToDB}>
            <SectionContainer title={`${t("general")}`}>
                <div className="flex gap-5" style={{marginBottom: "25px"}}>
                    <DropDown Items={studyCourses} description={`${t("studycourse")}`} selectionMode="multiple"
                        onChange={setStudyCourse}
                        values={studyCourse}
                        width="500px"
                        required={true}>
                    </DropDown>
                    <DropDown Items={semester} description={`${t("semester")}`} selectionMode="multiple"
                     onChange={setModuleStudySemester}
                     values={ModuleStudySemester}
                     required={true}>
                    </DropDown>
                    <DropDown Items={WinSom} description={`${t("offeredIn")}`}
                     onChange={setModuleFrequency} values={ModuleFrequency}
                     required={true}>
                    </DropDown>
                    <Checkbox
                        defaultSelected color="primary"
                        onChange={setModuleSelected}
                        value={ModuleSelected}
                        isRequired
                        >{`${t("isOffered")}`}
                    </Checkbox>
                </div>
                <RadioGroup
                    orientation="horizontal"
                    value={ModuleType}
                    onValueChange={setModuleType}
                    isRequired
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
                            isRequired
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
                            isRequired
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
                        width="500px"
                        required={true}>
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
                        values={ModuleRoom}
                        required={true}>
                    </DropDown>
                </div>
                <div className="flex gap-5" style={{marginTop: "25px"}}>
                    <div style={{width:"240px", backgroundColor: "#0000000F"}}>
                        <Input
                            label={`${t("duration")}`}
                            variant="underlined"
                            color="default"
                            type="number"
                            onChange={(e) => setModuleDuration(e.target.value)}
                            value={ModuleDuration}
                            isRequired
                        />
                    </div>
                    <div style={{width:"240px", backgroundColor: "#0000000F"}}>
                        <Input
                            label={`${t("approximateAttendance")}`}
                            variant="underlined"
                            color="default"
                            type="number"
                            onChange={(e) => setModuleAttendance(e.target.value)}
                            value={ModuleAttendance}
                            isRequired
                        />
                    </div>
                    <DropDown Items={equipment} description={`${t("equipment")}`} selectionMode="multiple"
                        onChange={setModuleNeed}
                        values={ModuleNeed}
                        width="250px"
                        >
                    </DropDown>
                </div>
            </SectionContainer>
            
            <SectionContainer title={t("exercise")}>
                {t("addExercises")}
                <div className="flex gap-5" style={{marginBottom: "10px"}}>
                    <OutlinedButton text={t("addExercise")} icon="plus" showIcon={true} color={"primary"}
                                onClick={() =>(
                                    setExtra(old => [...old, {
                                        type: 2,
                                        approximate_attendance:"",
                                        dozent: [],
                                        assistents: [],
                                        room: "",
                                        duration: "",
                                        pause: "",
                                        group: "",
                                        need: [],
                                        addTime: false
                                    }]))
                                }></OutlinedButton>
                    <OutlinedButton text={t("addTraining")} icon="plus" showIcon={true} color={"primary"}
                                onClick={() => (
                                    setExtra(old => [...old, {
                                        type: 3,
                                        approximate_attendance: "",
                                        assistents: [],
                                        dozent: [],
                                        room: "",
                                        duration: "",
                                        pause: "",
                                        group: "",
                                        need: [],
                                        addTime: false
                                    }]
                                ))
                                }/>
                </div>
                <div style={{borderBottom: "solid black 2px"}}></div>
                {extra.map((data, index) => (
                     <Exercise data={data} key={index} onDelete={() => DeleteExercise(index)} onChange={setExtraHelper} index={index}
                        assistents={assistents} teachers={teachers} room={room} equipment={equipment}/>
                ))}
                
            </SectionContainer>

           {/*  OBSELETE OBSELTE OBSELETE REPLACED BY SECTION ABOVE

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
            </SectionContainer> */}

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