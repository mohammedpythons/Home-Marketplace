import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Explore from "./pages/Explore";
import Offers from "./pages/Offers";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Navbar from "./components/Navbar";
import Category from "./pages/Category";
import CreateListings from "./pages/CreateListings";
import Listings from "./pages/Listings";
import Contact from "./pages/Contact";
import EditListings from "./pages/EditListings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/routing/PrivateRoute";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/contact/:landlordId" element={<Contact />} />
          <Route
            path="/category/:categoryName/:listingId"
            element={<Listings />}
          />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/create-listing" element={<PrivateRoute />}>
            <Route path="/create-listing" element={<CreateListings />} />
          </Route>
          <Route path="/edit-listing/:listingId" element={<EditListings />} />
        </Routes>
        <Navbar />
      </Router>
    </div>
  );
}

export default App;
