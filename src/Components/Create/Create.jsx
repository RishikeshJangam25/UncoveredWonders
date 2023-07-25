import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import useModel from "../../context/ModelContext";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useState } from "react";
import Icons from "../Icons/Icon";
import "./create.css";

const initialPost = {
  title: "",
  description: "",
};

const Create = ({ handlePost }) => {
  const { isModelOpen, closeModel } = useModel();
  const [post, setPost] = useState(initialPost);
  const [images, setImages] = useState(null);

  const [image, setImage] = useState(null)

  const { title, description } = post;

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    setImage(file)

    reader.onload = () => {
      setImages(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handlechange = (e) => {
    const { id, value } = e.target;
    setPost({
      ...post,
      [id]: value,
    });
  };

  return (
    <Modal show={isModelOpen} onHide={closeModel} centered={true}>
      <Modal.Header>
        <Modal.Title as="h6">Create New Post</Modal.Title>
        <Link variant="danger" onClick={closeModel}>
          <Icons className="close_icon">
            <AiOutlineClose />
          </Icons>
        </Link>
      </Modal.Header>
      <Modal.Body>
        <form className="mx-3">
          <div>
            <label htmlFor="images" className="form-label">
              Image
            </label>
            <input
              className="form-control sm"
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={handleFile}
            />
          </div>
          <div>
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Choose Title"
              value={title}
              onChange={handlechange}
            />
          </div>
          <div>
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              value={description}
              onChange={handlechange}
            ></textarea>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setPost();
            closeModel();
          }}
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handlePost({ ...post, images }, image);
            closeModel();
          }}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Create;
