import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export function ModuleItem({ moduleItemData }) {  
    const {
      title,
      start,
      end,
      studySemester,
      dozent,
      room,
      backgroundcolor,
      bordercolor,
      hideTime,
    } = moduleItemData;

    const moduleStyle = {
      backgroundColor: backgroundcolor,
      borderColor: bordercolor,
    };


  function fixZeros(num) {
    return (num < 10 ? "0" : "") + num;
  }
  //`border-1 border-s-8 w-max border-[${bordercolor}] bg-[${backgroundcolor}] rounded-e-md p-3`}{
  return (
      <div id="ModuleItem" className="border-1 border-s-8 w-[300px] rounded-e-md p-3" style={moduleStyle}>
        <p className="font-semibold" hidden={moduleItemData.hideTime}>
          {start.getHours()}:
          {fixZeros(start.getMinutes())} -{" "}
          {end.getHours()}:
          {fixZeros(end.getMinutes())} Uhr
        </p>
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
        {/* <div className="mt-3 grid grid-rows-3 grid-flow-col">
          <div>
            <FontAwesomeIcon icon="fa-solid fa-graduation-cap" />
          </div>
          <div>
            <FontAwesomeIcon icon="fa-solid fa-user" />
          </div>
          <div>
            <FontAwesomeIcon icon="fa-solid fa-location-dot" />
          </div>
          <div className="ml-2">{dozent}</div>
          <div className="ml-2">{room}</div>
          <div className="ml-2">{studySemester}</div>
        </div> */}
      </div>
  );
}