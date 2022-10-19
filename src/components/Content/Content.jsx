import React from "react";
import styles from "./Content.module.scss";
// import { Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";

const Content = ({ todos, todoEditor }) => {
  const handleDone = (id) => {
    todoEditor(id);
  };

  const obj = useParams();

  // console.log(obj);

  return (
    <section className={styles.content}>
      <div className={styles.inner}>
        <div className={styles.todos}>
          {todos &&
            todos.length > 0 &&
            todos.map((todo) => (
              <div key={todo.id} className={styles.todo}>
                <input
                  type={"checkbox"}
                  defaultChecked={todo.isDone}
                  onChange={() => handleDone(todo.id)}
                />
                <div className={styles.text}>{todo.text}</div>
                <time>{todo.time}</time>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Content;
