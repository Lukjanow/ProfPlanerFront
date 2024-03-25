import { Input, Checkbox, CheckboxGroup, Select, SelectItem, ModalContent, Modal, Card, Button } from "@nextui-org/react";
import PageContainer from "../components/PageContainer";
import { useTranslation } from "react-i18next";
import { SectionContainer } from "../components/SectionContainer";
import React, { useEffect, useRef, useState, useContext } from "react";
import { getAllDozents } from "../services/dozentService";
import { getAllRooms } from "../services/roomService";
import { ModuleModel } from "../models/moduleModel";
import { deleteModule, getModuleByIdwithoutData, addModule, updateModule } from "../services/moduleService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal.jsx";
import { getAllStudyCourses } from "../services/studyCourseService.js";
import { Context } from "../routes/root.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DozentDetailPage from "./DozentDetailPage.jsx";
import RoomDetailPage from "./RoomDetailPage.jsx";
import { FilledButton } from "../components/FilledButton.jsx";
import { changeColor } from "../utils/calendarEventUtils.js";


export default function EditModulesPage() {
    const { t } = useTranslation();
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [setSnackbarData] = useContext(Context);
    const [showDozentModal, setShowDozentModal] = useState(false);
    const [isDozentSelectOpen, setIsDozentSelectOpen] = React.useState(false);
    const [showRoomModal, setShowRoomModal] = useState(false);
    const [isRoomSelectOpen, setIsRoomSelectOpen] = React.useState(false);

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

    const [NewSemester, setNewSemester] = React.useState(false)

    const dealwithStudySemester = useRef([])

    const [errors, setErrors] = useState({
        module_id: false,
        name: false,
        frequency: false,
        dozent: false,
        duration: false,
        extra: false
    });

    function setRoomsHelper(data) {
        let rooms = []
        data.forEach(room => {
            let dict = {}
            dict["key"] = room["_id"]
            dict["label"] = room["roomNumber"]
            rooms.push(dict)
        });
        setRooms(rooms)
    }

    function setTeachersHelper(data) {
        let dozents = []
        data.forEach((dozent) => {
            let dict = {}
            dict["key"] = dozent["_id"]
            dict["label"] = dozent["prename"] + " " + dozent["lastname"]
            dozents.push(dict)
        });
        setTeachers(dozents)
    }

    function setStudyCourseHelper(course) {
        let studyCourses = []
        let courses = []
        for (const studyCourse of course) {
            let dict = {}
            dict["key"] = studyCourse["_id"]
            dict["label"] = studyCourse["name"]
            studyCourses.push(dict)
            dict = {
                "studyCourse": studyCourse["_id"],
                "content": [],
                "semesterCount": []
            }
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
        if (dealwithStudySemester[0]) {
            e = [...tempStudy],
                e.forEach(function (e) {
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
    }, [dealwithStudySemester, tempStudy])

    const deleteStudy = (index) => {
        const list = [...ModuleStudySemester]
        list.splice(index, 1)
        setModuleStudySemester(list)

    }


    const setstudyHelp = (value, index, attribute) => {
        const list = [...ModuleStudySemester]
        list[index][attribute] = value
        if (attribute == "studyCourse") {
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
            label: t("wSem")
        },
        {
            key: "2",
            label: t("sSem")
        },
        {
            key: "3",
            label: t("wAsSem")
        }
    ]


    const handleSubmit = (e) => {
        e.preventDefault()

        const validationErrors = validateForm();
        if (!Object.values(validationErrors).includes(true)) {
            if (moduleId) {
                let studySemester = JSON.parse(JSON.stringify(ModuleStudySemester))
                studySemester.forEach(function (v) { delete v.errors })
                studySemester.forEach(function (v) { delete v.renderContent })
                studySemester.forEach(function (v) { delete v.renderSemester })
                studySemester.forEach(function (v) { v.studyCourse = v.studyCourse[0] })
                const newModule = new ModuleModel(ModuleID, ModuleName, ModuleCode, Array.from(ModuleDozent), Array.from(ModuleRoom), studySemester, parseInt(ModuleDuration), parseInt(ModuleAttendance), parseInt((ModuleFrequency instanceof Set) ? ModuleFrequency.values().next().value : ModuleFrequency[0]), ModuleSelected, color)
                console.log("new Module:", newModule)
                updateModule(moduleId, newModule)
                    .then(response => {
                        console.log(t("successfullyUpdatedModule"), response);
                        setSnackbarData({ type: "success", message: t("successfullyUpdatedModule"), visible: true })
                        navigate("/basicdata")
                    })
                    .catch(error => {
                        console.error(t("errorUpdatingModule"), error);
                        setSnackbarData({ type: "error", message: t("errorUpdatingModule"), visible: true })
                    })

                return
            }
            let studySemester = JSON.parse(JSON.stringify(ModuleStudySemester))
            studySemester.forEach(function (v) { delete v.errors })
            studySemester.forEach(function (v) { delete v.renderContent })
            studySemester.forEach(function (v) { delete v.renderSemester })
            studySemester.forEach(function (v) { v.studyCourse = v.studyCourse[0] })
            const newModule = new ModuleModel(ModuleID, ModuleName, ModuleCode, Array.from(ModuleDozent), Array.from(ModuleRoom), studySemester, parseInt(ModuleDuration), parseInt(ModuleAttendance), parseInt(ModuleFrequency.values().next().value), ModuleSelected, color)
            addModule(newModule)
                .then(response => {
                    console.log(t("successfullySavedModule"), response);
                    setSnackbarData({ type: "success", message: t("successfullySavedModule"), visible: true })
                    navigate("/basicdata")
                })
                .catch(error => {
                    console.error(t("errorSavingModule"), error);
                    setSnackbarData({ type: "error", message: t("errorSavingModule"), visible: true })
                })
        } else {
            console.error("Error: ", errors);
        }
    }

    const handleDelete = () => {
        deleteModule(moduleId)
            .then(response => {
                console.log(t("successfullyDeletedModule"), response);
                setSnackbarData({ type: "success", message: t("successfullyDeletedModule"), visible: true })
                navigate("/basicdata")
            })
            .catch(error => {
                console.error(t("errorDeletingModule"), error);
                setSnackbarData({ type: "error", message: t("errorDeletingModule"), visible: true })
            })
    }

    const validateForm = () => {
        let errors = {};
        ModuleStudySemester.forEach(function (v) {
            v.errors = {
                studyCourse: false,
                semesterNumbers: false,
                content: false
            }
        })

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
            if (data.studyCourse.length == 0 || data.studyCourse.size == 0) {
                data.errors.studyCourse = true;
            }

            if (data.semesterNumbers.length == 0 || data.semesterNumbers.size == 0) {
                data.errors.semesterNumbers = true;
            }

            if (data.type.includes("Qualifikationsschwerpunkt") && (data.content.length == 0 || data.content.size == 0)) {
                data.errors.content = true;
            }

            if (Object.values(data.errors).includes(true)) {
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

    const handleNewSemester = () => {
        setModuleStudySemester(old => [...old, {
            _id: old.length,
            studyCourse: [],
            semesterNumbers: [],
            content: [],
            type: [""],
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
        if (NewSemester) {
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
    }, [NewSemester, studyCourse, ModuleStudySemester, studyContent])


    useEffect(() => {
        getAllDozents()
            .then(response => {
                setTeachersHelper(response.data)
            })
            .catch(error => {
                console.error("Error fetching dozents:", error);
            });
    }, [showDozentModal])


    useEffect(() => {
        getAllRooms()
            .then(response => {
                setRoomsHelper(response.data)
            })
            .catch(error => {
                console.error("Error fetching rooms:", error);
            });
    }, [showRoomModal])


    return (
        <form>
            <PageContainer title={(moduleId) ? `${ModuleID} ${ModuleName}` : `${t("newModule")}`}
                primaryButtonTitle={`${t("save")}`}
                showDeleteButton={moduleId ? true : false}
                onClickDelete={() => setShowModal(true)}
                onClickPrimary={(e) => handleSubmit(e)}
                onClickCancel={() => navigate("/basicdata")}
            >

                <Modal
                    isOpen={showRoomModal}
                    backdrop={"blur"}
                    isDismissable={false}
                    size={"5xl"}
                    hideCloseButton={true}
                >
                    <ModalContent>
                        <RoomDetailPage isShownAsModal={true} closeModal={() => setShowRoomModal(false)} />
                    </ModalContent>
                </Modal>
                <Modal
                    isOpen={showDozentModal}
                    backdrop={"blur"}
                    isDismissable={false}
                    size={"5xl"}
                    hideCloseButton={true}
                >
                    <ModalContent>
                        <DozentDetailPage isShownAsModal={true} closeModal={() => setShowDozentModal(false)} />
                    </ModalContent>
                </Modal>
                <DeleteModal
                    value={showModal}
                    onClickCancel={() => {
                        setShowModal(false)
                    }}
                    onClickDelete={handleDelete}
                    headlineText={t("deleteQuestion")}
                    bodyText={t("ModuleDeleteText")}
                />
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
                            onValueChange={(value) => {
                                setModuleID(value)
                                if (!value.trim()) {
                                    setErrors({ ...errors, module_id: true })
                                } else {
                                    setErrors({ ...errors, module_id: false })
                                }
                            }}
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
                        <Select
                            label={t("offeredIn")}
                            isRequired
                            selectedKeys={ModuleFrequency}
                            onSelectionChange={setModuleFrequency}
                            isInvalid={errors.frequency}
                            errorMessage={errors.frequency ? `${t("offeredIn")} ${t("isRequired")}` : ""}
                        >
                            {
                                WinSom.map(item => (
                                    <SelectItem
                                        key={item.key}
                                        value={item.key}
                                    >
                                        {item.label}
                                    </SelectItem>
                                ))
                            }
                        </Select>
                    </div>
                    <Checkbox
                        defaultSelected
                        color="primary"
                        onChange={setModuleSelected}
                        value={ModuleSelected}
                        isRequired
                    >{`${t("isOffered")}`}
                    </Checkbox>
                    <div className="flex gap-5">
                        <p>{t("colorSelector")}</p>
                    </div>
                    <div className="flex gap-5 flex-wrap">
                        <Card className={"flex justify-center items-center w-[60px] h-[60px] bg-[#90D7FF]"} radius={"md"} shadow={"sm"} isPressable onPress={() => setColor(color !== "#90D7FF" ? "#90D7FF" : null)}>
                            {color === "#90D7FF" ? <FontAwesomeIcon className={"text-xl text-default-500"} icon={"check"} /> : <></>}
                        </Card>
                        <Card className={"flex justify-center items-center w-[60px] h-[60px] bg-[#E6D1DC]"} radius={"md"} shadow={"sm"} isPressable onPress={() => setColor(color !== "#E6D1DC" ? "#E6D1DC" : null)}>
                            {color === "#E6D1DC" ? <FontAwesomeIcon className={"text-xl text-default-500"} icon={"check"} /> : <></>}
                        </Card>
                        <Card className={"flex justify-center items-center w-[60px] h-[60px] bg-[#FFD773]"} radius={"md"} shadow={"sm"} isPressable onPress={() => setColor(color !== "#FFD773" ? "#FFD773" : null)}>
                            {color === "#FFD773" ? <FontAwesomeIcon className={"text-xl text-default-500"} icon={"check"} /> : <></>}
                        </Card>
                        <Card className={"flex justify-center items-center w-[60px] h-[60px] bg-[#AEF6C7]"} radius={"md"} shadow={"sm"} isPressable onPress={() => setColor(color !== "#AEF6C7" ? "#AEF6C7" : null)}>
                            {color === "#AEF6C7" ? <FontAwesomeIcon className={"text-xl text-default-500"} icon={"check"} /> : <></>}
                        </Card>
                        <Card className={"flex justify-center items-center w-[60px] h-[60px] bg-[#FFE0B5]"} radius={"md"} shadow={"sm"} isPressable onPress={() => setColor(color !== "#FFE0B5" ? "#FFE0B5" : null)}>
                            {color === "#FFE0B5" ? <FontAwesomeIcon className={"text-xl text-default-500"} icon={"check"} /> : <></>}
                        </Card>
                        <Card className={"flex justify-center items-center w-[60px] h-[60px] bg-[#FFA099]"} radius={"md"} shadow={"sm"} isPressable onPress={() => setColor(color !== "#FFA099" ? "#FFA099" : null)}>
                            {color === "#FFA099" ? <FontAwesomeIcon className={"text-xl text-default-500"} icon={"check"} /> : <></>}
                        </Card>
                        <Card className={"flex justify-center items-center w-[60px] h-[60px] bg-[#BCE784]"} radius={"md"} shadow={"sm"} isPressable onPress={() => setColor(color !== "#BCE784" ? "#BCE784" : null)}>
                            {color === "#BCE784" ? <FontAwesomeIcon className={"text-xl text-default-500"} icon={"check"} /> : <></>}
                        </Card>
                        <Card className={"flex justify-center items-center w-[60px] h-[60px] bg-[#FFAC75]"} radius={"md"} shadow={"sm"} isPressable onPress={() => setColor(color !== "#FFAC75" ? "#FFAC75" : null)}>
                            {color === "#FFAC75" ? <FontAwesomeIcon className={"text-xl text-default-500"} icon={"check"} /> : <></>}
                        </Card>
                    </div>
                    < div className={`text-[#444444] border-1 border-s-8 rounded-e-md p-3 h-full flex flex-col gap-2 lg:w-[300px]`} style={{ backgroundColor: color !== null ? color : "#EEEEEE", borderColor: changeColor(color !== null ? color : "#C6C6C6", -40) }}>
                        <div>
                            <p className="font-bold text-xs">{"Modulname"}</p>
                        </div>
                        <div className="flex flex-col gap-[3px] text-xs">
                            <div className="flex gap-1 items-center detail-semester">
                                <FontAwesomeIcon className={"w-[15px]"} icon="graduation-cap" />
                                <span>{"Studiengang"}</span>
                            </div>
                            <div className="flex gap-1 items-center detail-dozent">
                                <FontAwesomeIcon className={"w-[15px]"} icon="user" />
                                <span>{"Dozent"}</span>
                            </div>
                            <div className="flex gap-1 items-center detail-room">
                                <FontAwesomeIcon className={"w-[15px]"} icon="location-dot" />
                                <span>{"Raum"}</span>
                            </div>
                        </div>
                    </div>
                </SectionContainer>

                <SectionContainer
                    title={t("studycourse")}
                    primaryButton={
                        <FilledButton size={"sm"} text={t("addSemester")} icon="plus" showIcon={true} color={"primary"}
                            onClick={(e) => {
                                e.preventDefault()
                                handleNewSemester()
                            }}></FilledButton>
                    }
                >
                    {ModuleStudySemester.map((data, index) => (
                        <Card className={"p-6 gap-5"} shadow={"sm"} radius={"sm"} key={index}>
                            <div className="flex lg:flex-row flex-col gap-5">
                                <Select
                                    label={t("studycourse")}
                                    isRequired
                                    selectedKeys={data.studyCourse}
                                    onSelectionChange={(e) => setstudyHelp(Array.from(e), index, "studyCourse")}
                                    isInvalid={data.errors.studyCourse}
                                    errorMessage={data.errors.studyCourse ? `${t("studycourse")} ${t("isRequired")}` : ""}
                                >
                                    {
                                        studyCourseDrop.map(item => (
                                            <SelectItem
                                                key={item.key}
                                                value={item.key}
                                            >
                                                {item.label}
                                            </SelectItem>
                                        ))
                                    }
                                </Select>
                                <Select
                                    label={t("semester")}
                                    isRequired
                                    selectedKeys={data.semesterNumbers}
                                    selectionMode="multiple"
                                    onSelectionChange={(e) => setstudyHelp(Array.from(e), index, "semesterNumbers")}
                                    isInvalid={data.errors.semesterNumbers}
                                    errorMessage={data.errors.semesterNumbers ? `${t("semester")} ${t("isRequired")}` : ""}
                                >
                                    {
                                        data.renderSemester.map(item => (
                                            <SelectItem
                                                key={item.key}
                                                value={item.key}
                                            >
                                                {item.label}
                                            </SelectItem>
                                        ))
                                    }
                                </Select>
                            </div>
                            <CheckboxGroup
                                label="Modulart auswählen"
                                color="primary"
                                value={data.type}
                                orientation="horizontal"
                                onValueChange={(e) => setstudyHelp(e, index, "type")}>
                                <Checkbox value="Pflicht">{t("mandatory")}</Checkbox>
                                <Checkbox value="Qualifikationsschwerpunkt">{t("focusOfQualification")}/{t("compulsoryElectivemodule")}</Checkbox>
                                <Checkbox value="Andere">{t("other")}</Checkbox>
                            </CheckboxGroup>
                            {(data.type.includes("Qualifikationsschwerpunkt")) ?
                                <Select
                                    label={t("focusOfQualification")}
                                    isRequired
                                    selectedKeys={data.content}
                                    selectionMode="multiple"
                                    onSelectionChange={(e) => setstudyHelp(Array.from(e), index, "content")}
                                    isInvalid={data.errors.content}
                                    errorMessage={data.errors.content ? `${t("content")} ${t("isRequired")}` : ""}
                                    style={{ marginBottom: "10px" }}
                                >
                                    {
                                        data.renderContent.map(item => (
                                            <SelectItem
                                                key={item.key}
                                                value={item.key}
                                            >
                                                {item.label}
                                            </SelectItem>
                                        ))
                                    }
                                </Select>
                                : null
                            }
                            {
                                (index > 0) ?
                                    <Button className={"lg:w-28"} color={"danger"} radius={"sm"} size={"sm"} onClick={() => deleteStudy(index)}>
                                        <FontAwesomeIcon icon={"trash"} />
                                        {t("delete")}
                                    </Button> :
                                    null
                            }
                        </Card>
                    ))}

                </SectionContainer>


                <SectionContainer title={t("event")}>
                    <div className="flex flex-col lg:flex-row gap-5">
                        <Select
                            isRequired
                            label={t("lecturer")}
                            isMultiline
                            selectionMode={"multiple"}
                            selectedKeys={ModuleDozent}
                            onSelectionChange={setModuleDozent}
                            isOpen={isDozentSelectOpen}
                            onOpenChange={(open) => setIsDozentSelectOpen(open)}
                            isInvalid={errors.dozent}
                            errorMessage={errors.dozent ? `${t("lecturer")} ${t("isRequired")}` : ""}
                        >
                            <SelectItem
                                startContent={<FontAwesomeIcon icon={"plus"} />}
                                showDivider
                                href="#toPreventSelect"
                                onPress={() => {
                                    setShowDozentModal(true)
                                    setIsDozentSelectOpen(false)
                                }}
                            >
                                {t("createNewDozent")}
                            </SelectItem>
                            {
                                teachers.map(item => (
                                    <SelectItem
                                        key={item.key}
                                        value={item.key}
                                    >
                                        {item.label}
                                    </SelectItem>
                                ))
                            }
                        </Select>
                        <Select
                            label={t("room")}
                            isMultiline
                            selectionMode={"multiple"}
                            selectedKeys={ModuleRoom}
                            onSelectionChange={setModuleRoom}
                            isOpen={isRoomSelectOpen}
                            onOpenChange={(open) => setIsRoomSelectOpen(open)}
                            isInvalid={errors.room}
                            errorMessage={errors.room ? `${t("room")} ${t("isRequired")}` : ""}
                        >
                            <SelectItem
                                startContent={<FontAwesomeIcon icon={"plus"} />}
                                showDivider
                                href="#toPreventSelect"
                                onPress={() => {
                                    setShowRoomModal(true)
                                    setIsRoomSelectOpen(false)
                                }}
                            >
                                {t("createNewRoom")}
                            </SelectItem>
                            {
                                room.map(item => (
                                    <SelectItem
                                        key={item.key}
                                        value={item.key}
                                    >
                                        {item.label}
                                    </SelectItem>
                                ))
                            }
                        </Select>
                        <Input
                            isRequired
                            isInvalid={errors.duration}
                            errorMessage={errors.duration ? `${t("duration")} ${t("isRequired")}` : ""}
                            className={"lg:max-w-[250px]"}
                            label={`${t("duration")}`}
                            color="default"
                            type="number"
                            onValueChange={(value) => {
                                setModuleDuration(value)
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
                                }
                            }}
                        />
                        <Input
                            className={"lg:max-w-[250px]"}
                            label={`${t("approximateAttendance")}`}
                            color="default"
                            type="number"
                            onValueChange={(value) => { setModuleAttendance(value) }}
                            value={ModuleAttendance}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                        />
                    </div>
                </SectionContainer>
            </PageContainer>
        </form>
    );
}