import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import Content from "../Content/Content";
import styles from "./App.module.scss";
import Modal from "../Modal/Modal";
import { v4 as idGenerator } from "uuid";
import { timeMaker } from "../../utils/timeMaker";
import { Route, Routes, useParams } from "react-router-dom";

const App = () => {
  const storage = window.localStorage;

  const [modal, setModal] = useState(false);
  const [category, setCategory] = useState("home");
  const [data, setData] = useState(JSON.parse(storage.getItem("todos")) || []); // todos mana shu

  useEffect(() => {
    storage.setItem("todos", JSON.stringify(data));
  }, [data, storage]);

  const todoAdder = (text) => {
    setData([
      ...data,
      {
        id: idGenerator(),
        text: text,
        category: category,
        isDone: false,
        time: timeMaker(),
      },
    ]);
  };

  const todoEditor = (id) => {
    const changedData = data.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      }

      return todo;
    });

    setData(changedData);
  };

  const todoDelete = (id) => {
    const filteredTodos = data.filter((todo) => todo.id !== id);
    storage.setItem("todos", JSON.stringify(filteredTodos));
    setData(filteredTodos);
  };

  return (
    <main className={styles.app}>
      <Header modalOpener={() => setModal(true)} />
      <div className={styles.bottom}>
        <SideBar />

        <Routes>
          <Route
            path="/:category"
            index
            element={
              <Content
                todos={data}
                setCategory={(cat) => setCategory(cat)}
                todoEditor={todoEditor}
                deleteTodo={todoDelete}
              />
            }
          />
        </Routes>

        <Modal
          addTodo={(rawText) => todoAdder(rawText)}
          modalCloser={(stateBool) => setModal(stateBool)}
          isOpen={modal}
        />
      </div>
    </main>
  );
};

export default App;
