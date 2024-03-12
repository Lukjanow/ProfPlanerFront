import React, { useState, useEffect, useRef } from "react";
import { Button, Divider, Input } from "@nextui-org/react";
import { getAllNotes, addNote, deleteNote } from "../services/noteService";
import NoteItem from "./NoteItem";
import { FilledButton } from "./FilledButton";
import { useTranslation } from "react-i18next";

const NotesContainer = () => {
  const [todos, setTodos] = useState([]); // Zustand für die To-Do-Liste
  const [newTodo, setNewTodo] = useState(""); // Zustand für das neue To-Do
  const scrollContainerRef = useRef(null); // Ref für den Scroll-Container
  const { t } = useTranslation();

  // Funktion zum Abrufen von To-Dos
  const fetchTodos = async () => {
    try {
      const response = await getAllNotes(); // Alle Notizen vom Backend abrufen
      setTodos(response.data); // Notizen im Zustand speichern
      scrollToBottom(); // Ans Ende des Scroll-Containers scrollen
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Effekt, um die To-Dos beim Laden der Komponente abzurufen
  useEffect(() => {
    fetchTodos();
  }, []);

  // Funktion zum Hinzufügen eines neuen To-Dos
  const addTodo = async () => {
    if (newTodo.trim() !== "") {
      try {
        const response = await addNote({ text: newTodo }); // Neue Notiz zum Backend hinzufügen
        setNewTodo(""); // Das Eingabefeld zurücksetzen
        fetchTodos(); // Aktualisierte Notizen abrufen
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  // Funktion zum Löschen einer Notiz
  const deleteTodo = async (id) => {
    try {
      await deleteNote(id); // Notiz vom Backend löschen
      fetchTodos(); // Aktualisierte Notizen abrufen
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Funktion zum Scrollen ans Ende des Containers
  const scrollToBottom = () => {
    const container = scrollContainerRef.current;
    container.scrollTop = container.scrollHeight - container.clientHeight;
  };

  // Event-Handler für das Drücken der Eingabetaste im Textfeld
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="flex flex-col fixed top-[65px] bottom-[85px] right-0 w-auto bg-slate-600 overflow-y-auto p-4">
      <div className="flex flex-col flex-2 text-white">
        <h1 className="font-bold md:text-3xl text-1xl">{t("yourNotes")}</h1>
        <p className="font-normal">{t("neverForget")}</p>
      </div>

      <div
        className="flex-1 overflow-scroll"
        ref={scrollContainerRef}
        style={{ maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}
      >
        {todos.map((todo) => (
          <NoteItem
            key={todo._id}
            text={todo.text}
            onDelete={() => deleteTodo(todo._id)}
          />
        ))}
      </div>
      <Divider />
      <div className="h-[80px]">
        <div className="flex mt-4">
          <Input
            type="email"
            label={t("newToDos")}
            radius="none"
            variant="bordered"
            className="max-w-xs text-white"
            value={newTodo}
            onChange={(e) => {
              setNewTodo(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            endContent={
              <FilledButton
                text={t("Add")}
                color="primary"
                onClick={() => addTodo()}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default NotesContainer;
