import React, { useEffect, useState } from 'react';
import AddBannerSection from './AddBannerSection/AddBannerSection';

const AddBanner = () => {
  const [banners,setBanner]=useState([])
  useEffect(()=>{
    fetch("https://fierce-meadow-12011.herokuapp.com/headerBanners")
    .then(res=>res.json())
    .then(data=>setBanner(data))
  },[])
  // console.log(banners);
  return (
    <div>
      {
        banners.map(banner=><AddBannerSection key={banner._id} banner={banner}/>)}
      {/* <AddBannerSection banner={banners}/> */}
    </div>
  );
};

export default AddBanner;