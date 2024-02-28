import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

export function ModuleItem({ moduleItemData, dragEvent }) {  
    const {
      id,
      title,
      start,
      studySemester,
      dozent,
      room,
      backgroundcolor,
      bordercolor,
      hideTime,
      duration
    } = moduleItemData;

    const moduleStyle = {
      backgroundColor: backgroundcolor,
      borderColor: bordercolor,
    };

    if (!hideTime) {
      moduleStyle["height"] = "100%";
    }


    function setTime(){
      if(hideTime){
        return <></>
      }
     const startHours = start.getHours()
     const startMinutes = start.getMinutes()
     const durationHours = Math.floor(duration/60)
     const durationMinutes = duration % 60

     var endMinutes = startMinutes + durationMinutes
     var endHours = startHours + durationHours

     if(endMinutes >= 60){
      endHours += 1
      endMinutes -= 60
     }

      return (
        <p className="font-semibold" hidden={moduleItemData.hideTime}>
          {startHours + ":"}
          {fixZeros(startMinutes) + " - "}
          {endHours + ":"}
          {fixZeros(endMinutes) + " Uhr"}
        </p>
      )
    }

  function fixZeros(num) {
    return (num < 10 ? "0" : "") + num;
  }

  //`border-1 border-s-8 w-max border-[${bordercolor}] bg-[${backgroundcolor}] rounded-e-md p-3`}{
  return (
      <div key={id} id="ModuleItem" className="border-1 border-s-8 w-[13vw] rounded-e-md p-3" style={moduleStyle} draggable onDragStart={() => dragEvent(moduleItemData)}>
        {setTime()}
        <p className="font-semibold">{title}</p>
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