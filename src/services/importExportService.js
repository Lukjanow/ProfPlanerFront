// TODO: add import and export routes
import api from "./api.js";

async function getExportData() {
    return api
        .get(`/export/excel/basicdata/`, { responseType: 'blob' }) 
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            const tmp = new Date()
            const date = tmp.toLocaleDateString('de-DE').replaceAll(".","-")
            const time = tmp.getHours() + "-" + tmp.getMinutes() + "-" + tmp.getSeconds();
    
            const filename = date + "_" + time + "_basicdata"

            link.setAttribute('download', filename + ".xlsx"); 
            document.body.appendChild(link);
            link.click();
            link.remove();
            return {
                status: response.status
            };
        })
        .catch(error => {
            console.error('Error while downloading data:', error);
            throw error;
        });
}

async function importData(file) {
    const formData = new FormData();
    formData.append('file', file);
    return api
        .post(`/import/excel/basicdata/replace/`, formData)
        .then(resObj => {
            return {
                data: resObj.data,
                status: resObj.status
            }
        });
}


export {
    getExportData,
    importData
}