import {Button} from "@nextui-org/react";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import {useState} from "react";

export function ExportCalendarButton() {
    const [isLoading, setIsLoading] = useState(false);

    let timetable = null;
    let timetableClone = null;

    function hideDetailSemester() {
        const detailSemesters = timetableClone.querySelectorAll(".detail-semester");
        detailSemesters.forEach(element => {
            element.remove();
        });
    }

    function hideDetailDozents() {
        const detailDozents = timetableClone.querySelectorAll(".detail-dozent");
        detailDozents.forEach(element => {
            element.remove();
        });
    }

    function hideDetailRooms() {
        const detailRooms = timetableClone.querySelectorAll(".detail-room");
        detailRooms.forEach(element => {
            element.remove();
        });
    }

    function showHiddenElements() {
        const hiddenElements = timetableClone.querySelectorAll(".hidden");
        hiddenElements.forEach(element => {
            element.classList.remove("hidden");
        });
    }

    function handleExport(fileName) {
        setIsLoading(true);
        timetable = document.querySelector('.rbc-calendar');
        timetableClone = timetable.cloneNode(true);
        const timetableHeight = timetable.offsetHeight;
        const timetableWidth = 1340;
        timetableClone.style.height = `${timetableHeight}px`;
        timetableClone.style.width = `${timetableWidth}px`;

        showHiddenElements();




        const content = timetableClone.querySelector(".rbc-time-content");
        content.style.overflow = "inherit";

        const parentElement = timetable.parentElement;
        parentElement.appendChild(timetableClone);

        domtoimage.toJpeg(timetableClone)
            .then(dataUrl => {
                const pdf = new jsPDF('p', 'mm');
                const pageWidth = pdf.internal.pageSize.width;
                const pageHeight = pdf.internal.pageSize.height;
                const aspectRatio = timetableWidth / timetableHeight;

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

                parentElement.removeChild(timetableClone);
                setIsLoading(false);

            })
            .catch(function (error) {
                console.error('Error exporting timetable:', error);
            });
    }

    return (
        <>
            <Button isLoading={isLoading} onClick={() => handleExport("timetable")}>Export as PDF</Button>
        </>
    );
}