import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ModuleItem({ moduleItemData, dragEvent, shortDisplay = false }) {
  const {
    name,
    study_semester_string,
    study_semester_string_short,
    dozent_string,
    dozent_string_short,
    room_string,
    room_string_short,
    backgroundcolor,
    bordercolor,
    visible,
  } = moduleItemData;

  const moduleStyle = {
    backgroundColor: backgroundcolor,
    borderColor: bordercolor,
  };



  //`border-1 border-s-8 w-max border-[${bordercolor}] bg-[${backgroundcolor}] rounded-e-md p-3`}{
  return (
    < div hidden={!visible} className="text-[#444444] border-1 border-s-8 rounded-e-md p-3 h-full flex flex-col gap-2 cursor-pointer" style={moduleStyle} draggable onDragStart={() => dragEvent(moduleItemData)}>
      <div>
        <p className="font-bold text-xs">{name}</p>
      </div>
      <div className="flex flex-col gap-[3px] text-xs">
        <div className="flex gap-1 items-center detail-semester">
          <FontAwesomeIcon className={"w-[15px]"} icon="graduation-cap" />
            <span>{shortDisplay
              ? study_semester_string_short
              : study_semester_string
            }</span>
        </div>
        <div className="flex gap-1 items-center detail-dozent">
          <FontAwesomeIcon className={"w-[15px]"} icon="user"/>
          <span>{shortDisplay
              ? dozent_string_short
              : dozent_string
          }</span>
        </div>
        <div className="flex gap-1 items-center detail-room">
          <FontAwesomeIcon className={"w-[15px]"} icon="location-dot"/>
          <span>{shortDisplay
              ? room_string_short
              : room_string
          }</span>
        </div>
      </div>
    </div>
  );
}
