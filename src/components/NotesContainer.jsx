import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";

const NotesContainer = () => {
  const [todos, setTodos] = useState([]); // Zustand für die To-Do-Liste
  const [newTodo, setNewTodo] = useState(""); // Zustand für das neue To-Do

  // Funktion zum Abrufen von To-Dos (in diesem Beispiel werden Fake-Daten verwendet)
  const fetchTodos = () => {
    // Hier können Sie die Logik zum Abrufen von To-Dos implementieren
    // Zum Beispiel: fetchTodosFromServer() oder ähnliches
    // Für dieses Beispiel verwenden wir statische Fake-Daten
    const fakeTodos = [
      "To-Do 1",
      "To-Do 2",
      "To-Do 3",

    ];
    setTodos(fakeTodos);
  };

  // Effekt, um die To-Dos beim Laden der Komponente abzurufen
  useEffect(() => {
    fetchTodos();
  }, []);

  // Funktion zum Hinzufügen eines neuen To-Dos
  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, newTodo]);
      setNewTodo(""); // Das Eingabefeld zurücksetzen
    }
  };

  // Event-Handler für das Drücken der Eingabetaste im Textfeld
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
      console.log("You Pressed Enter, hier is your ToDoList: ", todos);
    }
  };

  return (
    <div className="flex flex-col fixed top-[65px] bottom-[85px] right-0 w-auto bg-slate-700 overflow-y-auto p-4">
      <div className="bg-danger h-[40px]"></div>

      <div className="bg-warning flex-1 overflow-scroll">
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
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

      {/* 
      <div className="flex flex-col ">
        <h2 className="text-white text-lg font-bold mb-4">To-Do List</h2>

        <ul className="text-white h-full">
          {todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>

        <div className="flex mt-4">
          <Input
            type="email"
            label="Neue ToDo"
            variant="bordered"
            className="max-w-xs text-white"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
          */}
    </div>
  );
};

export default NotesContainer;
