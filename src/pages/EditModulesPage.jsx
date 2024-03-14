import { Input, Checkbox, CheckboxGroup } from "@nextui-org/react";
import PageContainer from "../components/PageContainer";
import { useTranslation } from "react-i18next";
import { DropDown } from "../components/DropDown";
import { SectionContainer } from "../components/SectionContainer";
import React, { useEffect, useRef, useState, useContext } from "react";
import { ModuleItem } from "../components/ModuleItem";
import {OutlinedButton} from "../components/OutlinedButton";
import { getAllDozents } from "../services/dozentService";
import { getAllRooms } from "../services/roomService";
import { ModuleModel } from "../models/moduleModel";
import { deleteModule, getModuleByIdwithoutData, addModule, updateModule } from "../services/moduleService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal.jsx";
import { getAllStudyCourses } from "../services/studyCourseService.js";
import { Context } from "../routes/root.jsx";

//TODO: Checkbox acting weird, QSP doesn't change when editing

export default function EditModulesPage(
) {
    const { t } = useTranslation();
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [setSnackbarData] = useContext(Context);

    const [ModuleID, setModuleID] = React.useState("")
    const [ModuleName, setModuleName] = React.useState("")
    const [ModuleCode, setModuleCode] = React.useState("")
    const [ModuleDozent, setModuleDozent] = React.useState([])
    const [ModuleRoom, setModuleRoom] = React.useState([])
    const [ModuleStudySemester, setModuleStudySemester] = useState([])
    const [tempStudy, setTempStudy] = useState([])
    const [ModuleDuration, setModuleDuration] = React.useState("0")
    const [ModuleAttendance, setModuleAttendance] = React.useState("0")
    const [ModuleFrequency, setModuleFrequency] = React.useState(["3"])
    const [ModuleSelected, setModuleSelected] = React.useState(true)
    const [color, setColor] = React.useState("")

    const [studyCourse, setStudyCourse] = React.useState([])  //all info
    const [studyCourseDrop, setStudyCourseDrop] = React.useState([])  //Study course to display
    const [studyContent, setStudyContent] = React.useState([]) //Contains qsp and semester count to study course
    const [room, setRooms] = useState([])     //rooms to display
    const [teachers, setTeachers] = useState([])     //teachers to display

    const dealwithStudySemester = useRef([])

    const [errors, setErrors] = useState({
        module_id: false,
        name: false,
        frequency: false,
        dozent: false,
        duration: false,
        extra: false
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

    function setStudyCourseHelper(course){
        let studyCourses = []
        let courses = []
        for (const studyCourse of course) {
            let dict = {}
            dict["key"] = studyCourse["_id"]
            dict["label"] = studyCourse["name"]
            studyCourses.push(dict)
            dict = {"studyCourse": studyCourse["_id"],
                        "content": [],
                        "semesterCount": []} 
            try {
                studyCourse["content"].forEach((qsp) => {
                    let thing = {}
                    thing["label"] = qsp
                    thing["key"] = qsp
                    dict["content"].push(thing)
                })
                for (let i = 1; i <= studyCourse["semesterCount"]; i++) {
                    let thing = {}
                    thing["label"] = "Semester " + i
                    thing["key"] = String(i)
                    dict["semesterCount"].push(thing)
                }
            } catch (error) {
                console.log(error, " occured while setting qsp and semesters")
            }
            courses.push(dict)
        }
        setStudyContent(courses),
        setStudyCourse(course),
        setStudyCourseDrop(studyCourses)
    }


    useEffect(() => {
        let e
        if(dealwithStudySemester[0]){
            e = [...tempStudy],
            e.forEach(function(e){
                e.studyCourse = [e.studyCourse]
                e.errors = {
                    studyCourse: false,
                    semesterNumbers: false,
                    content: false
                },
                e.semesterNumbers = e.semesterNumbers.map(String)
                let object = studyContent.find(item => item.studyCourse == e.studyCourse)
                e.renderContent = object["content"]
                e.renderSemester = object["semesterCount"]
            })
            setModuleStudySemester(e)
            dealwithStudySemester[0] = false
        }
    },[dealwithStudySemester, tempStudy])

    const deleteStudy = (index) => {
        const list = [...ModuleStudySemester]
        list.splice(index, 1)
        setModuleStudySemester(list)

    }


    const setstudyHelp = (value, index, attribute) => {
        const list = [...ModuleStudySemester]
        list[index][attribute] = value
        if (attribute == "studyCourse"){
            list[index]["semesterNumbers"] = []
            list[index]["content"] = []
            list[index]["type"] = ""
        }
        let object
        try {
            object = studyContent.find(item => item.studyCourse == list[index].studyCourse[0])   
        } catch (error) {
            console.log(error)
        }
        console.log("Found:", object)
        list[index]["renderContent"] = object["content"]
        list[index]["renderSemester"] = object["semesterCount"]
        setModuleStudySemester(list)
    }
    

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
                    setTempStudy(response.data.study_semester)
                    dealwithStudySemester[0] = true
                    setModuleDuration(String(response.data.duration))
                    setModuleAttendance(String(response.data.approximate_attendance))
                    setModuleFrequency([String(response.data.frequency)])
                    setModuleSelected(response.data.selected)
                    setColor(response.data.color)
                    
                })
                .catch(error => {
                    console.error("Error fetching Module:", error);
                })
            } else {
                handleNewSemester()
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
        
        console.log(validationErrors)
        if (!Object.values(validationErrors).includes(true)) {
            if (moduleId) {
                let studySemester = JSON.parse(JSON.stringify(ModuleStudySemester))
                studySemester.forEach(function(v){delete v.errors})
                studySemester.forEach(function(v){delete v.renderContent})
                studySemester.forEach(function(v){delete v.renderSemester})
                studySemester.forEach(function(v){v.studyCourse = v.studyCourse[0]})
                studySemester.forEach(function(v){v.content = Array.from(v.content)})
                const newModule = new ModuleModel(ModuleID, ModuleName, ModuleCode, Array.from(ModuleDozent), Array.from(ModuleRoom), studySemester, parseInt(ModuleDuration), parseInt(ModuleAttendance), parseInt((ModuleFrequency instanceof Set) ? ModuleFrequency.values().next().value : ModuleFrequency[0]), ModuleSelected, color)
                console.log("new Module:", newModule)
                updateModule(moduleId, newModule)
                    .then(response => {
                        console.log("Module updated: ", response);
                        setSnackbarData({ type: "success", message: "Module updated.", visible: true })
                        navigate("/basicdata")
                    })
                    .catch(error => {
                        console.error("Error updating Module:", error);
                        setSnackbarData({ type: "error", message: "Error updating Module.", visible: true })
                    })

                return
            }
            let studySemester = JSON.parse(JSON.stringify(ModuleStudySemester))
            studySemester.forEach(function(v){delete v.errors})
            studySemester.forEach(function(v){delete v.renderContent})
            studySemester.forEach(function(v){delete v.renderSemester})
            studySemester.forEach(function(v){v.studyCourse = v.studyCourse[0]})
            studySemester.forEach(function(v){v.content = Array.from(v.content)})
            const newModule = new ModuleModel(ModuleID, ModuleName, ModuleCode, Array.from(ModuleDozent), Array.from(ModuleRoom), studySemester, parseInt(ModuleDuration), parseInt(ModuleAttendance), parseInt(ModuleFrequency.values().next().value), ModuleSelected, color)
            addModule(newModule)
                .then(response => {
                    console.log("Module saved: ", response);
                    setSnackbarData({ type: "success", message: "Module saved.", visible: true })
                    navigate("/basicdata")
                })
                .catch(error => {
                    console.error("Error saving Module:", error);
                    setSnackbarData({ type: "error", message: "Error saving Module.", visible: true })
                })
        } else {
            console.error("Error: ", errors);
        }
    }

    const handleDelete = () => {
        deleteModule(moduleId)
            .then(response => {
                console.log("Module deleted: ", response);
                setSnackbarData({ type: "success", message: "Module deleted.", visible: true })
                navigate("/basicdata")
            })
            .catch(error => {
                console.error("Error deleting Module:", error);
                setSnackbarData({ type: "error", message: "Error deleting Module.", visible: true })
            })
        navigate("/basicdata")
    }

    const validateForm = () => {
        let errors = {};
        ModuleStudySemester.forEach(function(v){v.errors = {
            studyCourse: false,
            semesterNumbers: false,
            content: false
        }})

         if (!ModuleID.trim()) {
            errors.module_id = true;
        }

        if (!ModuleName.trim()) {
            errors.name = true;
        }

        if (ModuleFrequency.length == 0 || ModuleFrequency.size == 0) {
            errors.frequency = true;
        } 

        ModuleStudySemester.forEach((data) => {
            if (data.studyCourse.length == 0 || data.studyCourse.size == 0){
                data.errors.studyCourse = true;
            }
    
            if (data.semesterNumbers.length == 0|| data.semesterNumbers.size == 0){
                data.errors.semesterNumbers = true;
            }
    
            if (data.type.includes("Qualifikationsschwerpunkt") && (data.content.length == 0 || data.content.size == 0)){
                data.errors.content = true;
            }
            
            if(Object.values(data.errors).includes(true)){
                errors.extra = true;
            }
        })

        if (ModuleDozent.length == 0 || ModuleDozent.size == 0) {
            errors.dozent = true;
        } 

        if (!/[0-9]/.test(ModuleDuration) || ModuleDuration == "0") {
            errors.duration = true;
        }

        setErrors(errors);
        return errors;
    };
    
    const [NewSemester, setNewSemester] = React.useState(false)

    const handleNewSemester = () => {
        setModuleStudySemester(old => [...old, {
            _id: old.length,
            studyCourse: [],
            semesterNumbers: [],
            content: [],
            type: "",
            errors: {
                studyCourse: false,
                semesterNumbers: false,
                content: false
            },
            renderContent: [],
            renderSemester: []
        }])
        setNewSemester(true)
    }

    useEffect(() => {
        if(NewSemester){
            let index = ModuleStudySemester.length - 1
            const list = [...ModuleStudySemester]
            list[index]["studyCourse"] = [studyContent[0].studyCourse]
            let object
            try {
                object = studyContent.find(item => item.studyCourse == list[index].studyCourse[0])   
            } catch (error) {
                console.log(error)
            }
            list[index]["renderContent"] = object["content"]
            list[index]["renderSemester"] = object["semesterCount"]
            setModuleStudySemester(list)
            setNewSemester(false)
        }
    },[NewSemester, studyCourse, ModuleStudySemester, studyContent])


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
                        <DropDown Items={WinSom} description={`${t("offeredIn")}`}
                            onChange={setModuleFrequency} values={ModuleFrequency}
                            required={true} error={errors.frequency}>
                        </DropDown>
                </div>
                <Checkbox
                            defaultSelected color="primary"
                            onChange={setModuleSelected}
                            value={ModuleSelected}
                            isRequired
                        >{`${t("isOffered")}`}
                </Checkbox>
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
                                                backgroundcolor: color,
                                                visible: true
                                                }} />
                </div>
            </SectionContainer>
            
            <SectionContainer title={t("semester")}>
                <div className="flex gap-5" style={{marginBottom: "10px"}}>
                    <OutlinedButton text="Füge ein Semester hinzu" icon="plus" showIcon={true} color={"primary"}
                                onClick={() =>{
                                    handleNewSemester()
                                }}></OutlinedButton>

                </div>
                <div style={{borderBottom: "solid black 2px"}}></div>
                {ModuleStudySemester.map((data, index) => (
                    <div key={index} style={{borderBottom: "solid black 2px"}}>
                     <div className="flex lg:flex-row flex-col gap-5">
                        <DropDown Items={studyCourseDrop} description={`${t("studycourse")}`}
                            onChange={(e) => setstudyHelp(Array.from(e), index, "studyCourse")}
                            values={data.studyCourse}
                            error={data.errors.studyCourse}
                            width="500px"
                            required={true}>
                        </DropDown>
                        <DropDown Items={data.renderSemester}
                            description={`${t("semester")}`} selectionMode="multiple"
                            onChange={(e) => setstudyHelp(Array.from(e), index, "semesterNumbers")}
                            values={data.semesterNumbers}
                            error={data.errors.semesterNumbers}
                            required={true}>
                        </DropDown>
                        {
                            (index > 0) ? <OutlinedButton text={`${t("delete")}`} onClick={() => deleteStudy(index)} color="danger"/> : null
                        }
                    </div>
                    <div className="flex lg:flex-row flex-col gap-5" style={{marginBottom: "10px"}}>
                        <CheckboxGroup
                            label="Modulart auswählen"
                            color="primary"
                            value={data.type}
                            onValueChange={(e) => setstudyHelp(e, index, "type")}>
                        <div className="flex lg:flex-row flex-col gap-5">
                            <Checkbox value="Pflicht">Pflicht</Checkbox>
                            <Checkbox value="Qualifikationsschwerpunkt">Qualifikationsschwerpunkt/Wahlpflichtmodul</Checkbox>
                            <Checkbox value="Andere">Anderes</Checkbox>
                        </div>
                        </CheckboxGroup>
                    </div>
                        {(data.type.includes("Qualifikationsschwerpunkt")) ? 
                        <DropDown
                            Items={data.renderContent}
                            description={`${t("focusOfQualification")}`}
                            onChange={(e) => setstudyHelp(e, index, "content")} values={data.content} selectionMode="multiple"
                            error={data.errors.content}
                            required={true}
                        /> 
                        : null
                        }
                </div>
                ))}
                
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