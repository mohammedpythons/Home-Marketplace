
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: "",
    password: "",
  });

  const { name ,email, password } = formData;
  const onchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };
const onsubmit = (e) => {
  e.preventDefault()
  console.log(formData);
}
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
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
            <img src={visibilityIcon} alt="visibility-icon" className="showPassword" onClick={() => {
              setShowPassword(prev => !prev)
            }} />
            <Link to='/forgotpassword' className="forgotPasswordLink">Forgot Password</Link>

            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              <button type="submit" className="signUpButton">
                <ArrowRightIcon fill="#FFF" width='34px' height='34px'/>
              </button>
            </div>
          </div>
        </form>
        {/* Google Auth */}


        <Link to='/signin' className="registerLink">Already have an account? Sing in</Link>
      </div>
    </>
  );
};

export default Signup;

