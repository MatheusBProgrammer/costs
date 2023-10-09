import styles from "./NewProject.module.css";
import ProjectForm from "../project/ProjectForm";
import { useNavigate } from "react-router-dom";

function NewProject() {
  {
    /**Permite o redirecionamento de um usuário(nesse caso, após um POST) */
  }
  const navigate = useNavigate();

  //cria um novo projeto
  function createPost(project) {
    //initialize cost and services
    project.cost = 0;
    project.services = [];

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      //add the project to the db
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        //usa o navigate para navegar para a páfina de projetos, passando um texto como estado dinâmico para a página
        navigate("/projects", {
          state: { text: "Project created successfully" },
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.newProject_container}>
      <h1>Create Project</h1>
      <p>Create your project and then add a service</p>
      <ProjectForm handleSubmit={createPost} btnText="Create Project" />
    </div>
  );
}
export default NewProject;
