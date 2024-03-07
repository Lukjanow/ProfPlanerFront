import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

export function ModuleItem({ moduleItemData, dragEvent }) {  
    const {
      name,
      studySemester,
      dozent,
      room,
      backgroundcolor,
      bordercolor
    } = moduleItemData;

    const moduleStyle = {
      backgroundColor: backgroundcolor,
      borderColor: bordercolor,
    };

    

  //`border-1 border-s-8 w-max border-[${bordercolor}] bg-[${backgroundcolor}] rounded-e-md p-3`}{
  return (
      <div className="border-1 border-s-8 w-[13vw] rounded-e-md p-3" style={moduleStyle} draggable onDragStart={() => dragEvent(moduleItemData)}>
        <p className="font-semibold">{name}</p>
        <div className="flex">
          <span className="flex justify-center items-center justify-self-center w-[30px]"><FontAwesomeIcon icon="fa-solid fa-graduation-cap" /></span><span>{studySemester}</span>
        </div>
        <div className="flex">
          <span className="flex justify-center items-center justify-self-center w-[30px]"><FontAwesomeIcon icon="fa-solid fa-user" /></span><span>{dozent}</span>
        </div>
        <div className="flex">
          <span className="flex justify-center items-center justify-self-center w-[30px]"><FontAwesomeIcon icon="fa-solid fa-location-dot" /></span><span>{room}</span>
        </div>
      </div>
  );
}