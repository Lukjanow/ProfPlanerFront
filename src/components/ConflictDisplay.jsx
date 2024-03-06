import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

export function ConflictDisplay(data) {
    const conflict_list = data.data;
    const list = conflict_list;
    const [cardStates, setCardStates] = useState([]);

    useEffect(() => {
      const newCardStates = [...cardStates];
      newCardStates.push("secondary");
      setCardStates(newCardStates);
    }, [list.length]);


    return (
        <div className="gap-4 grid grid-cols-10 sm:grid-cols-5">
            {list.map((item, index) => (
                <Card shadow="sm" key={index} isPressable onPress={() => {
                    const newCardStates = [...cardStates];
                    // Umschalten der Farbe zwischen "white" und "secondary."
                    newCardStates[item.id] = cardStates[item.id] === "white" ? "secondary" : "white";
                    setCardStates(newCardStates);
                }}
                >
                    <CardFooter className={`text-small justify-between grid grid-rows-2 h-full bg-${
                      cardStates[item.id] === "white"
                        ? "white"
                        : "secondary"
                    }`}>

                        <b>{item.error_message}</b>
                        <b className="font-normal">{item.module_string}</b>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
