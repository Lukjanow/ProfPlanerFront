import {create} from "zustand";
import {
    addStudySemester, deleteStudySemester,
    getAllStudySemesters,
    getStudySemesterById,
    updateStudySemester
} from "../services/studySemesterService.js";

export const useStudySemesterStore = create(
    (set, get) => ({
        studySemesterList: [],
        initStudySemesterList: async () => {
            const oldStudySemesterList = get().studySemesterList;
            const {data} = await getAllStudySemesters();
            const updatedStudySemesterList = data.map(newStudySemester => {
                const oldStudySemester = oldStudySemesterList.find(s => s.id === newStudySemester.id);
                return newStudySemester ? newStudySemester : oldStudySemester;
            });
            set(() => ({studySemesterList: updatedStudySemesterList}));
        },
        getStudySemesterById: async (id) => {
            const {data} = await getStudySemesterById(id);
            return data;
        },
        addStudySemester: async (studySemesterModel) => {
            const {data} = await addStudySemester(studySemesterModel);
            return data;
        },
        updateStudySemester: async (id, {name, study, content}) => {
            const {data} = await updateStudySemester(id, {name, study, content});
            return data;
        },
        deleteStudySemester: async (id) => {
            const {data} = await deleteStudySemester(id);
            return data;
        },
    }),
    {
        name: "studySemesterStore"
    }
);
