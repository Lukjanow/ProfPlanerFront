import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";

export function FilledButton({ text, icon, showIcon, onClick, color = "primary", size = "md", isDisabled = false, isLoading = false }) {
  return (
    <Button type="submit" color={color} radius={"sm"} onClick={onClick} size={size} isDisabled={isDisabled} isLoading={isLoading}>
      {!isLoading && showIcon && <FontAwesomeIcon className={"text-xl"} icon={icon} />}
      <p className="font-poppins font-normal">{text}</p>
    </Button>
  );
}
