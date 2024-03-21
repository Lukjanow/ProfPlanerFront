import {useState, useEffect, useRef, useImperativeHandle} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button, Divider, Listbox, ListboxItem, ListboxSection} from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import {getExportData, importData, importDataMerge} from "../services/importExportService.js";
import SnackBar from "./SnackBar.jsx";
import TimedComponent from "./TimedComponent.jsx";

export default function BasicDataMenu({ onItemClick }) {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState(
    localStorage.getItem("selectedItem") || "module"
  ); // Initialisieren des ausgewählten Elements mit dem Wert aus dem localStorage oder "module", falls kein Wert vorhanden ist
  const fileInputRefFull = useRef(null);
  const fileInputRefMerge = useRef(null);
  const [showImportSnackBar, setShowImportSnackBar] = useState(false);
  const [isMergeComplete, setisMergeComplete] = useState(false);


  useEffect(() => {
    localStorage.setItem("selectedItem", selectedItem); // Speichern des ausgewählten Elements im localStorage
  }, [selectedItem]);

  const items = [
    {
      key: "module",
      description: t("module"),
      icon: "pen-to-square",
    },
    {
      key: "room",
      description: t("rooms"),
      icon: "door-closed",
    },
    {
      key: "teacher",
      description: t("lecturer"),
      icon: "user",
    },
    {
      key: "studycourse",
      description: t("studycourse"),
      icon: "user",
    }
  ];

  const actionItems = [
    {
      key: "importFullBasicDataAsXLSX",
      description: t("importFullAsXLSX"),
      icon: "file-upload",
      doAction: () => {
        console.log("importFullBasicDataAsXLSX clicked!");
        fileInputRefFull.current.click();
      }
    },
    {
      key: "importMergeBasicDataAsXLSX",
      description: t("importMergeAsXLSX"),
      icon: "file-upload",
      doAction: () => {
        console.log("importMergeBasicDataAsXLSX clicked!");
        fileInputRefMerge.current.click();
      }
    },
    {
      key: "exportBasicDataAsXLSX",
      description: t("exportAsXLSX"),
      icon: "file-download",
      doAction: async () => {
        await getExportData();
      }
    },
  ]

  const handleItemClick = (itemKey) => {
    setSelectedItem(itemKey); // Setzen des ausgewählten Elements
    onItemClick(itemKey); // Aufruf der übergebenen Funktion
  };

  async function handleChangesFull(e) {
    const file = e.target.files[0];
    await importData(file);
    setisMergeComplete(true)
    setShowImportSnackBar(true);
  }

  async function handleChangesMerge(e) {
    const file = e.target.files[0];
    const result = await importDataMerge(file);

    if(Object.keys(result.data)[0] === "filename"){
      setisMergeComplete(true)
      setShowImportSnackBar(true);
    } else {
      setisMergeComplete(false)
      setShowImportSnackBar(true);
    }
  }

  const getSnackBar = () =>{
    var snachBAr = <SnackBar message={t("uploadedXLSXFile")}/>

    if(!isMergeComplete){
      snachBAr = <SnackBar message={t("uploadedXLSXFileError")} type="error"/>
    }

    return snachBAr
  }

  return (
      <>
        {showImportSnackBar && (
            <TimedComponent duration={4000} onClose={() => setShowImportSnackBar(false)}>
            {console.log("Error",isMergeComplete)}
              {getSnackBar()}
            </TimedComponent>
        )}

        <input
            hidden
            onChange={handleChangesFull}
            type="file"
            accept=".xlsx"
            ref={fileInputRefFull}
        />
        <input
            hidden
            onChange={handleChangesMerge}
            type="file"
            accept=".xlsx"
            ref={fileInputRefMerge}
        />
        <Listbox
            variant="flat"
            aria-label="Listbox menu with descriptions"
            className="w-[200px] px-1 py-2 rounded-small bg-content1 shadow-small h-fit"
        >
          <ListboxSection showDivider>
            {items.map((item) => (
                <ListboxItem
                    key={item.key}
                    selectionMode={"single"}
                    // startContent={
                    //   <FontAwesomeIcon className={"text-md w-[25px]"} icon={item.icon} />
                    // }
                    className={`${selectedItem === item.key ? "bg-primary-100" : ""} p-3`}
                    onClick={() => handleItemClick(item.key)}
                >
                  {item.description}
                </ListboxItem>
            ))}
          </ListboxSection>

          <ListboxSection>
            {actionItems.map((item) => (
                <ListboxItem
                    key={item.key}
                    selectionMode={"single"}
                    // startContent={
                    //   <FontAwesomeIcon className={"text-md w-[25px]"} icon={item.icon} />
                    // }
                    className={`p-3`}
                    onClick={item.doAction}
                >
                  {item.description}
                </ListboxItem>
            ))}
          </ListboxSection>
        </Listbox>
      </>
  );
}
