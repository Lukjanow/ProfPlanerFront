import useDataFetcher from "../hooks/useDataFetcher.js";
import {useEffect} from "react";
import {useModuleStore} from "../stores/moduleStore.js";
import {Button, Card, CardBody, CardHeader, CircularProgress, Code, Divider, Spacer} from "@nextui-org/react";
import {useDozentStore} from "../stores/dozentStore.js";
import {useRoomStore} from "../stores/roomStore.js";
import {RoomModel} from "../models/roomModel.js";
// import {useCalendarStore} from "../stores/calendarStore.js";
// import {getCalendarById} from "../services/calendarService.js";

export default function ApiDebugger() {

    const {
        data: moduleList,
        isLoading: moduleListIsLoading,
        error: moduleListError,
        executor: moduleListExecutor
    } = useDataFetcher(async () => {
        await useModuleStore.getState().initModuleList();
        return useModuleStore.getState().moduleList;
    });

    const {
        data: dozent,
        isLoading: dozentIsLoading,
        error: dozentError,
        executor: dozentExecutor
    } = useDataFetcher(async () => {
        return useDozentStore.getState().getDozentById("65d706915c208e7fd4abebab");
    });

    const {
        data: room,
        isLoading: roomIsLoading,
        error: roomError,
        executor: roomExecutor,
    } = useDataFetcher(async () => {
        return useRoomStore.getState().addRoom(new RoomModel("N144", 5, 2));
    });

    // const {
    //     data: res,
    //     isLoading: resIsLoading,
    //     error: resError,
    //     executor: resExecutor
    // } = useDataFetcher(async () => {
    //     return useCalendarStore.getState().getCalendarById("65d61765c15324dcfc497c4f");
    //     // return useModuleStore.getState().addModule(new ModuleModel(
    //     //     "112",
    //     //     "TEST",
    //     //     "EINF",
    //     //     ["65d706915c208e7fd4abebab"],
    //     //     "65d854c3dfc97c0356792f8e",
    //     //     ["65d71bdb8c4eb66943f53f14"],
    //     //     90,
    //     //     100,
    //     //     1,
    //     //     [1],
    //     //     3,
    //     //     false,
    //     //     "#ff0000",
    //     //     "Das ist eine Notiz",
    //     //     2
    //     // ));
    // });

    useEffect(() => {
        dozentExecutor();
        moduleListExecutor();
        // resExecutor();
    }, []);

    // console.log(res);

    return (
        <>



            {/*SHOW PROGRESS WHEN DATA IS LOADING*/}

            {(moduleListIsLoading || dozentIsLoading || roomIsLoading) &&
                <CircularProgress className="absolute top-1/2 left-1/2" color="success" aria-label="Loading..."/>}











            {/*{PRINT ERRORS}*/}

            <div className="flex flex-col">
                {moduleListError && <Code color="danger">Error: {moduleListError.toString()}</Code>}
                {dozentError && <Code color="danger">Error: {dozentError.toString()}</Code>}
                {roomError && <Code color="danger">Error: {roomError.toString()}</Code>}
            </div>








            {/*CREATE ROOM BUTTON*/}

            <Button onClick={roomExecutor}>Create room</Button>
            {room && <p>Room: {room._id}</p>}












            {/*SPACE BETWEEN CREATE ROOM BUTTON AND DOZENT*/}

            <Spacer y={4}/>
            <Divider/>
            <Spacer y={4}/>











            {/*DOZENT*/}

            {dozent &&
                <Card key={dozent._id}>
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p className="text-md">{dozent.name}</p>
                            <p className="text-small text-default-500">_id: {dozent._id}</p>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <p>_id: {dozent._id}</p>
                        <p>name: {dozent.name}</p>
                        <p>e_mail: {dozent.e_mail}</p>
                        <p>title: {dozent.title}</p>
                        <p>intern: {dozent.intern ? "true" : "false"}</p>
                    </CardBody>
                </Card>
            }










            {/*SPACE BETWEEN DOZENT AND MODULE-LIST*/}

            <Spacer y={4}/>
            <Divider/>
            <Spacer y={4}/>














            {/*MODULE-LIST*/}

            {moduleList && moduleList.map(module => (
                <Card key={module._id + module.type}>
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p className="text-md">{module.name}</p>
                            <p className="text-small text-default-500">_id: {module._id}</p>
                            <p className="text-small text-default-500">key: {module._id + module.type}</p>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <p>_id: {module._id}</p>
                        <p>name: {module.name}</p>
                        <p>code: {module.code}</p>
                        <p>dozent: {module.dozent[0].name} | {module.dozent[0].e_mail}</p>
                        {module && module.room && <p>room: {module.room.name}</p>}
                        {module && module.study_semester && <p>study_semester: {module.study_semester[0].name}</p>}
                        <p>duration: {module.duration}</p>
                        <p>approximate_attendance: {module.approximate_attendance}</p>
                        <p>need: {module.need === null ? "null" : module.need}</p>
                        <p>type: {module.type}</p>
                        <p>frequency: {module.frequency}</p>
                        <p>selected: {module.selected ? "true" : "false"}</p>
                        <p>color: {module.color === null ? "null" : module.color}</p>
                        <p>note: {module.note === null ? "null" : module.note}</p>
                        <p>groups: {module.groups === null ? "null" : module.groups}</p>
                    </CardBody>
                </Card>
            ))}
        </>
    );
}
