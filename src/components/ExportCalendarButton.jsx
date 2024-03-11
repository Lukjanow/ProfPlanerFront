import {Button} from "@nextui-org/react";
import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";

export function ExportCalendarButton() {

    function handleExport(fileName) {

        const calendar = document.querySelector('.rbc-calendar');
        const calendarCopy = calendar.cloneNode(true);
        calendarCopy.style.height = `${calendar.offsetHeight * 2}px`;

        const hiddenElements = calendarCopy.querySelectorAll(".hidden");
        hiddenElements.forEach(element => {
            element.classList.remove("hidden");
        });

        const content = calendarCopy.querySelector(".rbc-time-content");
        content.style.overflow = "inherit";

        const parentElement = calendar.parentElement;
        parentElement.appendChild(calendarCopy);

        domtoimage.toPng(calendarCopy)
            .then(dataUrl => {
                const pdf = new jsPDF('l', 'mm');

                pdf.addImage(dataUrl, 'PNG', 15, 15, 270, 0);
                pdf.save(`${fileName}.pdf`);

                parentElement.removeChild(calendarCopy);

            })
            .catch(function (error) {
                console.error('Error exporting calendar:', error);
            });
    }

    return (
        <>
            <Button onClick={() => handleExport("calendar")}>Export as PDF</Button>
        </>
    );
}