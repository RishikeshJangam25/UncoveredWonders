import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import Icon from "../../Components/Icons/Icon";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";
import useModel from "../../context/ModelContext";
import { useState } from "react";

const Login = () => {
  const { login } = useAuth();
  const { isModelOpen, closeModel, openSignupModel } = useModel();
  const [error, setError] = useState("");
  const [user, setUser] = useState({ email: "", password: "" });

  const { email, password } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const userLogin = () => {
    if (email !== "" && password !== "") {
      login({email, password});
      closeModel();
    } else {
      setError("Input value should not be empty");
      setTimeout(() => setError(""), 2000);
    }
  };

  const openAnotherModel = () => {
    closeModel();
    openSignupModel();
  };
  return (
    <Modal show={isModelOpen} onHide={closeModel} centered={true}>
      <Modal.Header>
        <Modal.Title>Signin</Modal.Title>
        <Link variant="danger" onClick={closeModel}>
          <Icon className="close_icon">
            <AiOutlineClose />
          </Icon>
        </Link>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          {error && <p className="text-danger">{error}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          {error && <p className="text-danger">{error}</p>}
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex flex-column justify-content-center ">
        <button className="btn btn-success" onClick={userLogin}>
          Signin
        </button>

        <p className="mt-2">
          Dont have an account{" "}
          <button onClick={openAnotherModel}>signup</button>
        </p>
      </Modal.Footer>
    </Modal>
  );
};
export default Login;
