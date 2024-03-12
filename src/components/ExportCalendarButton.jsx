import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import {useState} from "react";
import {useTimeTableFilterStore} from "../stores/timeTableFilterStore.js";
import {printValidFileName} from "../utils/stringUtils.js";
import {useTranslation} from "react-i18next";
import {FilledButton} from "./FilledButton.jsx";

export function ExportCalendarButton() {
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const filteredValue = useTimeTableFilterStore(state => state.filteredValue);
    const filteredType = useTimeTableFilterStore(state => state.filteredType);
    const currentCalendar = useTimeTableFilterStore(state => state.currentCalendar);

    let timetable = null;
    let timetableClone = null;

    function getFileName() {
        const timetableName = currentCalendar ? currentCalendar.name : "";
        return filteredValue
            ? `timetable-${printValidFileName(timetableName)}-${printValidFileName(filteredValue)}`
            : `timetable-${printValidFileName(timetableName)}`;
    }

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

    function handleExport() {
        const fileName = getFileName();

        setIsLoading(true);
        timetable = document.querySelector('.rbc-calendar');
        timetableClone = timetable.cloneNode(true);
        const timetableHeight = timetable.offsetHeight;
        const timetableWidth = 1340;
        timetableClone.style.height = `${timetableHeight}px`;
        timetableClone.style.width = `${timetableWidth}px`;

        showHiddenElements();

        switch (filteredType) {
            case "dozent":
                hideDetailDozents();
                break;
            case "room":
                hideDetailRooms();
                break;
            case "study_semester":
                hideDetailSemester();
                break;
            default:
                break;
        }

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
            <FilledButton text={t("exportAsPDF")} icon="fas fa-file-pdf" showIcon isLoading={isLoading} onClick={() => handleExport()} />
        </>
    );
}