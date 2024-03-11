import { NoteModel } from "../models/notesModel.js";
import api from "./api.js";

async function getAllNotes() {
  return api.get("/notes").then((resObj) => {
    return {
      data: resObj.data.map((item) => new NoteModel().setJsonObj(item)),
      status: resObj.status,
    };
  });
}

async function getNoteById(id) {
  return api.get(`/notes/${id}`).then((resObj) => {
    return {
      data: new NoteModel().setJsonObj(resObj.data),
      status: resObj.status,
    };
  });
}

async function addNote(noteModel) {
  return api.post("/notes", noteModel).then((resObj) => {
    return {
      data: resObj.data,
      status: resObj.status,
    };
  });
}

async function deleteNote(id) {
  return api.delete(`/notes/${id}`).then((resObj) => {
    return {
      data: resObj.data,
      status: resObj.status,
    };
  });
}

export { getAllNotes, getNoteById, addNote, deleteNote };
