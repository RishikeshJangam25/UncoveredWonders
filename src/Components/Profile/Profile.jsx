import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const initialProfileData = {
    // name: "Ducky",
    // phoneNo: "12345",
    // address: "Pune",
    // email: "ducky@gmail.com",
  };

  const { isLoggedIn: token, userData: userEmail } = useAuth();

  const [profileData, setProfileData] = useState(initialProfileData);

  const [isEditing, setIsEditing] = useState(false);

  const [profilePhoto, setProfilePhoto] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Y4W0p2sjv51tINa74k7dvc5QnDsO3qJwAQ&usqp=CAU"
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const handleSaveProfile = async () => {
    console.log("userProfile ", profileData, profilePhoto);

    const updateProfileData = {
      name: profileData.name,
      email: profileData.email,
      phoneNo: profileData.phoneNo,
      address: profileData.address,
    };

    try {
      const res = await fetch("https://localhost:7168/api/User/UpdateProfile", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: JSON.stringify(updateProfileData),
      });

      if (res.ok) {
        toast.success("Profile Updated Successfully", {
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
      const updatedUserData = await res.json();

      setProfileData(updatedUserData);
      console.log("userDetails ", updatedUserData);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }

    setIsEditing(false);
  };

  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
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
      setProfileData(userDetailsData);
      console.log("userDetails ", userDetailsData);
      return userDetailsData;
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const userDetailsData = await fetchUserDetails(userEmail);
      console.log("profile ", userDetailsData.name);
    }
    fetchData();
  }, []);

  return (
    
    <div className=" container row m-3 justify-content-center">
      <div className=" col col-lg-6 card p-3 ">
        <div className="d-flex flex-column align-items-center text-center">
          <label htmlFor="profile-photo " style={{ position: "relative" }}>
            <img
              className="rounded-circle mb-2  profile-photo-editable"
              src={profilePhoto}
              alt="Profile"
              onClick={isEditing ? null : handleEdit}
              style={{ height: "200px", width: "200px" }}
            />
            {isEditing && (
              <div
                style={{
                  position: "absolute",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  padding: "3px",
                }}
              >
                <AiOutlineEdit size={24} onClick={handleEdit} />
              </div>
            )}
            {isEditing && (
              <input
                type="file"
                id="profile-photo"
                onChange={handleProfilePhotoChange}
                accept="image/*"
                style={{ display: "none" }}
              />
            )}
          </label>
          <span className="font-weight-bold">{profileData.name}</span>
          <span className="text-black-50">{profileData.email}</span>
        </div>

        <div>
          <div className="py-3">
            <div className="d-flex justify-content-between align-items-right">
              {/* <h4 className="text-right">Profile</h4> */}
              {!isEditing ? (
                <button
                  className="btn btn-primary profile-button"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              ) : (
                <button
                  className="btn btn-primary profile-button"
                  onClick={handleSaveProfile}
                >
                  Save
                </button>
              )}
            </div>

            <div className="col-md-12 mb-2">
              <label className="labels">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                value={profileData.name}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12 mb-2">
              <label className="labels">Phone No.</label>
              <input
                type="text"
                className="form-control"
                placeholder="Phone Number"
                name="phoneNo"
                value={profileData.phoneNo}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12 mb-2">
              <label className="labels">Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                name="address"
                value={profileData.address}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </div>
            
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default Profile;
