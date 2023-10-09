import style from "./Project.module.css";
import { unstable_usePrompt, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message";
import ServiceForm from "../service/ServiceForm";
import { parse, v4 as uuidv4 } from "uuid";
import ServiceCard from "../service/ServiceCard";

function Project() {
  const url = "http://localhost:5000/projects";

  //captura o id que vem pela url
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    setTimeout(() => {
      fetch(`${url}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
          setServices(data.services);
        })
        .catch((err) => console.log(err));
    }, 1000);
  }, [id]);

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }
  function editPost(project) {
    setMessage("");
    if (project.budget < project.cost) {
      setMessage("Erro ao cadastrar projeto");
      setType("error");
      return false;
    }
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(!showProjectForm);
        setMessage("Projeto atualizado!");
        setType("success");
      })
      .catch((err) => {
        setMessage("Erro na conexão com o banco de dados");
        setType("error");
      });
  }
  //adicionará o projeto ao banco de dados
  function createService(project) {
    // last service
    const lastService = project.services[project.services.length - 1];

    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);
    console.log(newCost);
    // maximum value validation
    if (newCost > parseFloat(project.budget)) {
      setMessage("Orçamento ultrapassado, verifique o valor do serviço!");
      setType("error");
      project.services.pop();
      return false;
    }

    // add service cost to project cost total
    project.cost = newCost;

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setServices(data.services);
        setShowServiceForm(!showServiceForm);
        setMessage("Serviço adicionado!");
        setType("success");
      });
  }

  function removeService(id, cost) {
    setMessage("");
    //criará uma nova lista de services, onde não haja um service com o id infermado por parâmetro
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id
    );

    const projectUpdated = project;
    //atualiza todos os serviços do projeto inteiro
    projectUpdated.services = servicesUpdated;
    //atualiza os custos do projeto
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

    fetch(`${url}/${projectUpdated.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      //atualiza todo o projeto, que ja está com os serviços atualizados
      body: JSON.stringify(projectUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setServices(servicesUpdated);
        setMessage("Projeto Removido com Sucesso");
        setType("sucess");
      })
      .catch((err) => {
        console.log(err);
        setMessage("Erro ao remover Projeto");
      });
  }

  return (
    <>
      {project.name ? (
        <div className={style.project_details}>
          <Container customClass="column">
            {message && <Message msg={message} type={type} />}
            <div className={style.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button onClick={toggleProjectForm}>
                {!showProjectForm ? "Edit Project" : "Close"}
              </button>
              {!showProjectForm ? (
                <div className={style.project_info}>
                  <p>
                    <span>Categoria:&nbsp;</span>
                    {project.category.name}
                  </p>
                  <p>
                    <span>Total de Orçamentos:&nbsp;</span>
                    R${project.budget}
                  </p>
                  <p>
                    <span>Total utilizado:&nbsp;</span>
                    R${project.cost}
                  </p>
                </div>
              ) : (
                <div className={style.project_info}>
                  <p>Detalhes do projeto</p>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Editar Projeto"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={style.service_form_container}>
              <h2>Adicione um serviço: </h2>
              <button onClick={toggleServiceForm}>
                {!showServiceForm ? "Create Service" : "Close"}
              </button>
              <div className={style.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Create Service"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id ? service.id : "sem id"}
                    name={service.name ? service.name : "sem nome"}
                    cost={service.cost ? service.cost : 0}
                    description={
                      service.description
                        ? service.description
                        : "sem descrição informada"
                    }
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && <p>Não há serviços cadastrados</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
