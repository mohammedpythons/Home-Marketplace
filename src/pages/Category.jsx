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
const Category = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastfetchedListing] = useState(null)
  const { categoryName } = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        // Get reference
        const listingRef = collection(db, "listings");

        // Create a query
        const q = query(
          listingRef,
          where("type", "==", categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );
        // Execute query
        const querySnapp = await getDocs(q);
        const lastVisiable = querySnapp.docs[querySnapp.docs.length -1];
        setLastfetchedListing(lastVisiable);


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

// pagination / load more
  const onFetchMoreListings = async () => {
    try {
      // Get reference
      const listingRef = collection(db, "listings");

      // Create a query
      const q = query(
        listingRef,
        where("type", "==", categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(10)
      );
      // Execute query
      const querySnapp = await getDocs(q);
      const lastVisiable = querySnapp.docs[querySnapp.docs.length -1];
      setLastfetchedListing(lastVisiable);


     const listings = [];
     querySnapp.forEach((doc) => {
         return listings.push({id: doc.id, data: doc.data()})
     })
     setListings((prev) => [...prev, ...listings])
     setLoading(false);
    } catch (ere) {
        toast.error("Something wnet wrong!")
    }
  };

  return <div className="category">
      <header>
         {listings && listings.length > 0 && <p className="pageHeader">
          {categoryName === 'rent' ? 'Places for rent': 'places for sale'}
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
        <br />
        <br />
        {lastFetchedListing? (
          <p className="loadMore" onClick={onFetchMoreListings}>Load More</p>
        ): <p className="loadMore">Cant find a list</p>}

       </>: <p> No listigns for {categoryName}</p> }
  </div>;
};

export default Category;
