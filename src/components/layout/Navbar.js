import { Link } from "react-router-dom";
import Container from "./Container";
import styles from "./Navbar.module.css";
import logo from "../../img/costs_logo.png";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      {" "}
      <Container>
        <Link>
          <img src={logo} alt="Logo" />
        </Link>
        <ul className={styles.list}>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/projects">Projects</Link>
          </li>

          <li>
            <Link to="/company">Company</Link>
          </li>

          <li>
            <Link to="/newproject">New Project</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
}
export default Navbar;
