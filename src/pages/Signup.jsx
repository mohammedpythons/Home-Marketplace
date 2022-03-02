import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {doc, setDoc, serverTimestamp} from 'firebase/firestore'
import { db } from "../firebase.config";
import {toast} from 'react-toastify';
import Oauth from "../components/Oauth";


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { name, email, password } = formData;
  const onchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password, name } = formData;
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );


      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name
      })
      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy)
      navigate('/')
    } catch (err) {
      toast.error("Something Went Wrong With Registration!")
    }
  };
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome!</p>
        </header>

        <form onSubmit={onsubmit}>
          <input
            type="text"
            className="nameInput"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onchange}
          />
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onchange}
          />
          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              className="passwordInput"
              name="password"
              value={password}
              onChange={onchange}
              placeholder="Password"
            />
            <img
              src={visibilityIcon}
              alt="current-password"
              className="showPassword"
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            />

            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              <button type="submit" className="signUpButton">
                <ArrowRightIcon fill="#FFF" width="34px" height="34px" />
              </button>
            </div>
          </div>
        </form>
        <Oauth />

        <Link to="/signin" className="registerLink">
          Already have an account? Sing in
        </Link>
      </div>
    </>
  );
};

export default Signup;
