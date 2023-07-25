// import React, { useState } from 'react';

// const Profile = () => {
//   const [profileData, setProfileData] = useState({
//     name: '',
//     surname: '',
//     phoneNumber: '',
//     address: '',
//     email: '',
//     education: '',
//     country: '',
//     stateRegion: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSaveProfile = () => {
//     console.log(profileData);
//   };

//   return (
//     <div className="container rounded bg-white mt-5 mb-5">
//       <div className="row">
//         <div className="col-md-3 border-right">
//           <div className="d-flex flex-column align-items-center text-center p-3 py-5">
//             <img
//               className="rounded-circle mt-5"
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Y4W0p2sjv51tINa74k7dvc5QnDsO3qJwAQ&usqp=CAU"
//               alt="Profile"
//             />
//             <span className="font-weight-bold">Ducky</span>
//             <span className="text-black-50">ducky@gmail.com</span>
//           </div>
//         </div>
//         <div className="col-md-5 border-right">
//           <div className="p-3 py-5">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <h4 className="text-right">Profile</h4>
//             </div>

//             <div className="col-md-12 mb-2">
//                 <label className="labels">Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Name"
//                   name="name"
//                   value={profileData.name}
//                   onChange={handleChange}
//                 />
//             </div>
//             <div className="col-md-12 mb-2">
//                 <label className="labels">Phone No.</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Phone Number"
//                   name="phoneno"
//                   value={profileData.phoneNumber}
//                   onChange={handleChange}
//                 />
//             </div>

//             <div className="col-md-12 mb-2">
//                 <label className="labels">Address</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Address"
//                   name="address"
//                   value={profileData.address}
//                   onChange={handleChange}
//                 />
//             </div>

//             <div className="col-md-12 mb-2">
//                 <label className="labels">Email ID</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   placeholder="Email"
//                   name="email"
//                   value={profileData.email}
//                   onChange={handleChange}
//                 />
//             </div>

//             <div className="mt-5 text-center">
//               <button
//                 className="btn btn-primary profile-button"
//                 type="button"
//                 onClick={handleSaveProfile}
//               >
//                 Save Profile
//               </button>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useState } from "react";
import { AiOutlineEdit } from 'react-icons/ai';

const Profile = () => {

  const initialProfileData = {
    name: "Ducky",
    phoneNumber: "123456789",
    address: "Pune",
    email: "ducky@gmail.com",
  };

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

  const handleSaveProfile = () => {
    console.log('userProfile ', profileData, profilePhoto);    
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

  return (
    <div className="container d-flex justify-content-center">
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <label htmlFor="profile-photo" style={{ position: "relative" }}>
                  <img
                    className="rounded-circle mt-5  profile-photo-editable"
                    src={profilePhoto}
                    alt="Profile"
                    onClick={isEditing ? null : handleEdit}
                    style={{ height: '200px', width: '200px' }}
                  />
                  {isEditing && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "5px",
                        right: "5px",
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
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile</h4>
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
                  name="phoneNumber"
                  value={profileData.phoneNumber}
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

              <div className="col-md-12 mb-2">
                <label className="labels">Email ID</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={profileData.email}
                  readOnly={!isEditing}
                  onChange={handleChange}
                />
              </div>

              {/* {isEditing && (
              <div className="mt-5 text-center">
                <button className="btn btn-primary profile-button" onClick={handleSaveProfile}>
                  Save Profile
                </button>
              </div>
            )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
