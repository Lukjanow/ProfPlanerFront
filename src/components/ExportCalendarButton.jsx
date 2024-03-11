import {Button} from "@nextui-org/react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";

export function ExportCalendarButton() {

    function handleExport(fileName) {

        const calendar = document.querySelector('.rbc-calendar');
        const calendarCopy = calendar.cloneNode(true);
        const calendarHeight = calendar.offsetHeight * 2;
        calendarCopy.style.height = `${calendarHeight}px`;

        const hiddenElements = calendarCopy.querySelectorAll(".hidden");
        hiddenElements.forEach(element => {
            element.classList.remove("hidden");
        });

        const content = calendarCopy.querySelector(".rbc-time-content");
        content.style.overflow = "inherit";

        const parentElement = calendar.parentElement;
        parentElement.appendChild(calendarCopy);

        // domtoimage.toPng(calendarCopy)
        //     .then(dataUrl => {
        //         const pdf = new jsPDF('l', 'mm');
        //
        //         pdf.addImage(dataUrl, 'PNG', 15, 15, 270, 0);
        //         pdf.save(`${fileName}.pdf`);
        //
        //         parentElement.removeChild(calendarCopy);
        //
        //     })
        //     .catch(function (error) {
        //         console.error('Error exporting calendar:', error);
        //     });






        domtoimage.toPng(calendarCopy)
            .then(dataUrl => {
                const pdf = new jsPDF('l', 'mm');
                const adjustedImageHeight = 500;
                const totalPages = Math.ceil(adjustedImageHeight / pdf.internal.pageSize.height);

                for (let page = 1; page <= totalPages; page++) {
                    const yOffset = (page - 1) * pdf.internal.pageSize.height;
                    if (page > 1) {
                        pdf.addPage();
                    }
                    pdf.addImage(dataUrl, 'PNG', 15, 15 - yOffset, 270, adjustedImageHeight);
                }

                pdf.save(`${fileName}.pdf`);
                parentElement.removeChild(calendarCopy);

            })
            .catch(function (error) {
                console.error('Error exporting calendar:', error);
            });










        // domtoimage.toPng(calendarCopy)
        //     .then(dataUrl => {
        //
        //         const pdf = new jsPDF('l', 'mm');
        //
        //         const imgData = dataUrl;
        //         const imgWidth = 210;
        //         const pageHeight = 295;
        //         const imgHeight = calendar.offsetHeight * imgWidth / calendar.offsetWidth;
        //         let heightLeft = imgHeight;
        //
        //         let position = 15;
        //
        //         pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        //         heightLeft -= pageHeight;
        //
        //         while (heightLeft >= 0) {
        //             position += heightLeft - imgHeight;
        //             pdf.addPage();
        //             pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        //             heightLeft -= pageHeight;
        //         }
        //
        //         pdf.save(`${fileName}.pdf`);
        //
        //         parentElement.removeChild(calendarCopy);
        //
        //     })
        //     .catch(function (error) {
        //         console.error('Error exporting calendar:', error);
        //     });

        // pdf.html(calendarHTML, {
        //     callback: doc => {
        //         doc.addImage(calendarHTML)
        //         doc.save(`${fileName}.pdf`);
        //     },
        //     x: 15,
        //     y: 15,
        //     width: 270,
        //     windowWidth: 1340,
        // });
    }

    return (
        <>
            <Button onClick={() => handleExport("calendar")}>Export as PDF</Button>
        </>
    );
}