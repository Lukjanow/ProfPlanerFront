import { Input, Checkbox, modal, CheckboxGroup } from "@nextui-org/react";
import PageContainer from "../components/PageContainer";
import { useTranslation } from "react-i18next";
import { DropDown } from "../components/DropDown";
import { SectionContainer } from "../components/SectionContainer";
import React, { useEffect, useState } from "react";
import { ModuleItem } from "../components/ModuleItem";
import { getAllDozents } from "../services/dozentService";
import { getAllRooms } from "../services/roomService";
import { ModuleModel } from "../models/moduleModel";
import { deleteModule, getModuleByIdwithoutData, addModule, updateModule } from "../services/moduleService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal.jsx";
import { getAllStudyCourses } from "../services/studyCourseService.js";

//Deal with Dozent, Room, duration, type

export default function EditModulesPage(
) {
    const { t } = useTranslation();
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const [ModuleID, setModuleID] = React.useState("")
    const [ModuleName, setModuleName] = React.useState("")
    const [ModuleCode, setModuleCode] = React.useState("")
    const [ModuleDozent, setModuleDozent] = React.useState([])
    const [ModuleRoom, setModuleRoom] = React.useState([])
    const [ModuleStudySemester, setModuleStudySemester] = useState([])
    const [ModuleDuration, setModuleDuration] = React.useState("0")
    const [ModuleAttendance, setModuleAttendance] = React.useState("0")
    const [ModuleType, setModuleType] = React.useState([])
    const [ModuleFrequency, setModuleFrequency] = React.useState(["3"])
    const [ModuleSelected, setModuleSelected] = React.useState(true)
    const [moduleStudyCourse, setModuleStudyCourse] = React.useState(new Set([]))
    const [moduleQSP, setModuleQSP] = React.useState([])
    const [color, setColor] = React.useState("")

    const [studyCourse, setStudyCourse] = React.useState([])  //all info
    const [studyCourseDrop, setStudyCourseDrop] = React.useState([])  //Study course to display
    const [room, setRooms] = useState([])     //rooms to display
    const [teachers, setTeachers] = useState([])     //teachers to display
    const [semester, setSemester] = useState([])     //all Studysemester
    const [QSP, setQSP] = React.useState([])        //QSP to display
    const [prevCourse, setPrevCourse] = React.useState([]) //prevent loop

    const [errors, setErrors] = useState({
        module_id: false,
        name: false,
        frequency: false,
        study_course: false,
        study_semester: false,
        study_qsp: false,
        dozent: false,
        duration: false,
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

    function setStudyCourseHelper(courses){
        let studyCourses = []
        courses.forEach((studyCourse) => {
            let dict = {}
            dict["key"] = studyCourse["_id"]
            dict["label"] = studyCourse["name"]
            studyCourses.push(dict)
        });
        let qsps = []
        let semesters = []
        let course = courses.filter(obj => {
            return obj._id === studyCourses[0].key
        })
        course = course[0]
        try {
            course["content"].forEach((qsp) => {
                let dict = {}
                dict["label"] = qsp
                dict["key"] = qsp
                qsps.push(dict)
            })
            for (let i = 1; i <= course["semesterCount"]; i++) {
                let dict = {}
                dict["label"] = "Semester " + i
                dict["key"] = String(i)
                semesters.push(dict)
            } 
        } catch (error) {
            console.log(error, " occured while setting qsp and semesters")
        }        
        setStudyCourse(courses)
        setStudyCourseDrop(studyCourses)
        setQSP(qsps)
        setSemester(semesters)
        setModuleStudyCourse([studyCourses[0].key])
    }

    useEffect(() => {
         if (moduleStudyCourse.size > 0 && prevCourse != moduleStudyCourse){
            setPrevCourse(moduleStudyCourse)
            let qsps = []
            let semesters = []
            let course = studyCourse.filter(obj => {
                return obj._id === moduleStudyCourse.values().next().value
            })
            course = course[0]
            try {
                course["content"].forEach((qsp) => {
                    let dict = {}
                    dict["label"] = qsp
                    dict["key"] = qsp
                    qsps.push(dict)
                })
                for (let i = 1; i <= course["semesterCount"]; i++) {
                    let dict = {}
                    dict["label"] = "Semester " + i
                    dict["key"] = String(i)
                    semesters.push(dict)
                }   
            } catch (error) {
                console.log(error, " occured while setting qsp and semesters")
            }
            setQSP(qsps)
            setSemester(semesters)
            setModuleStudySemester([])
            setModuleQSP([])
        }
      }, [setQSP, moduleStudyCourse, studyCourse, setSemester, semester, prevCourse])
    

     useEffect(() => {
        async function fetchData() {
            try {
              const resultRooms = await getAllRooms();
              const resultTeacher = await getAllDozents();
              const resultStudyCourse = await getAllStudyCourses();
              setRoomsHelper(resultRooms.data);
              setTeachersHelper(resultTeacher.data);
              setStudyCourseHelper(resultStudyCourse.data);
            } catch (error) {
              console.error("Error fetching modules:", error);
            }
          }
          fetchData().then(() => {
          if (moduleId) {
            getModuleByIdwithoutData(moduleId)
                .then(response => {
                    setModuleID(response.data.module_id)
                    setModuleName(response.data.name)
                    setModuleCode(response.data.code)
                    setModuleDozent(response.data.dozent)
                    setModuleRoom(response.data.room)
                    setModuleStudyCourse([response.data.study_semester[0].studyCourse])
                    setModuleStudySemester(response.data.study_semester[0].semesterNumbers)
                    setModuleQSP(response.data.study_semester[0].content)
                    if(response.data.study_semester[0].content.length > 0){
                        setModuleType(["Qualifikationsschwerpunkt"])
                    }
                    setModuleDuration(String(response.data.duration))
                    setModuleAttendance(String(response.data.approximate_attendance))
                    setModuleFrequency([String(response.data.frequency)])
                    setModuleSelected(response.data.selected)
                    setColor(response.data.color)
                })
                .catch(error => {
                    console.error("Error fetching Module:", error);
                });
            }
        })
        }, [moduleId]) 
    
    
    
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
                let studySemester = {
                    "studyCourse": moduleStudyCourse[0],
                    "semesterNumbers": Array.from(ModuleStudySemester),
                    "content": Array.from(moduleQSP)
                }
                console.log(studySemester, moduleQSP)
                const newModule = new ModuleModel(ModuleID, ModuleName, ModuleCode, Array.from(ModuleDozent), Array.from(ModuleRoom), studySemester, parseInt(ModuleDuration), parseInt(ModuleAttendance), parseInt((ModuleFrequency instanceof Set) ? ModuleFrequency.values().next().value : ModuleFrequency[0]), ModuleSelected, color)
                console.log("new Module:", newModule)
                updateModule(moduleId, newModule)
                    .then(response => {
                        console.log("Module updated: ", response);
                    })
                    .catch(error => {
                        console.error("Error updating Module:", error);
                    })

                return
            }
            let studySemester = {
                "studyCourse": moduleStudyCourse,
                "semesterNumbers": Array.from(ModuleStudySemester),
                "content": Array.from(moduleQSP)
            }
            const newModule = new ModuleModel(ModuleID, ModuleName, ModuleCode, Array.from(ModuleDozent), Array.from(ModuleRoom), studySemester, parseInt(ModuleDuration), parseInt(ModuleAttendance), parseInt(ModuleFrequency.values().next().value), ModuleSelected, color)
            addModule(newModule)
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

        if (ModuleFrequency.length == 0 || ModuleFrequency.size == 0) {
            errors.frequency = true;
        } 

        if (moduleStudyCourse.length == 0 || moduleStudyCourse.size == 0){
            errors.study_course = true;
        }

        if (ModuleStudySemester.length == 0|| ModuleStudySemester.size == 0){
            errors.study_semester = true;
        }

        if (ModuleType.includes("Qualifikationsschwerpunkt") && (moduleQSP.length == 0 || moduleQSP.size == 0)){
            errors.study_qsp = true;
        }

        if (ModuleDozent.length == 0 || ModuleDozent.size == 0) {
            errors.dozent = true;
        } 

        if (!/[0-9]/.test(ModuleDuration) || ModuleDuration == "0") {
            errors.duration = true;
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
                    <DropDown Items={studyCourseDrop} description={`${t("studycourse")}`}
                        onChange={setModuleStudyCourse}
                        values={moduleStudyCourse}
                        error={errors.study_course}
                        width="500px"
                        required={true}>
                    </DropDown>
                    <DropDown Items={semester} description={`${t("semester")}`} selectionMode="multiple"
                     onChange={setModuleStudySemester}
                     values={ModuleStudySemester}
                     error={errors.study_semester}
                     required={true}>
                    </DropDown>
                    <DropDown Items={WinSom} description={`${t("offeredIn")}`}
                     onChange={setModuleFrequency} values={ModuleFrequency}
                     error={errors.frequency}
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
                <CheckboxGroup
                    label="Modulart auswählen"
                    color="primary"
                    value={ModuleType}
                    onValueChange={setModuleType}>
                    <div className="flex lg:flex-row flex-col gap-5">
                        <Checkbox value="Pflicht">Pflicht</Checkbox>
                        <Checkbox value="Qualifikationsschwerpunkt">Qualifikationsschwerpunkt/Wahlpflichtmodul</Checkbox>
                        <Checkbox value="Andere">Anderes</Checkbox>
                    </div>
                </CheckboxGroup>
                {(ModuleType?.includes("Qualifikationsschwerpunkt")) ? 
                 <DropDown
                Items={QSP} description={`${t("focusOfQualification")}`}
                onChange={setModuleQSP} values={moduleQSP} selectionMode="multiple"
                error={errors.study_qsp}
                required={true}
                /> 
                : null
                }
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
                            isInvalid={errors.module_id}
                            errorMessage={errors.module_id ? `${t("moduleNr")} ${t("isRequired")}` : ""}
                            onValueChange={(value) =>  {
                                setModuleID(value)
                                if (!value.trim()) {
                                    setErrors({ ...errors, module_id: true })
                                } else {
                                    setErrors({ ...errors, module_id: false })
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
                                                name: ModuleName,
                                                study_semester_string: ModuleStudySemester?.label,
                                                backgroundcolor: color,
                                                visible: true
                                                }} />
                </div>
            </SectionContainer>
            
            <SectionContainer title={"Veranstaltung"}>
                 <div className="flex gap-5" style={{marginTop: "25px"}}>
                    <DropDown Items={teachers}
                                description={`${t("lecturer")}`} selectionMode="multiple"
                                add={{href: "/basicdata/dozent-details",
                                Item: "Lehrende"}}
                                onChange={setModuleDozent}
                                values={ModuleDozent}
                                width="500px"
                                error={errors.dozent}
                                required={true}
                                >
                            </DropDown>
                    <DropDown Items={room} description={`${t("wRoom")}`}
                                        selectionMode="multiple"
                                        add={{href: "/basicdata/room-details",
                                        Item: "Raum"}}
                                        onChange={setModuleRoom}
                                        values={ModuleRoom}
                                        >
                    </DropDown>
                        <Input
                                isRequired
                                isInvalid={errors.duration}
                                errorMessage={errors.duration ? `${t("duration")} ${t("isRequired")}` : ""}
                                className={"lg:max-w-[250px]"}
                                label={`${t("duration")}`}
                                color="default"
                                type="number"
                                onValueChange={(value) => {setModuleDuration(value)
                                                    if (!value.trim()) {
                                                        setErrors({ ...errors, duration: true })
                                                    } else {
                                                        setErrors({ ...errors, duration: false })
                                                    }
                                                    validateForm()
                                                        }}
                                value={ModuleDuration}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                    }}}
                            />
                            <Input
                                className={"lg:max-w-[250px]"}
                                label={`${t("approximateAttendance")}`}
                                color="default"
                                type="number"
                                onValueChange={(value) => {setModuleAttendance(value)}}
                                value={ModuleAttendance}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                    }}}
                            />
                </div>
            </SectionContainer>
            </form>
        </PageContainer>
        </>
    );
}