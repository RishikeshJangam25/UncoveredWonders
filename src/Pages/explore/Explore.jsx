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

import { ColorRing } from  'react-loader-spinner'


const Explore = () => {

  const [isLoading, setIsLoading] = useState(true);

  const [allPosts, setAllPosts] = useState([]);

  const [userPosts, setUserPosts] = useState([]);

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

  const getUserName = async (userId) => {
    try {
      const res = await fetch(
        `https://localhost:7168/api/User/GetUserDetailsByUserId?userId=${userId}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = await res.json();
      console.log("res ", userData);
      return userData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const fetchAllPosts = async (userId) => {
  //   //const userPromise = postData.map((post) => getUserName(post.userID));
  //   //const usersList = await Promise.all(userPromise);
  //   try {
  //     // const res = await fetch("https://localhost:7168/api/Post/GetAllPosts");
  //     // const postData = await res.json();

  //     const posts = postData.map(async (post) => {
  //       const userData = await getUserName(post.userID);
  //       return {
  //         id: post.postID,
  //         userId: post.userID,
  //         userName: userData?.name || "User",
  //         images: "https://hblimg.mmtcdn.com/content/hubble/img/agra/mmt/activities/m_activities-agra-taj-mahal_l_400_640.jpg",
  //         title: post.header,
  //         description: post.header,
  //         likes: 0,
  //         dislikes: 0,
  //         comments: [],
  //       };
  //     });

  //     // const posts = postData.map((post, idx) => ({
  //     //   id: post.postID,
  //     //   userId: post.userID,
  //     //   //userName: usersList[idx],
  //     //   // images: post.postUrl,
  //     //   images:
  //     //     "https://hblimg.mmtcdn.com/content/hubble/img/agra/mmt/activities/m_activities-agra-taj-mahal_l_400_640.jpg",
  //     //   title: post.header,
  //     //   description: post.header,
  //     //   likes: 0,
  //     //   dislikes: 0,
  //     //   comments: [],
  //     // }));

  //     setAllPosts(posts.reverse());
  //     console.log("res ", postData);
  //     return posts;
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }

  //   const postsWithUserData = await Promise.all(posts);
  //   return postsWithUserData;

  // };

  const fetchAllPosts = async () => {
    try {
      const response = await fetch(
        "https://localhost:7168/api/Post/GetAllPosts"
      );

      const postData = await response.json();

      const postsPromises = postData.map(async (post) => {
        const userNameData = await getUserName(post.userID);
        return {
          id: post.postID,
          userId: post.userID,
          userName: userNameData?.name || "User",
          images:
            "https://hblimg.mmtcdn.com/content/hubble/img/agra/mmt/activities/m_activities-agra-taj-mahal_l_400_640.jpg",
          title: post.header,
          description: post.header,
          likes: 0,
          dislikes: 0,
          comments: [],
        };
      });

      const postsWithUserData = await Promise.all(postsPromises);

      setAllPosts(postsWithUserData.reverse());

      return postsWithUserData;
    } catch (error) {
      console.error("Error fetching posts data:", error);
      // return null;
    }
  };

  const fetchUserPosts = async (userId) => {
    try {
      const res = await fetch(
        `https://localhost:7168/api/Post/PostsByUserId?userId=${userId}`
      );
      const postData = await res.json();
      const posts = postData.map((post) => ({
        id: post.postID,
        userId: post.userID,
        // images: post.postUrl,
        images:
          "https://hblimg.mmtcdn.com/content/hubble/img/agra/mmt/activities/m_activities-agra-taj-mahal_l_400_640.jpg",
        title: post.header,
        description: post.header,
        likes: 0,
        dislikes: 0,
        comments: [],
      }));
      setUserPosts(posts.reverse());
      console.log("res ", postData);
      return posts;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const userDetailsData = await fetchUserDetails(userEmail);
      console.log("useEffect userDetail", userDetailsData.name);

      const postsData = await fetchAllPosts();
      console.log("useEffect all posts", postsData);

      const userpostsData = await fetchUserPosts(userDetailsData.userID);
      console.log("useEffect userposts", userpostsData);

      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <section className="layout">
      <Sidebar setSelectedItem={setSelectedItem} selectedItem={selectedItem} />

      <main className="main_content">
        {isLoading ? (
          <ColorRing
          visible={true}
          height="60"
          width="60"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={[]}
         />
          // <div>Loading...</div>
        ) : (
          <>
            {selectedItem === "home" && (
              <Posts data={allPosts} setData={setAllPosts} />
            )}
            {selectedItem === "posts" && (
              <Posts
                data={userPosts}
                setData={setUserPosts}
                userName={userDetails?.name}
              />
            )}
            {selectedItem === "create" && <Create handlePost={handlePost} />}
            {selectedItem === "profile" && <Profile userName={userDetails?.name}/>}
          </>
        )}
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
