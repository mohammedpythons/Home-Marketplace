import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  geDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
const Offers = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchListing = async () => {
      try {
        // Get reference
        const listingRef = collection(db, "listings");

        // Create a query
        const q = query(
          listingRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        );
        // Execute query
        const querySnapp = await getDocs(q)
       const listings = [];
       querySnapp.forEach((doc) => {
           return listings.push({id: doc.id, data: doc.data()})
       })
       setListings(listings)
       setLoading(false);
      } catch (ere) {
          toast.error("Something wnet wrong!")
      }
    };
    fetchListing();
  }, []);


  return <div className="category">
      <header>
         {listings && listings.length > 0 && <p className="pageHeader">
         Offers
          </p>}
      </header>
      {loading? <Spinner /> : listings && listings.length > 0 ? <>
        <main className="categorylistings">
            <ul className="categoryListings">
                {listings.map((listing) => (
                    <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
                ))}
            </ul>
        </main>
       </>: <p> No listigns yet!</p> }
  </div>;
};

export default Offers;
