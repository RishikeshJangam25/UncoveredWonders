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
  const { isLoggedIn } = useAuth();
  const { openModel, openSignupModel } = useModel();

  useEffect(() => {
    console.log("explore", isLoggedIn);
    if (!isLoggedIn) {
      // openSignupModel();
      openModel();
    }
  }, [isLoggedIn]);

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
      userID: 1,
      postTypeID: 1,
      postCategoryID: 1,
      header: post.title,
      postUrl: img.fileUrl,
      location: "pune",
      createdBy: "user1",
      updatedBy: "user1",
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
          console.log("res ", res);
          if (res.ok) {
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
        })
        
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

  useEffect(() => {
    setData(placesDetail);
    console.log('placesDetails ', data);
  }, [data]);

  return (
    <section className="layout">
      <Sidebar />
      <main className="main_content">
        {data && <Posts data={data} setData={setData} />}
        <Create handlePost={handlePost} />
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
