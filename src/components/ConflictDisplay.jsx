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

    //const [clickedCardIds, setClickedCardIds] = useState([]);

    //Gemini baut die Funktion ein aber nutzt Sie nicht?? vllt nützlich später?
    // const handleClick = (index) => {
    //   const newCardStates = [...cardStates];
    //   newCardStates[index] = "white";
    //   setCardStates(newCardStates);

    //   // Neue ID hinzufügen, wenn noch nicht vorhanden
    //   if (!clickedCardIds.includes(item.id)) {
    //     setClickedCardIds([...clickedCardIds, item.id]);
    //   }
    // };


    return (
        <div className="gap-4 grid grid-cols-10 sm:grid-cols-5">
            {list.map((item, index) => (
                <Card shadow="sm" key={index} isPressable onPress={() => {
                    const newCardStates = [...cardStates];
                    // Umschalten der Farbe zwischen "white" und "secondary"
                    newCardStates[index] = cardStates[index] === "white" ? "secondary" : "white";
                    setCardStates(newCardStates);
                }}
                >
                    <CardFooter className={`text-small justify-between h-full bg-${
                      cardStates[index] === "white" //|| clickedCardIds.includes(item.id)
                        ? "white"
                        : "secondary"
                    }`}>

                        <b>{item.error_message}</b>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
