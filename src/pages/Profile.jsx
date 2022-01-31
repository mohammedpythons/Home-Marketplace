import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import {db} from '../firebase.config';
import {toas, toast} from "react-toastify";

const Profile = () => {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;
  const navigate = useNavigate();
  const onLogout = (e) => {
    e.preventDefault();
    auth.signOut();
    navigate("/");
  };

  //on submit update the data base;
  const onSubmit = async() => {
    try {
      if (auth.currentUser.displayName !== name) {
        //update the name in fb
        await updateProfile(auth.currentUser, {
          displayName: name
        })
        //update a doc in firbaseStore
        const userRef = doc(db, 'users' , auth.currentUser.uid);
        await updateDoc(userRef, {
          name
        })

      }

    } catch (err) {
      toast.error("Oops! something went wrong please try again")
    }

  };

  //update the formData object

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="button" className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prev) => !prev);
            }}
          >
            {changeDetails ? "done" : "change"}
          </p>
        </div>

        <div className="profileCard">
          <form>
            <input
              type="text"
              id="name"
              className={!changeDetails ? "profileName" : "profileNameActive"}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />


          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;
