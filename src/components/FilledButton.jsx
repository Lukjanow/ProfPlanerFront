import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";

export function FilledButton({ text, icon, showIcon, onClick }) {
  return (
    <Button color="primary" radius={"sm"} onClick={onClick}>
      {showIcon && <FontAwesomeIcon className={"text-xl"} icon={icon} />}
      <p className="font-poppins font-normal">{text}</p>
    </Button>
  );
}
