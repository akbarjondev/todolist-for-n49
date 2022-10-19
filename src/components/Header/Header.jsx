import React from "react";
import styles from "./Header.module.scss";

const Header = ({ modalOpener }) => {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.inner}`}>
        <span>Todo App</span>
        <button onClick={modalOpener}>+</button>
      </div>
    </header>
  );
};

export default Header;
