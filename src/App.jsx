import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import styled from "@emotion/styled";
import { AddInput } from "./components/AddInput";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Header } from "./components/Header";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 400,
});

/**
 * This is the initial todo state.
 * Instead of loading this data on every reload,
 * we should save the todo state to local storage,
 * and restore on page load. This will give us
 * persistent storage.
 */
const initialData = [
  {
    id: uuid(),
    label: "Buy groceries",
    checked: false,
  },
  {
    id: uuid(),
    label: "Reboot computer",
    checked: false,
  },
  {
    id: uuid(),
    label: "Ace CoderPad interview",
    checked: false,
  },
];

function App() {
  const [todos, setTodos] = useState(() => {
    let savedTodos = localStorage.getItem("savedTodosList");
    return savedTodos ? JSON.parse(savedTodos) : initialData;
  });
  const getFormattedDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const currentDate = new Date();
  const formattedDate = getFormattedDate(currentDate);

  const getFormattedTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  const currentTime = new Date();
  const formattedTime = getFormattedTime(currentTime);
  const timeCombination = formattedDate + " " + formattedTime;
  console.log("time " + timeCombination); // Outputs the time in 24:33:25 format

  useEffect(() => {
    localStorage.setItem("savedTodosList", JSON.stringify(todos));
  }, [todos]);
  const addTodo = useCallback((label) => {
    setTodos((prev) => [
      {
        id: uuid(),
        label,
        checked: false,
        createdAt: timeCombination,
      },
      ...prev,
    ]);
  }, []);

  const handleChange = (currantId) => {
    console.log("df");
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === currantId
          ? {
              ...todo,
              checked: !todo.checked,
              completedAt: !todo.checked ? timeCombination : undefined,
            }
          : todo
      )
    );
  };
  const sortedTodos = [...todos].sort((a, b) => a.checked - b.checked);
  return (
    <Wrapper>
      <Header>Todo List</Header>
      <AddInput onAdd={addTodo} />
      <TodoList>
        {sortedTodos.map((todo) => (
          <TodoItem
            {...todo}
            key={todo.id}
            onChange={() => {
              handleChange(todo.id);
            }}
            setTodos={setTodos}
          />
        ))}
      </TodoList>
    </Wrapper>
  );
}

export default App;
