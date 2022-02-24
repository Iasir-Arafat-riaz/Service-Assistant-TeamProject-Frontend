import React, { useEffect, useState } from 'react';
import AddBannerSection from './AddBannerSection/AddBannerSection';

const AddBanner = () => {
  const [banners,setBanner]=useState([])
  useEffect(()=>{
    fetch("http://localhost:5000/headerBanners")
    .then(res=>res.json())
    .then(data=>setBanner(data))
  },[])
  // console.log(banners);
  return (
    <div>
      {
        banners.map(banner=><AddBannerSection banner={banner}/>)}
      {/* <AddBannerSection banner={banners}/> */}
    </div>
  );
};

export default AddBanner;