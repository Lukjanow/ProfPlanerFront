import {RadioGroup, Radio, Input, Checkbox, Textarea} from "@nextui-org/react";
import PageContainer from "../components/PageContainer";
import { useTranslation } from "react-i18next";
import { DropDown } from "../components/DropDown";
import { SectionContainer } from "../components/SectionContainer";
import { PageTitle } from "../components/PageTitle";
import { OutlinedButton } from "../components/OutlinedButton";
import { FilledButton } from "../components/FilledButton";
import { HexColorPicker } from "react-colorful";
import React, {useEffect} from "react";
import { ModuleItem } from "../components/ModuleItem";
import moment from 'moment';

//Deal with Dozent, Room, duration, type

export default function DropDownTestPage() {
    const { t } = useTranslation();
    const [selectedType, setSelectedType] = React.useState("")  //translate this to ObjectID 
    const [color, setColor] = React.useState("#aabbcc");
    const [bordercolor, setBorderColor] = React.useState("#aabbcc");
    const [trigger, setTrigger] = React.useState(false) //Use to force reload ModuleItem
    const [lecdata, setLecData] = React.useState({
        id: null,
        name: "TestModule",
        code: null,
        dozent: ["Thielen"],
        room: ["B200"],
        study_semester: ["Angewandte Informatik"],
        duration: null,
        approximate_attendance: null,
        need: null,
        type: [],
        frequency: null,
        selected: null,
        color: color,
        bordercolor: bordercolor,
        note: null,
        groups: null
    })
    const [secdata, setSecData] = React.useState({
        id: null,
        name: null,
        code: null,
        dozent: [],
        room: [],
        study_semester: [],
        duration: null,
        approximate_attendance: null,
        need: null,
        type: [],
        frequency: null,
        selected: null,
        color: color,
        bordercolor: bordercolor,
        note: null,
        groups: null
    })
    const getData = (data) => {
        (data?.target) ? 
            (data.target.ariaLabel === "Bezeichnung") ?
                    lecdata.name = data.target.value
                : (data.target.ariaLabel === "Modul-Nr.") ? 
                    lecdata.id = data.target.value
                : (data.target.ariaLabel === "Code") ? 
                    lecdata.code = data.target.value
                : (data.target.ariaLabel === "Dauer") ? 
                    lecdata.duration = data.target.value
                : (data.target.ariaLabel === "Erwartete Anzahl Studenten") ? 
                    lecdata.approximate_attendance = data.target.value
                : (data.target.ariaLabel === "Gruppenanzahl") ? 
                    lecdata.groups = data.target.value
                : (data.target.ariaLabel === "Notizen") ? 
                    lecdata.note = data.target.value
                : {}
            :
            (data.description === "Studiengang") ?
                {}//Request studysemester by study from Database and update semester
            : (data.description === "Fachsemester") ?
                lecdata.study_semester = data.keys
            : (data.description === "Wird angeboten in") ?
                lecdata.frequency = data.keys
            : (data.description === "Wunschraum") ?
                lecdata.room = data.keys
            : (data.description === "Qualifikationsschwerpunkt") ?
                lecdata.study_semester = data.keys 
            : (data.description === "Lehrperson") ?
                lecdata.dozent = data.keys 
            : {}
        //setTrigger(!trigger)
    }
        
    
    const QSP = [{
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
        <PageContainer title={`${t("new")} ${t("module")}`}>
            {/* <div style={{position: "relative", display: "flex", alignItems: "center"}}>
                <div style={{
                    position: "absolute",
                    display: "flex",
                    right: "0px",
                    gap: "10px"
                    }}>
                    <OutlinedButton text="Löschen"
                    onClick={() => {
                        console.log("Button löschen wurde geklickt!");
                    }}
                    color="danger"
                    />
                    <OutlinedButton text="Abbrechen"
                    onClick={() => {
                        console.log("Button Abbrechen wurde geklickt!");
                    }}
                    color="primary"
                    />
                    <FilledButton text="Speichern" icon="plus" showIcon={true} 
                    onClick={() => {
                        console.log("Button Speichern wurde geklickt!");
                    }}
                    />
                </div>
            </div> */}
            <SectionContainer title={"Allgemein"}>
                <div className="flex gap-5" style={{marginBottom: "25px"}}>
                    <DropDown Items={studyCourses} description="Studiengang" selectionMode="multiple"
                        onChange={getData}
                        width="500px">
                    </DropDown>
                    <DropDown Items={semester} description="Fachsemester" selectionMode="multiple"
                     onChange={getData}>
                    </DropDown>
                    <DropDown Items={WinSom} description="Wird angeboten in"
                     onChange={getData}>
                    </DropDown>
                    <Checkbox
                        defaultSelected color="primary"
                        >wird dieses Semester angeboten
                    </Checkbox>
                </div>
                <RadioGroup
                    orientation="horizontal"
                    value={selectedType}
                    onValueChange={setSelectedType}
                    >
                    <Radio value="Pflicht">Pflichtmodul</Radio>
                    <Radio value="Wahlpflicht">Wahlpflichtfach</Radio>
                    <Radio value="QSP">Qualifikationsschwerpunkt</Radio>
                    <Radio value="Sonstiges">Sonstiges</Radio>
                </RadioGroup>
                {(selectedType == "QSP") ? 
                <DropDown Items={QSP} description="Qualifikationsschwerpunkt" selectionMode="multiple"
                    onChange={getData}
                    width="500px">
                </DropDown>: 
                null}
                <div className="flex gap-5" style={{marginTop: "25px",marginBottom: "25px"}}>
                    <div style={{width:"500px", backgroundColor: "#0000000F"}}>
                        <Input
                            label="Bezeichnung"
                            variant="underlined"
                            color="default"
                            onChange={getData}
                        />
                    </div>
                    <div style={{width:"250px", backgroundColor: "#0000000F"}}>
                        <Input
                            label="Modul-Nr."
                            variant="underlined"
                            color="default"
                            onChange={getData}
                        />
                    </div>
                    <div style={{width:"250px", backgroundColor: "#0000000F"}}>
                        <Input
                            label="Code"
                            variant="underlined"
                            color="default"
                            onChange={getData}
                        />
                    </div>
                </div>
                <p>Setze eine Farbe für das Modul fest</p>
                <div className="flex gap-5">
                    <HexColorPicker color={color} onChange={setColor} />
                    <HexColorPicker color={bordercolor} onChange={setBorderColor} />
                    <ModuleItem moduleItemData={{
                                                title: lecdata.name,
                                                studySemester: lecdata.study_semester,
                                                dozent: lecdata.dozent,
                                                room: lecdata.room,
                                                backgroundcolor: color,
                                                bordercolor: bordercolor,
                                                }} key={trigger}/>
                </div>
            </SectionContainer>

            <SectionContainer title={t("lecture")}>
                <div className="flex gap-5" style={{marginTop: "25px"}}>
                    <DropDown Items={teachers} description="Lehrperson" selectionMode="multiple"
                        add={{href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                        Item: "Lehrende"}}
                        onChange={getData}
                        width="500px">
                    </DropDown>
                    <DropDown Items={assistents} description="Assistent" selectionMode="multiple"
                        add={{href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                        Item: "Assistent"}}
                        onChange={getData}>
                    </DropDown>
                    <DropDown Items={room} description="Wunschraum" selectionMode="multiple"
                        add={{href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                        Item: "Raum"}}
                        onChange={getData}>
                    </DropDown>
                </div>
                <div className="flex gap-5" style={{marginTop: "25px"}}>
                    <div style={{width:"237.5px", backgroundColor: "#0000000F"}}>
                        <Input
                            label="Dauer"
                            variant="underlined"
                            color="default"
                            type="number"
                            onChange={getData}
                        />
                    </div>
                    <div style={{width:"237.5px", backgroundColor: "#0000000F"}}>
                        <Input
                            label="Erwartete Anzahl Studenten"
                            variant="underlined"
                            color="default"
                            type="number"
                            onChange={getData}
                        />
                    </div>
                </div>
            </SectionContainer>

            <SectionContainer showContentSwitch={true} title={t("exercise")}>
                <div className="flex flex-row gap-5">
                    <div style={{width:"250px", backgroundColor: "#0000000F"}}>
                        <Input type="number" label="Gruppenanzahl" variant="underlined" onChange={getData}/>
                    </div>
                    <div style={{width:"250px", backgroundColor: "#0000000F"}}>
                        <Input type="number" label="Dauer" variant="underlined" onChange={getData}/>
                    </div>
                </div>
                <div className="flex gap-5">
                    <DropDown Items={assistents} description="Assitent"
                            add={{href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                            Item: "Assistent"}}
                            width="500px"
                            onChange={getData}>
                    </DropDown>
                    <DropDown Items={room} description="Wunschraum" selectionMode="multiple"
                            add={{href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                            Item: "Raum"}}
                            onChange={getData}>
                    </DropDown>
                </div>
                <Checkbox
                        defaultSelected color="primary"
                        >{t("exercise")} und {t("lecture")} als ein Block darstellen
                </Checkbox>
            </SectionContainer>


            <SectionContainer showContentSwitch={true} title={t("training")}>
                <div className="flex flex-row gap-5">
                    <Input type="number" label="Gruppenanzahl" variant="underlined" onChange={getData}/>
                    <Input type="number" label="Dauer" variant="underlined" onChange={getData}/>
                </div>
                <DropDown Items={assistents} description="Assistent"
                        add={{href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                        Item: "Assistent"}}
                        width="500px"
                        onChange={getData}>
                </DropDown>
                <Checkbox
                        defaultSelected color="primary"
                        >{t("training")} und {t("lecture")} als ein Block darstellen
                </Checkbox>
            </SectionContainer>
            <SectionContainer title="Notizen">
                <Textarea
                    minRows={3}
                    label="Notizen"
                    placeholder="Hier können sie Notizen machen"
                    onChange={getData}
                />
            </SectionContainer>
        </PageContainer>
        </>
    );
}