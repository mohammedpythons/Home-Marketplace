import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { db } from "../firebase.config";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");



  const onSubmit = async(e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email)
      toast.success("Email was sent!")


    } catch (err) {
      toast.error("Could not send reset email");
    }
  };
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot password?</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="emailInput"
            value={email}
            placeholder="Email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Link className="forgotPasswordLink" to='/signin'>SignIn</Link>
          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
              <button className="signInButton">
                <ArrowRightIcon fill="#ffffff" width='34px' height='34px
                '/>
              </button>

          </div>
        </form>
      </main>
    </div>
  );
};

export default ForgotPassword;
