import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import Icon from "../../Components/Icons/Icon";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";
import useModel from "../../context/ModelContext";
import { useState } from "react";

const Signup = () => {
  const { signup, isSignup } = useAuth();
  const { isSignupModalOpen, closeSignupModel, openModel } = useModel();

  const [user, setUser] = useState({ username: "", email: "", password: "", confirmpassword: "" });
  const [error, setError] = useState("");
  const { username, email, password, confirmpassword } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const userSignup = () => {
    if (username !== "" && email !== "" && password !== "" && confirmpassword != "") {
      
      const registerData = {
        name: username,
        email,
        password,
        confirmpassword
      }

      signup(registerData);

      closeSignupModel();

      openModel();

    } else {
      setError("Input value should not be empty");
      setTimeout(() => setError(""), 2000);
    }
  };
  return (
    <Modal show={isSignupModalOpen} onHide={closeSignupModel} centered={true}>
      <Modal.Header>
        <Modal.Title>Signup</Modal.Title>
        <Link variant="danger" onClick={closeSignupModel}>
          <Icon className="close_icon">
            <AiOutlineClose />
          </Icon>
        </Link>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter your name"
            name="username"
            value={username}
            onChange={handleChange}
          />
          {error && <p className="text-danger">{error}</p>}
        </div>
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
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmpassword"
            placeholder="Confirm password"
            name="confirmpassword"
            value={confirmpassword}
            onChange={handleChange}
          />
          {error && <p className="text-danger">{error}</p>}
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex flex-column justify-content-center ">
        <button className="btn btn-success" onClick={userSignup}>
          Signup
        </button>
        <p className="mt-2">
          Dont have an account{" "}
          <button
            onClick={() => {
              closeSignupModel();
              openModel();
            }}
          >
            Login
          </button>
        </p>
      </Modal.Footer>
    </Modal>
  );
};
export default Signup;
