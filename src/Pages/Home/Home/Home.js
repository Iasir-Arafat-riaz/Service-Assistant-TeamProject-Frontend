import React from 'react';
import Footer from '../../SharedRoute/Footer/Footer';
import Navigation from '../../SharedRoute/Navigation/Navigation';
import Header from '../Header/Header';
import HomeServices from '../HomeServices/HomeServices';
import RecentlyViews from '../RecentlyViews/RecentlyViews';
import Testimonials from '../Testimonials/Testimonials/Testimonials';
import TrendingServices from '../TrendingServices/TrendingServices';

const Home = () => {
    return (
        <>
         <Navigation />
            <Header />
            <RecentlyViews />
            <HomeServices />
            <TrendingServices />
            <Testimonials />
            <Footer />
        </>
    );
};

export default Home;