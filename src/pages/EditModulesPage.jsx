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
import { addModule,getModuleById } from "../services/moduleService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//Deal with Dozent, Room, duration, type
//TODO: Allow to send data

export default function EditModulesPage({ edit = false
}
) {
    const { t } = useTranslation();
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const [ModuleID, setModuleID] = React.useState()
    const [ModuleName, setModuleName] = React.useState()
    const [ModuleCode, setModuleCode] = React.useState()
    const [ModuleFrequency, setModuleFrequency] = React.useState()
    const [ModuleSelected, setModuleSelected] = React.useState(true)
    const [color, setColor] = React.useState()
    const [ModuleNote, setModuleNote] = React.useState()

    const [QSP, setQSP] = React.useState("")
    const [studyCourse, setStudyCourse] = React.useState([])

    const [extra, setExtra] = React.useState([])            //Elements regarding Exercise/Training

    const [room, setRooms] = useState([])     //rooms to display
    const [teachers, setTeachers] = useState([])     //teachers to display
    const [semester, setSemester] = useState([])     //Studysemester to display
    const [QSPsa, setQSPsa] = useState([{
        key: "SED",
        label: "Software Engineering and Development"
    },
    {
        key: "VISCO",
        label: "Visual Computing"
    },
    {
        key: "Netsec",
        label: "Networks and Security"
    }])           //QSP to display


    const [errors, setErrors] = useState({
        module_id: false,
        name: false,
        code: false,
        frequency: false,
        selected: false,
        color: false,
        note: false,
    });
    
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

    function setStudySemesterHelper(data){
        let StudySemester = []
        data.forEach((semester) => {
            let dict = {}
            dict["key"] = semester["_id"]
            dict["label"] = semester["name"]
            if (semester["content"] < 3){
                StudySemester.push(dict)
            } 
        });
        setSemester(StudySemester)
    }

     useEffect(() => {
        async function fetchData() {
            try {
              const resultRooms = await getAllRooms();
              const resultTeacher = await getAllDozents();
              const resultStudySemester = await getAllStudySemesters();
              setRoomsHelper(resultRooms.data);
              setTeachersHelper(resultTeacher.data);
              setStudySemesterHelper(resultStudySemester.data);
            } catch (error) {
              console.error("Error fetching modules:", error);
            }
          }
          fetchData();
          if (moduleId) {
            getModuleById(moduleId)
                .then(response => {
                    console.log("Dozent fetched: ", response.data)
                    setModuleID(response.data.module_id)
                    setModuleName(response.data.name)
                    setModuleCode(response.data.code)
                    setModuleFrequency(response.data.frequency)
                    setModuleSelected(response.data.selected)
                    setModuleNote(response.data.note)
                    setExtra([response.data.events])
                    setQSP([response.data.qsp])
                })
                .catch(error => {
                    console.error("Error fetching Module:", error);
                });
        }
        }, [moduleId]) 

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
    

    const saveToDB = ()=>{
        //TODO: Complete Rework
        let error = ""
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
                (training["type"] != null) ? Module.type.add(training["type"]) : {},
                (training["dozent"].keys != null) ? Module.dozent.add(...training["dozent"].keys) : {},
                (training["room"].keys != null) ? Module.room.add(...training["room"].keys) : {},
                (training["addTime"] != null) ? 
                    Module.duration = String(parseInt(Module.duration) + parseInt(training.pause) + parseInt(training.duration))
                : {},
                console.log(Module)
            ) : 
                groups.add(training["group"])
            
        ))
        Module.type = Array.from(Module.type)
        Module.dozent = Array.from(Module.dozent)
        Module.room = Array.from(Module.room)
        addModule(Module)
        groups.forEach((group) => (
            error = "",
            Module.type = new Set([]),
            Module.dozent = new Set([]),
            Module.room = new Set([]),
            Module.type = new Set([]),
            Module.duration = "0",
            Module.approximate_attendance = "0",
            extra.forEach((training) =>(
                (training["group"] == group) ? (
                    (training["type"] != null) ? Module.type.add(training["type"]) : {},
                    (training["dozent"].keys != null) ? Module.dozent.add(...training["dozent"].keys) : {},
                    (training["room"].keys != null) ? Module.room.add(...training["room"].keys) : {},
                    (training["addTime"] != null) ? 
                        (Module.approximate_attendance = training["approximate_attendance"],
                        Module.duration = String(parseInt(Module.duration) + parseInt(training.pause) + parseInt(training.duration)))
                    : Module.approximate_attendance = String(parseInt(training["approximate_attendance"]) + parseInt(Module.approximate_attendance))
                ) : {},
            (Module.duration == "0") ?
                    error += "Duration is Zero." : {},
            (Module.approximate_attendance == "0") ?
                    error += "Approximate Attendace is Zero." : {},
            console.log(Module),
            (error !== "") ?
                    (console.log("Group", group, "will not be added to database for this reason:", error))
                    :
                    addModule(Module)      
            ))
        ))
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
                        <Input
                            label={`${t("moduleName")}`}
                            
                            color="default"
                            type="text"
                            onChange={(e) => setModuleName(e.target.value)}
                            value={ModuleName}
                            isRequired
                        />
                        <Input
                            label={`${t("moduleNr")}`}
                            
                            color="default"
                            type="text"
                            onChange={(e) => setModuleID(e.target.value)}
                            value={ModuleID}
                            isRequired
                        />
                        <Input
                            label="Code"
                            
                            color="default"
                            onChange={(e) => setModuleCode(e.target.value)}
                            value={ModuleCode}
                        />
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
                                                backgroundcolor: color
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
                    <DropDown Items={room} description={`${t("wRoom")}`} selectionMode="multiple"
                        add={{href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                        Item: "Raum"}}
                        onChange={setModuleRoom}
                        values={ModuleRoom}
                        required={true}>
                    </DropDown>
                </div>
                <div className="flex gap-5" style={{marginTop: "25px"}}>
                        <Input
                            label={`${t("duration")}`}
                            
                            color="default"
                            type="number"
                            onChange={(e) => setModuleDuration(e.target.value)}
                            value={ModuleDuration}
                            isRequired
                        />
                        <Input
                            label={`${t("approximateAttendance")}`}
                            
                            color="default"
                            type="number"
                            onChange={(e) => setModuleAttendance(e.target.value)}
                            value={ModuleAttendance}
                            isRequired
                        />
                </div>
            </SectionContainer>
            
            <SectionContainer title={""}>
                {t("addExercises")}
                <div className="flex gap-5" style={{marginBottom: "10px"}}>
                    <OutlinedButton text="Füge " icon="plus" showIcon={true} color={"primary"}
                                onClick={() =>(
                                    setExtra(old => [...old, {
                                        type: "",
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

                </div>
                <div style={{borderBottom: "solid black 2px"}}></div>
                {extra.map((data, index) => (
                     <Exercise data={data} key={index} onDelete={() => DeleteExercise(index)} onChange={setExtraHelper} index={index}
                         teachers={teachers} room={room} />
                ))}
                
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