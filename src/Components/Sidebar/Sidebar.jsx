import { ImHome } from "react-icons/im";
import { Link } from "react-router-dom";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";

import "./sidebar.css";
import useModel from "../../context/ModelContext";
import Profile from "../Profile/Profile";

const Sidebar = () => {
  const { openModel } = useModel();

  return (
    <aside className="sidebar">
      <div className="sidebar_logo">
        <Link>Uncovered Wonders</Link>
      </div>
      <nav className="sidebar_nav">
        <ul>
          <li>
            <Link>
              <ImHome /> <span>Home</span>
            </Link>
          </li>
          <li>
            <Link onClick={openModel}>
              {" "}
              <MdOutlineAddToPhotos />
              <span>Create</span>
            </Link>
          </li>
          <li>
            <Link to="/user/profile">
              <CgProfile />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link>
              <GiHamburgerMenu />
              <span>More</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
