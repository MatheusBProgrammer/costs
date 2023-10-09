import styles from "../project/ProjectCard.module.css";
import { BsFillTrashFill } from "react-icons/bs";

function ServiceCard({ id, name, cost, description, handleRemove }) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id, cost);
  };

  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Cost of the service:&nbsp;</span>
        {cost}
      </p>
      <p>{description}</p>
      <div className={styles.project_card_actions}>
        <button onClick={remove} className={styles.service_button}>
          <BsFillTrashFill />
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
