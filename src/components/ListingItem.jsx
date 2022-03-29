import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg";
import { ReactComponent as EditIcon } from "../assets/svg/editIcon.svg";
import { Link } from "react-router-dom";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathtubIcon from "../assets/svg/bathtubIcon.svg";

const ListingItem = ({ id, listing, onDelete, onEdit }) => {

  return (
    <li className="categoryListing">
      <Link
        to={`/category/${listing.type}/${id}`}
        className="categoryListingLink"
      >
        <img
          src={listing.imgUrls[0]}
          alt={listing.name}
          className="categoryListingImg"
        />
        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{listing.location}</p>
          <p className="categoryListingName">{listing.name}</p>

          <p className="categoryListingPrice">
            ${listing.offer ? listing.discountPrice : listing.regularPrice}
            {listing.type === "rent" && " Per Month"}
          </p>
          <div className="categoryListingInfoDiv">
            <img src={bedIcon} alt="bedicon" />
            <p className="categoryListingInfoText">
              {listing.bedrooms === 1
                ? `${listing.bedrooms} bedroom`
                : `${listing.bedrooms} bedrooms`}
            </p>
            <img src={bathtubIcon} alt="bath" />
            <p className="categoryListingInfoText">
              {listing.bathrooms === 1
                ? `${listing.bathrooms} bathroom`
                : `${listing.bathrooms} bathrooms`}
            </p>
          </div>
        </div>
      </Link>
      {onDelete && (<DeleteIcon className='removeIcon' fill='rgb(231, 76, 60)' onClick={() => onDelete(listing.id, listing.name)} />)}
      {onEdit && (<EditIcon className='editIcon'  onClick={() => onEdit(listing.id)} />)}
    </li>
  );
};

export default ListingItem;
