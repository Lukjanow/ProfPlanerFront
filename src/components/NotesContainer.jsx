import React, { useState, useEffect, useRef } from "react";
import { Button, Input, ScrollShadow } from "@nextui-org/react";
import { getAllNotes, addNote, deleteNote } from "../services/noteService";
import NoteItem from "./NoteItem";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
    //<div className="flex flex-col fixed top-[65px] bottom-[85px] right-0 w-auto bg-slate-600 overflow-y-auto p-4">
    <div className={"p-3 flex flex-col gap-5 w-[350px] min-h-"}>
      <div className="flex flex-col flex-2">
        <h1 className="font-bold md:text-3xl text-1xl">{t("yourNotes")}</h1>
        <p className="font-normal">{t("neverForget")}</p>
      </div>
      <ScrollShadow
        className="w-full flex-1 overflow-x-visible overflow-y-scroll"
        ref={scrollContainerRef}
        style={{ maxHeight: "calc(100vh - 350px)", minHeight: "calc(100vh - 350px)" }}
      >
        {todos.map((todo) => (
          <NoteItem
            key={todo._id}
            text={todo.text}
            onDelete={() => deleteTodo(todo._id)}
          />
        ))}
      </ScrollShadow>
      {/* <Divider /> */}
      <div>
        <Input
          type="text"
          radius="sm"
          size={"sm"}
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          placeholder={t("newToDos")}
          endContent={
            <Button
              isIconOnly
              size={"sm"}
              radius={"sm"}
              text={t("Add")}
              color={"none"}
              onClick={() => addTodo()}
            >
              <FontAwesomeIcon className={"text-lg"} icon={"paper-plane"} />
            </Button>
          }
        />
      </div>
    </div>
    //</div>
  );
};

export default NotesContainer;
