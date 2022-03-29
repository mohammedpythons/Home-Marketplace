import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  orderBy,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";
import ListingItem from "../components/ListingItem";

const Profile = () => {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
  });

  const [listings, setListings] = useState();
  const [loading, setLoading] = useState(true);

  const { name } = formData;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserListigs = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(
        listingsRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings(listings);
      setLoading(false);
    };
    fetchUserListigs();
  }, [auth.currentUser.uid]);

  const onLogout = (e) => {
    e.preventDefault();
    auth.signOut();
    navigate("/");
  };

  //on submit update the data base;
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //update the name in fb
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        //update a doc in firbaseStore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (err) {
      toast.error("Oops! something went wrong please try again");
    }
  };

  //update the formData object

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // OnDelete function to delete a specific user by id
  const onDelete = async (listingId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "listings", listingId));
      const updatingListing = listings.filter(
        (listing) => listing.id !== listingId
      );
      setListings(updatingListing);
      toast.success("Deleted successfully!");
    }
  };
const onEdit = async(listingId) => {
  navigate(`/edit-listing/${listingId}`);
}
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
        <Link to="/create-listing" className="createListing">
          <img src={homeIcon} alt="home" />
          <p>sell or rent your home</p>
          <img src={arrowRight} alt="arrow" />
        </Link>

        {!loading && listings?.length > 0 && (
          <>
            <p className="lsitingText">Your Listings</p>
            <ul className="listingsList">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
};

export default Profile;
