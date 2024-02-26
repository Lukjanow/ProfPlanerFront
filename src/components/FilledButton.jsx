import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";

export function FilledButton({ text, icon, showIcon }) {
  return (
    <Button color="primary">
      {showIcon && (
        <FontAwesomeIcon className={"text-xl"} icon={icon} radius={"sm"} />
      )}
      <p className="font-poppins font-normal">{text}</p>
    </Button>
  );
}
