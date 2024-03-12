import {Button} from "@nextui-org/react";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";

export function ExportCalendarButton() {

    function handleExport(fileName) {
        const calendar = document.querySelector('.rbc-calendar');
        const calendarCopy = calendar.cloneNode(true);
        const calendarHeight = calendar.offsetHeight;
        const calendarWidth = calendar.offsetWidth;
        calendarCopy.style.height = `${calendarHeight}px`;

        const hiddenElements = calendarCopy.querySelectorAll(".hidden");
        hiddenElements.forEach(element => {
            element.classList.remove("hidden");
        });

        const content = calendarCopy.querySelector(".rbc-time-content");
        content.style.overflow = "inherit";

        const parentElement = calendar.parentElement;
        parentElement.appendChild(calendarCopy);

        domtoimage.toJpeg(calendarCopy)
            .then(dataUrl => {
                const pdf = new jsPDF('p', 'mm');
                const pageWidth = pdf.internal.pageSize.width;
                const pageHeight = pdf.internal.pageSize.height;

                const img = new Image();
                img.src = dataUrl;
                const imgWidth = calendarWidth;
                const imgHeight = calendarHeight;
                const aspectRatio = imgWidth / imgHeight;

                let scaledWidth, scaledHeight;
                if (aspectRatio > 1) {
                    scaledWidth = pageWidth;
                    scaledHeight = pageWidth / aspectRatio;
                } else {
                    scaledHeight = pageHeight;
                    scaledWidth = pageHeight * aspectRatio;
                }

                pdf.addImage(dataUrl, 'JPEG', 0, 0, scaledWidth, scaledHeight);
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