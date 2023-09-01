import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function FunctionButton({ text }) {
  return (
    <div>
      <FontAwesomeIcon icon={faEnvelope} />

      <button>{text}</button>
    </div>
  );
}

export default FunctionButton;
