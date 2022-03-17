import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { allData } from '../../../redux/dataSlice/dataSlice';
import AllProvider from '../../AllProvider/AllProvider';
import Chatbot from '../../Chatbot/Chatbot';

import LoginPopup from '../../Login/LoginPopup/LoginPopup';

import WorkFlow from '../../ProviderProfile/WorkFlow';

import Footer from '../../SharedRoute/Footer/Footer';
import Navigation from '../../SharedRoute/Navigation/Navigation';
import Header from '../Header/Header';
import HomeServices from '../HomeServices/HomeServices';
import RecentlyViews from '../RecentlyViews/RecentlyViews';
import RequestService from '../RequestService/RequestService';
import Testimonials from '../Testimonials/Testimonials/Testimonials';
import TrendingServices from '../TrendingServices/TrendingServices';


const Home = () => {

    const { user, loading } = useSelector(allData);


    return (
        <>
            <Navigation />
            <Header />
            <RecentlyViews />
            <HomeServices />
            <TrendingServices />
            <AllProvider></AllProvider>

          
          

            <Testimonials />
            <WorkFlow />
            <RequestService />
            {
                !loading && user?.email ? user.role === 'admin' ? <></> : <Chatbot></Chatbot> : <Chatbot></Chatbot>
            }
             
            <Footer />
        </>
    );
};

export default Home;