import React, { useEffect } from "react";
import styles from "./Content.module.scss";
// import { Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";

const Content = ({ todos, todoEditor, setCategory, deleteTodo }) => {
  const handleDone = (id) => {
    todoEditor(id);
  };

  const { category } = useParams();

  useEffect(() => {
    setCategory(category);
  }, [category, setCategory]);

  return (
    <section className={styles.content}>
      <div className={styles.inner}>
        <div className={styles.todos}>
          {todos &&
            todos.length > 0 &&
            todos
              .filter((todo) => todo.category === category)
              .map((todo) => (
                <div key={todo.id} className={styles.todo}>
                  <input
                    type={"checkbox"}
                    defaultChecked={todo.isDone}
                    onChange={() => handleDone(todo.id)}
                  />
                  <div className={styles.text}>{todo.text}</div>
                  <time>{todo.time}</time>
                  <button onClick={() => deleteTodo(todo.id)}>-</button>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Content;
