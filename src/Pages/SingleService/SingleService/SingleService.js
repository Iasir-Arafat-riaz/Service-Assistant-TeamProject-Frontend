import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../SingleService.css';
import { Link, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import SingleServiceHeader from '../SingleServiceHeader/SingleServiceHeader';
import ServiceDetails from '../ServiceDetails/ServiceDetails';
import Navigation from '../../SharedRoute/Navigation/Navigation';

const SingleService = () => {

    const [serviceDetials, setServiceDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    const { serviceId } = useParams();

    useEffect(() => {
        setLoading(true)
        axios.get('https://fierce-meadow-12011.herokuapp.com/singleservice').then(res => {
            setServiceDetails(res.data)
            setLoading(false)
        })
    }, []);

    if (loading) {
        return 'Loading....'
    }



    const matchService = serviceDetials.find(service => service.parentService == serviceId);
    const question1 = Object.keys(matchService?.overview[0]);
    const question2 = Object.keys(matchService?.overview[1]);
    const question3 = Object.keys(matchService?.overview[2]);


    return (
        <>
        <Navigation/>
            {
                loading ? <Box>
                    loading
                </Box>
                    :
                    <Box>
                        <SingleServiceHeader matchService={matchService} />
                        <ServiceDetails question1={question1}
                            question2={question2}
                            question3={question3} matchService={matchService} />
                    </Box>
            }
        </>
    );
};

export default SingleService;