import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

const Modal = ({ modalCloser, isOpen = false, addTodo }) => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef) {
      inputRef.current.focus();
    }
  }, [isOpen, inputRef]);

  if (isOpen) {
    return createPortal(
      <div className={styles.modal}>
        <input
          className={styles.input}
          ref={inputRef}
          type={"text"}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={"nimadir yozing..."}
        />

        <div className={styles.footer}>
          <button
            onClick={() => {
              if (value) {
                addTodo(value);
                setValue("");
                modalCloser(false);
              }
            }}
          >
            Qo'shish
          </button>
          <button onClick={() => modalCloser(false)}>Bekor qilish</button>
        </div>
      </div>,
      document.body
    );
  } else {
    return null;
  }
};

export default Modal;
