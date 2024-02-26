import moment from "moment";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function BasicDataButton() {
  return (
    <Button color="primary">
      <FontAwesomeIcon className={"text-xl"} icon={"plus"} radius={"sm"} />
      <p className="font-poppins font-normal">Neues Modul</p>
    </Button>
  );
}

