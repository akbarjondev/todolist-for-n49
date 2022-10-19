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

  const { category } = useParams();
  console.log(category);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState(JSON.parse(storage.getItem("todos")) || []); // todos mana shu

  useEffect(() => {
    storage.setItem("todos", JSON.stringify(data));
  }, [data, storage]);

  console.log(data);

  const todoAdder = (text) => {
    setData([
      ...data,
      {
        id: idGenerator(),
        text: text,
        category: category ? "/" : category,
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

  return (
    <main className={styles.app}>
      <Header modalOpener={() => setModal(true)} />
      <div className={styles.bottom}>
        <SideBar />

        <Routes>
          <Route
            path="/:category"
            element={<Content todos={data} todoEditor={todoEditor} />}
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
