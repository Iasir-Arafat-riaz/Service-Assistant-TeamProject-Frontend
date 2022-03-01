import React from 'react';
import { useSelector } from 'react-redux';
import { allData } from '../../../redux/dataSlice/dataSlice';
import Chatbot from '../../Chatbot/Chatbot';
import Search from '../../Search';
import Footer from '../../SharedRoute/Footer/Footer';
import Navigation from '../../SharedRoute/Navigation/Navigation';
import Header from '../Header/Header';
import HomeServices from '../HomeServices/HomeServices';
import RecentlyViews from '../RecentlyViews/RecentlyViews';
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
            <Testimonials />


            {
                !loading && user?.email ? !user.role === 'admin' && <Chatbot></Chatbot> : <Chatbot></Chatbot>
            }
            <Footer />
        </>
    );
};

export default Home;