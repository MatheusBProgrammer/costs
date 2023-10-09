import { useEffect, useState } from "react";
import Input from "../form/Input";
import styles from "./ProjectForm.module.css";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

function ProjectForm({ handleSubmit, btnText, projectData }) {
  // Estado para armaz enar as categorias e o projeto
  const [categories, setCategories] = useState([]); // Armazena as categorias disponíveis
  const [project, setProject] = useState(projectData || {}); // Armazena os dados do projeto

  // Efeito para buscar as categorias quando o componente é montado
  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => setCategories(data)) // Atualiza o estado com as categorias obtidas
      .catch((err) => console.log(err)); // Lida com erros de requisição
  }, []);

  // Função para lidar com o envio do formulário
  const submit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    handleSubmit(project); // Chama a função de envio passando os dados do projeto
  };

  // Função para lidar com as mudanças nos campos do formulário
  function handleChange(e) {
    setProject({ ...project, [e.target.id]: e.target.value }); // Atualiza o estado do projeto com os novos valores(o id em questão é referente o id da tag)
  }

  // Função para lidar com a seleção da categoria no campo select
  function handleCategory(e) {
    const categoryId = e.target.value; // Valor do input (ID da categoria)
    setProject({
      ...project,
      category: {
        id: categoryId, // ID da categoria
        name: e.target.options[e.target.selectedIndex].text, // Nome da opção selecionada
      },
    });
  }

  // Renderiza o formulário com os campos e botão
  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Project name"
        name="name"
        id="name"
        placeholder="Enter the project name"
        handleOnchange={handleChange} // Chama a função handleChange quando o campo muda
        value={project.name ? project.name : ""} // Valor do campo name
      />
      <Input
        type="number"
        text="Project value"
        name="budget"
        id="budget"
        placeholder="Enter the project budget"
        handleOnchange={handleChange} // Chama a função handleChange quando o campo muda
        value={project.budget ? project.budget : ""} // Valor do campo budget
      />
      <Select
        name="category_id"
        text="Select the category"
        options={categories} // Opções do campo select
        handleOnchange={handleCategory} // Chama a função handleCategory quando o campo muda
        value={project.category ? project.category.id : ""} // Valor do campo category_id
      />
      <SubmitButton text={btnText} /> {/* Botão de envio do formulário */}
    </form>
  );
}

export default ProjectForm;
