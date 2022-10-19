import React, { useState, useEffect } from "react";
import styles from "./SideBar.module.scss";
import { v4 as id } from "uuid";
import { Link } from "react-router-dom";

const SideBar = () => {
  const storage = window.localStorage;

  const [value, setValue] = useState("");
  const [projects, setProjects] = useState(
    JSON.parse(storage.getItem("projects")) || [
      {
        id: 1,
        name: "Work",
      },
    ]
  );

  const handleProject = () => {
    if (value) {
      setProjects([
        ...projects,
        {
          id: id(),
          name: value,
        },
      ]);

      setValue("");
    }
  };

  useEffect(() => {
    storage.setItem("projects", JSON.stringify(projects));
  }, [projects, storage]);

  return (
    <section className={styles.sidebar}>
      <div className={styles.top}>
        <span>Projects</span>
        <input
          type={"text"}
          value={value}
          placeholder={"project name"}
          onChange={(evt) => setValue(evt.target.value)}
        />
        <button onClick={handleProject}>+</button>
      </div>
      <div className={styles.bottom}>
        {projects &&
          projects.map((project) => (
            <Link
              className={styles.link}
              to={project.name.toLowerCase()}
              key={project.id}
            >
              <div className={styles.project}>{project.name}</div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default SideBar;
