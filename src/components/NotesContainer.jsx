import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { getAllNotes, addNote, deleteNote } from "../services/noteService";
import NoteItem from "./NoteItem";

const NotesContainer = () => {
  const [todos, setTodos] = useState([]); // Zustand für die To-Do-Liste
  const [newTodo, setNewTodo] = useState(""); // Zustand für das neue To-Do

  // Funktion zum Abrufen von To-Dos
  const fetchTodos = async () => {
    try {
      const response = await getAllNotes(); // Alle Notizen vom Backend abrufen
      setTodos(response.data); // Notizen im Zustand speichern
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

  // Event-Handler für das Drücken der Eingabetaste im Textfeld
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="flex flex-col fixed top-[65px] bottom-[85px] right-0 w-auto bg-slate-600 overflow-y-auto p-4">
      <div className="flex flex-col flex-2 text-white">
        <h1 className="font-bold md:text-3xl text-1xl">Deine Notizen</h1>
        <p className="font-normal">Damit du nichts vergisst.</p>
      </div>

      <div className="flex-1 overflow-scroll">
        {todos.map((todo) => (
          <NoteItem
            key={todo._id}
            text={todo.text}
            onDelete={() => deleteTodo(todo._id)}
          />
        ))}
      </div>

      <div className="bg-success h-[80px]">
        <div className="flex mt-4">
          <Input
            type="email"
            label="Neue ToDo"
            variant="bordered"
            className="max-w-xs text-white"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesContainer;
