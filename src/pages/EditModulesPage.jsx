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
import { ModuleDetailsModel } from "../models/moduleModel";
import { addDetailsModule, deleteModule, getDetailsModulesByModuleId, updateDetailsModule } from "../services/moduleService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal.jsx";

//Deal with Dozent, Room, duration, type
//TODO: Allow to send data

export default function EditModulesPage(
) {
    const { t } = useTranslation();
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const [ModuleID, setModuleID] = React.useState("")
    const [ModuleName, setModuleName] = React.useState("")
    const [ModuleCode, setModuleCode] = React.useState("")
    const [ModuleStudySemester, setModuleStudySemester] = useState([])
    const [ModuleFrequency, setModuleFrequency] = React.useState("")
    const [ModuleSelected, setModuleSelected] = React.useState(true)
    const [color, setColor] = React.useState("")
    const [ModuleNote, setModuleNote] = React.useState("")

    const [QSP, setQSP] = React.useState("")
    const [studyCourse, setStudyCourse] = React.useState([])

    const [extra, setExtra] = React.useState([{
        type: "",
        dozent: [],
        room: "",
        duration: "0",
        pause: "0",
        group: "1",
        addTime: false,
        error: false
    }])            //Elements regarding Exercise/Training

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
        frequency: false,
        extra: false,
    });
    
    function setRoomsHelper(data){
        let rooms = []
        data.forEach(room => {
            let dict = {}
            dict["key"] = room["_id"]
            dict["label"] = room["roomNumber"]
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
            getDetailsModulesByModuleId(moduleId)
                .then(response => {
                    console.log("Dozent fetched: ", response.data)
                    setModuleID(response.data.module_id)
                    setModuleName(response.data.name)
                    setModuleCode(response.data.code)
                    setModuleStudySemester([response.data.study_semester])
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


    const handleSubmit = (e) => {
        e.preventDefault()

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            if (moduleId) {
                const newModule = new ModuleDetailsModel(ModuleID, ModuleName, ModuleCode, extra, null, ModuleFrequency, ModuleSelected, color, ModuleNote, QSP, studyCourse)
                updateDetailsModule(moduleId, newModule)
                    .then(response => {
                        console.log("Module updated: ", response);
                    })
                    .catch(error => {
                        console.error("Error updating Module:", error);
                    })

                return
            }

            const newModule = new ModuleDetailsModel(ModuleID, ModuleName, ModuleCode, extra, null, ModuleFrequency, ModuleSelected, color, ModuleNote, QSP, studyCourse)
            addDetailsModule(newModule)
                .then(response => {
                    console.log("Module saved: ", response);
                })
                .catch(error => {
                    console.error("Error saving Module:", error);
                })
        } else {
            console.error("Error: ", errors);
        }
    }

    const handleDelete = () => {
        deleteModule(moduleId)
            .then(response => {
                console.log("Module deleted: ", response);
            })
            .catch(error => {
                console.error("Error deleting Module:", error);
            })
        navigate("/basicdata")
    }

    const validateForm = () => {
        let errors = {};

         if (!ModuleID.trim()) {
            errors.module_id = true;
        }

        if (!ModuleName.trim()) {
            errors.name = true;
        }

        if (!ModuleFrequency.keys[0]) {
            errors.frequency = true;
        } 

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
        return errors;
    };
    


    return (
        <>
        <PageContainer title={(moduleId) ? `${ModuleID} ${ModuleName}`:`${t("newModule")}`}
         primaryButtonTitle={`${t("save")}`} 
         showDeleteButton={moduleId ? true : false}
         onClickDelete={() => setShowModal(true)}
        onClickPrimary={(e) => handleSubmit(e)}>

            <DeleteModal
                value={showModal}
                onClickCancel={() => {
                    setShowModal(false)
                }}
                onClickDelete={handleDelete}
                headlineText={t("deleteQuestion")}
                bodyText={"This can't be reversed and can cause Issues in the Planer"}
            />
        <form>
            <SectionContainer title={`${t("general")}`}>
                <div className="flex lg:flex-row flex-col gap-5">
                    <DropDown Items={studyCourses} description={`${t("studycourse")}`} selectionMode="multiple"
                        onChange={setStudyCourse}
                        values={studyCourse}
                        width="500px">
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
{/*                 <RadioGroup    //TODO: Check to solution to allow selecting multiple
                    orientation="horizontal"
                    value={ModuleType}
                    onValueChange={setModuleType}
                    isRequired
                    >
                    <Radio value="Pflicht">{`${t("mandatory")}`}</Radio>
                    <Radio value="Wahlpflicht">{`${t("compulsoryElectivemodule")}`}</Radio>
                    <Radio value="QSP">{`${t("focusOfQualification")}`}</Radio>
                    <Radio value="Sonstiges">{`${t("other")}`}</Radio>
                </RadioGroup> */}
                <DropDown Items={QSPsa} description={`${t("focusOfQualification")}`} selectionMode="multiple"
                    onChange={setQSP}
                    values={QSP}
                    width="500px">
                </DropDown>
                <div className="flex lg:flex-row flex-col gap-5">
                        <Input
                            label={`${t("moduleName")}`}
                            isInvalid={errors.name}
                            errorMessage={errors.name ? `${t("moduleName")} ${t("isRequired")}` : ""}
                            color="default"
                            type="text"
                            onValueChange={
                                (value) => {
                                    setModuleName(value)
                                    if (!value.trim()) {
                                        setErrors({ ...errors, name: true })
                                    } else {
                                        setErrors({ ...errors, name: false })
                                    }
                                }
                            }
                            value={ModuleName}
                            isRequired
                            className={"lg:max-w-[500px]"}
                        />
                        <Input
                            label={`${t("moduleNr")}`}
                            className={"lg:max-w-[250px]"}
                            color="default"
                            type="text"
                            isInvalid={errors.module_Id}
                            errorMessage={errors.module_Id ? `${t("moduleNr")} ${t("isRequired")}` : ""}
                            onValueChange={(value) =>  {
                                setModuleID(value)
                                if (!value.trim()) {
                                    setErrors({ ...errors, module_Id: true })
                                } else {
                                    setErrors({ ...errors, module_Id: false })
                                }}}
                            value={ModuleID}
                            isRequired
                        />
                        <Input
                            label="Code"
                            color="default"
                            onChange={(e) => setModuleCode(e.target.value)}
                            value={ModuleCode}
                            className={"lg:max-w-[250px]"}
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
                                                backgroundcolor: color
                                                }} />
                </div>
            </SectionContainer>
            
            <SectionContainer title={"Veranstaltungen"}>
                {/* <div className="flex gap-5" style={{marginTop: "25px"}}>
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
                </div> */}
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
            </form>
        </PageContainer>
        </>
    );
}