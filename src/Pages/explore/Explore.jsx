import Sidebar from "../../Components/Sidebar/Sidebar";
import Posts from "../../Components/Posts/Posts";
import "./explore.css";
import Create from "../../Components/Create/Create";
import { placesDetail } from "../../assets/Data/placesDetail";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useModel from "../../context/ModelContext";
import { useNavigate } from "react-router-dom";
import Profile from "../../Components/Profile/Profile";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Explore = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const { isLoggedIn: token, userData: userEmail } = useAuth();
  const { openModel, openSignupModel } = useModel();

  const [userDetails, setUserDetails] = useState({});

  const [selectedItem, setSelectedItem] = useState("home");

  useEffect(() => {
    console.log("explore", token, userEmail);
    if (!token) {
      openSignupModel();
      // openModel();
    }
  }, [token]);

  // useEffect(async() => {
  //   const response = await fetch()
  // }, [])

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);

    return await fetch("https://localhost:7168/api/File/UploadFile", {
      method: "POST",
      // headers: {'Content-Type': 'multipart/form-data'},
      body: formData,
    }).then((res) => {
      // console.log('resjson ', res);
      return res.json();
    });
    // .then(res => {
    //   // console.log('image ', res);
    //   return res
    // })
  };

  const handlePost = async (post, image) => {
    const img = await uploadImage(image);

    console.log("post ", post, img.fileUrl);

    console.log("imgUrl ", img.fileUrl);

    const postData = {
      postID: 0,
      // "userID": (Math.random() * 100).toFixed(0),
      // "postTypeID": (Math.random() * 10).toFixed(0),
      // "postCategoryID": (Math.random() * 10).toFixed(0),
      userID: userDetails.userID,
      postTypeID: 1,
      postCategoryID: 1,
      header: post.title,
      postUrl: img.fileUrl,
      location: "pune",
      createdBy: userDetails.name,
      updatedBy: userDetails.name,
    };

    try {
      await fetch("https://localhost:7168/api/Post/AddPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((res) => {
          console.log("addPost ", res);
          if (res.ok) {
            fetchPosts(userDetails.userID);
            toast.success("Post Created Successfully", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else {
            toast.error("Error occured!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
          return res.text();
        })
        .then((res) => {
          console.log("postRes ", res, postData);
        });
    } catch (error) {
      console.log("error ", error);
    }

    // setData([
    //   ...data,
    //   {
    //     id: nextId++,
    //     images: [post.images],
    //     title: post.title,
    //     description: post.description,
    //     likes: 0,
    //     dislikes: 0,
    //     comments: [],
    //   },
    // ]);

    

  };

  const fetchUserDetails = async (email) => {
    try {
      const res = await fetch(
        `https://localhost:7168/api/User/GetUserDetailsByEmail?email=${email}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userDetailsData = await res.json();
      setUserDetails(userDetailsData);
      console.log("userDetails ", userDetailsData);
      return userDetailsData;
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchPosts = async (userId) => {
    try {
      const res = await fetch(
        `https://localhost:7168/api/Post/PostsByUserId?userId=${userId}`
      );
      const postData = await res.json();
      const posts = postData.map((post) => ({
        id: post.postID,
        // images: post.postUrl,
        images:
          "https://hblimg.mmtcdn.com/content/hubble/img/agra/mmt/activities/m_activities-agra-taj-mahal_l_400_640.jpg",
        title: post.header,
        description: post.header,
        likes: 0,
        dislikes: 0,
        comments: [],
      }));
      setData(posts.reverse());
      console.log("res ", postData);
      return posts;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const userDetailsData = await fetchUserDetails(userEmail);
      console.log("useEffectuserDetail", userDetailsData.name);

      const postsData = await fetchPosts(userDetailsData.userID);
      console.log("useEffect posts", postsData);
    }
    fetchData();
  }, []);

  return (
    <section className="layout">
      {/* <main className="main_content"> */}

      {/* <Posts data={data} setData={setData} userName={userDetails?.name} /> */}

      {/* <Create handlePost={handlePost} /> */}

      {/* <Profile /> */}
      {/* </main> */}

      <Sidebar setSelectedItem={setSelectedItem} selectedItem={selectedItem} />

      <main className="main_content">
        {selectedItem === "home" && (
          <Posts data={data} setData={setData} userName={userDetails?.name} />
        )}
        {selectedItem === "posts" && (
          <Posts data={data} setData={setData} userName={userDetails?.name} />
        )}
        {selectedItem === "create" && <Create handlePost={handlePost} />}
        {selectedItem === "profile" && <Profile />}
        {/* {selectedItem === "more" && <More />} */}
      </main>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </section>
  );
};

export default Explore;
