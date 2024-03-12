import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";

export function FilledButton({ text, icon, showIcon, onClick, isLoading, color = "primary" }) {
  return (
    <Button type="submit" isLoading={isLoading} color={color} radius={"sm"} onClick={onClick}>
      {!isLoading && showIcon && <FontAwesomeIcon className={"text-xl"} icon={icon} />}
      <p className="font-poppins font-normal">{text}</p>
    </Button>
  );
}
