import style from "./Message.module.css";
import { useState, useEffect } from "react";

function Message({ type, msg }) {
  const [visible, setVisible] = useState(false);

  // O useEffect é usado para observar a propriedade 'msg'.
  useEffect(() => {
    // Se 'msg' for uma string não vazia, torna 'visible' verdadeiro.
    if (msg) {
      setVisible(true);

      // Define um timer para tornar 'visible' falso após 3 segundos (3000 ms).
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      // A função de retorno é usada para limpar o timer se a propriedade 'msg' mudar antes do timer terminar.
      return () => clearTimeout(timer);
    } else {
      // Se 'msg' for uma string vazia ou indefinida, torna 'visible' falso.
      setVisible(false);
    }
  }, [msg]); // O efeito será acionado sempre que 'msg' mudar.

  return (
    <>
      {visible && (
        <div className={`${style.message} ${style[type]}`}>{msg}</div>
      )}
    </>
  );
}

export default Message;
