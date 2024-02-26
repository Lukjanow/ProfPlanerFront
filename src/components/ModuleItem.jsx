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
      <div className="border-1 border-s-8 w-max rounded-e-md p-3" style={moduleStyle}>
        <p className="font-semibold">
          {start.getHours()}:
          {fixZeros(start.getMinutes())} -{" "}
          {end.getHours()}:
          {fixZeros(end.getMinutes())} Uhr
        </p>
        <p className="font-semibold">{title}</p>
        <div className="mt-3 grid grid-rows-3 grid-flow-col">
          <div>
            <FontAwesomeIcon icon="fa-solid fa-graduation-cap" />
          </div>
          <div>
            <FontAwesomeIcon icon="fa-solid fa-user" />
          </div>
          <div>
            <FontAwesomeIcon icon="fa-solid fa-location-dot" />
          </div>
          <div className="ml-2">{studySemester}</div>
          <div className="ml-2">{dozent}</div>
          <div className="ml-2">{room}</div>
        </div>
      </div>
  );
}