import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import {toast} from 'react-toastify';


const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { email, password } = formData;
  const onchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };
const onsubmit = async (e) => {
  e.preventDefault()
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    if (userCredential.user) {
      navigate("/");
    }
  } catch (err) {
    toast.error("Bad User Credentials!")
  }

}
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>

        <form onSubmit={onsubmit}>
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
            <img src={visibilityIcon} alt="current-password" className="showPassword" onClick={() => {
              setShowPassword(prev => !prev)
            }} />
            <Link to='/forgotpassword' className="forgotPasswordLink">Forgot Password</Link>

            <div className="signInBar">
              <p className="signInText">Sign In</p>
              <button type="submit" className="signInButton">
                <ArrowRightIcon fill="#FFF" width='34px' height='34px'/>
              </button>
            </div>
          </div>
        </form>
        {/* Google Auth */}


        <Link to='/signup' className="registerLink">Sign Up Instead</Link>
      </div>
    </>
  );
};

export default Signin;
