import { IconContext } from "react-icons";
import "./icon.css";

const Icon = ({ children, className }) => {
  return (
    <IconContext.Provider value={{ className: `${className} icon` }}>
      <div>{children}</div>
    </IconContext.Provider>
  );
};

export default Icon;
