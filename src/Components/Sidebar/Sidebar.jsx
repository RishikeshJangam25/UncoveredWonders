// import { ImHome } from "react-icons/im";
// import { Link } from "react-router-dom";
// import { MdOutlineAddToPhotos } from "react-icons/md";
// import { CgProfile } from "react-icons/cg";
// import { GiHamburgerMenu } from "react-icons/gi";

// import "./sidebar.css";
// import useModel from "../../context/ModelContext";
// import Profile from "../Profile/Profile";

// const Sidebar = () => {
//   const { openModel } = useModel();

//   return (
//     <aside className="sidebar">
//       <div className="sidebar_logo">
//         <Link>Uncovered Wonders</Link>
//       </div>
//       <nav className="sidebar_nav">
//         <ul>
//           <li>
//             <Link>
//               <ImHome /> <span>Home</span>
//             </Link>
//           </li>
//           <li>
//             <Link onClick={openModel}>
//               {" "}
//               <MdOutlineAddToPhotos />
//               <span>Create</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/user/profile">
//               <CgProfile />
//               <span>Profile</span>
//             </Link>
//           </li>
//           <li>
//             <Link>
//               <GiHamburgerMenu />
//               <span>More</span>
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;

import React, { useState } from 'react';
import { ImHome } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { MdOutlineAddToPhotos } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';

import './sidebar.css';
import useModel from '../../context/ModelContext';
import Profile from '../Profile/Profile';

const Sidebar = ({ setSelectedItem, selectedItem }) => {
  const { openModel } = useModel();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <aside
      className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}
      onMouseEnter={() => handleToggleSidebar(true)}
      onMouseLeave={() => handleToggleSidebar(false)}
    >
      <div className="sidebar_logo">
        <Link to="/" className="sidebar_logo_link">
          {isSidebarOpen ? 'Uncovered Wonders' : 'UW'}
        </Link>
      </div>
      <nav className="sidebar_nav">
        <ul>
          <li
            className={selectedItem === 'home' ? 'selected' : ''}
            onClick={() => handleItemClick('home')}
          >
            <ImHome /> <span>Home</span>
          </li>
          <li
            className={selectedItem === 'posts' ? 'selected' : ''}
            onClick={() => handleItemClick('posts')}
          >
          <GiHamburgerMenu />
            <span>Posts</span>
          </li>
          <li
            className={selectedItem === 'create' ? 'selected' : ''}
            onClick={() => handleItemClick('create')}
          >
            <MdOutlineAddToPhotos />
            <span>Create</span>
          </li>
          <li
            className={selectedItem === 'profile' ? 'selected' : ''}
            onClick={() => handleItemClick('profile')}
          >
            <CgProfile />
            <span>Profile</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
