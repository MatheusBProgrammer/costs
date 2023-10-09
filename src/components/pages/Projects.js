import Message from "../layout/Message";
import style from "./Projects.module.css";
import { useLocation } from "react-router-dom";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [projectMessage, SetProjectMessage] = useState("");

  const url = "http://localhost:5000/projects";

  useEffect(() => {
    setTimeout(() => {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProjects(data);
          setLoadingState(false);
        })
        .catch((err) => console.log(err));
    }, 500);
  }, []);

  function removeProject(id) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      //refaz o array projects, mantendo neles apenas os projects que não possuem o id fornecido pelo parâmetro da função
      .then(setProjects(projects.filter((project) => project.id !== id)))
      .then(SetProjectMessage("Projeto removido com sucesso!"))
      .catch((err) => console.log(err));
  }

  const location = useLocation();

  //setando o valor de message a partir da página que ela é criada(Criação/Edição)
  let message = "";
  if (location.state) {
    message = location.state.text;
  }

  return (
    <div className={style.project_container}>
      <div className={style.title_container}>
        <h1>My Projects</h1>
        <LinkButton to="/newproject" text="New Project" />
      </div>
      {message && <Message msg={message} type="sucess" />}
      {projectMessage.length !== 0 && (
        <Message msg={projectMessage} type="sucess" />
      )}

      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category?.name}
              handleRemove={removeProject}
            />
          ))}
        {loadingState && <Loading />}
        {!loadingState && projects.length == 0 && (
          <p>There is no projetcs in the database</p>
        )}
      </Container>
    </div>
  );
}

export default Projects;
