import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function FilledButton() {
  return (
    <Button color="primary">
      <FontAwesomeIcon className={"text-xl"} icon={"plus"} radius={"sm"} />
      <p className="font-poppins font-normal">Neues Modul</p>
    </Button>
  );
}
