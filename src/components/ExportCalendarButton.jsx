import {Button} from "@nextui-org/react";
import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";

export function ExportCalendarButton() {

    function handleExport(fileName) {

        const calendar = document.querySelector('.rbc-calendar');
        const calendarCopy = calendar.cloneNode(true);

        const calendarElements = calendarCopy.querySelectorAll(".rbc-day-slot.rbc-time-column, .rbc-time-gutter.rbc-time-column");
        calendarElements.forEach(element => {
            element.style.height = "2000px";
        });

        const contentElements = calendarCopy.querySelectorAll(".rbc-time-content");
        contentElements.forEach(element => {
            element.style.overflow = "inherit";
        });

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


        // domtoimage.toPng(calendar)
        //     .then(dataUrl => {
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

        // html2canvas(calendarHTML, {
        //     allowTaint: true,
        //     width: HTML_Width,
        //     height: HTML_Height,
        //     windowWidth: HTML_Width,
        //     windowHeight: HTML_Height
        // })
        //     .then(canvas => {
        //         canvas.getContext('2d');
        //
        //         const imgData = canvas.toDataURL("image/jpeg", 1.0);
        //         pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, HTML_Width, HTML_Height);
        //
        //         // for (let i = 1; i <= totalPDFPages; i++) {
        //         //     pdf.addPage(PDF_Width, PDF_Height);
        //         //     pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
        //         // }
        //
        //         pdf.save(`${fileName}.pdf`);
        //     });
    }

    return (
        <>
            <Button onClick={() => handleExport("calendar")}>Export as PDF</Button>
        </>
    );
}