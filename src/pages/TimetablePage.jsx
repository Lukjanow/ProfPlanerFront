import {useLoaderData} from "react-router-dom";

export async function loader({params}) {
    return {
        params
    };
}

export default function TimetablePage() {
    const {params} = useLoaderData();
    return (
        <div id="timetable-page">
            <h1>Timetable Page {params.id}</h1>
        </div>
    );
}
