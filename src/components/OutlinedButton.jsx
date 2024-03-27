import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";

export function OutlinedButton({ text, icon, showIcon, color, onClick }) {
  return (
    <Button color={color} variant="bordered" radius={"sm"} onClick={onClick}>
      {showIcon && <FontAwesomeIcon className={"text-xl"} icon={icon} />}
      <p className="font-poppins font-normal">{text}</p>
    </Button>
  );
}
