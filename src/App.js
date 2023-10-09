import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Importa os componentes necessários do React Router, incluindo Router, Routes e Route.
import Home from "./components/pages/Home";
import Projects from "./components/pages/Projects";
import Company from "./components/pages/Company";
import Contact from "./components/pages/Contact";
import NewProject from "./components/pages/NewProject";
import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Project from "./components/pages/Project";
function App() {
  return (
    <Router>
      {/* Início do Router - Componente principal do React Router */}
      <Navbar />
      {/* Renderiza o componente Navbar*/}
      <Container customClass="min-height">
        {/* Renderiza o componente Container com uma classe personalizada */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Quando o URL é '/', renderiza o componente Home */}
          <Route path="/projects" element={<Projects />} />
          {/* Quando o URL é '/projects', renderiza o componente Projects */}
          <Route path="/company" element={<Company />} />
          {/* Quando o URL é '/company', renderiza o componente Company */}
          <Route path="/contact" element={<Contact />} />
          {/* Quando o URL é '/contact', renderiza o componente Contact */}
          <Route path="/newproject" element={<NewProject />} />
          {/* Quando o URL é '/newproject', renderiza o componente NewProject */}
          <Route path="/project/:id" element={<Project />} />
          {/* Quando o URL é '/project/:id', renderiza o componente Project com a página individual pelo id */}
        </Routes>
      </Container>
      <Footer />
      {/* Renderiza o componente Footer*/}
    </Router>
  );
}

export default App;
