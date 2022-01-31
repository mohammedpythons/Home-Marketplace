import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore'
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import googleIcon from '../assets/svg/googleIcon.svg'

const Oauth = () => {

    const navigate = useNavigate();

    const location  = useLocation();

    const onGoogleClick = async(e) => {
        e.preventDefault();
        try {
            const auth = getAuth()

            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user;

            //check for user
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            // if user doesn not exsist create one in the DB
            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }
            navigate('/')

        } catch (err) {
            toast.error("Oops! something went wrong!")

        }

    }
  return <div className='socialLogin'>
      <p>sign {location.pathname === '/signup'? 'up': 'in' } with</p>
      <button className='socialIconDiv' onClick={onGoogleClick}>
          <img className='socialIconImg' src={googleIcon} alt="google"  />
      </button>
  </div>;
};

export default Oauth;
