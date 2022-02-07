import React from 'react';
import { Link } from 'react-router-dom';
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'

const Explore = () => {
  return <div className='explore'>
    <header>
      <p className='pageHeader'>Explore</p>
    </header>

    <main>
      {/* sliders */}
      <p className="exploreCategoryHeading">Categories</p>
      <div className="exploreCategories">
        <Link to='/category/sell'>
          <img src={rentCategoryImage} alt="rentimage" className='exploreCategoryImg' />
        <p className="exploreCategoryName">Places for Rent</p>
        </Link>
        <Link to='/category/sell'>
          <img src={sellCategoryImage} alt="sellimage" className='exploreCategoryImg' />
          <p className="exploreCategoryName">Places for Sell</p>
        </Link>
      </div>
    </main>
  </div>;
};

export default Explore;
