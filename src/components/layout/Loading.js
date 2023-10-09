import style from "./Loading.module.css";
import loading from "../../img/loading.svg";

function Loading() {
  return (
    <div className={style.loader_container}>
      <img className={style.loader} src={loading} alt={loading} />
    </div>
  );
}

export default Loading;
