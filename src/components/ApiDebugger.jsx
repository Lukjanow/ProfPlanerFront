import {Card, CardBody, CardHeader, CircularProgress, Code, Divider} from "@nextui-org/react";
import useDataFetcher from "../hooks/useDataFetcher.js";
import {useModuleStore} from "../stores/moduleStore.js";

export function ApiDebugger() {
    const {data: moduleList, isLoading: moduleListIsLoading, error: moduleListError} = useDataFetcher(async () => {
        await useModuleStore.getState().initModuleList();
        return useModuleStore.getState().moduleList;
    });

    const {data: module, isLoading: moduleIsLoading, error: moduleError} = useDataFetcher(async () => {
        return useModuleStore.getState().getModuleById(111);
    });

    console.log(moduleList);

    return (
        <>
            {moduleListIsLoading && moduleIsLoading && <CircularProgress aria-label="Loading..." />}

            <div className="flex flex-col">
                {moduleListError && <Code color="danger">Error: {moduleListError.toString()}</Code>}
                {moduleError && <Code color="danger">Error: {moduleError.toString()}</Code>}
            </div>

            {module && <p>Module {module.id}: {module.name}</p>}

            <Divider />

            {moduleList && moduleList.map(module => (
                <Card key={module.id}>
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p className="text-md">{module.name}</p>
                            <p className="text-small text-default-500">{module.id}</p>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <p>id: {module.id}</p>
                        <p>name: {module.name}</p>
                        <p>dozent: {module.dozent[0].name} | {module.dozent[0].e_mail}</p>
                        {module && module.room && <p>room: {module.room.name}</p>}
                        {module && module.studySemester && <p>studySemester: {module.studySemester[0].name}</p>}
                        <p>duration: {module.duration}</p>
                        <p>approximateAttendance: {module.approximateAttendance}</p>
                        <p>need: {module.need}</p>
                        <p>type: {module.type}</p>
                        <p>frequency: {module.frequency}</p>
                        <p>selected: {module.selected ? "true" : "false"}</p>
                    </CardBody>
                </Card>
            ))}
        </>
    );
}
