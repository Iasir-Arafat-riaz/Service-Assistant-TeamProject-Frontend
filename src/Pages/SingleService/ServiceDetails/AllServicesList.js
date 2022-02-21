import React, { useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Skeleton, Typography } from '@mui/material';
import axios from 'axios';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box } from '@mui/system';

import { allData, singleService, loadServiceCategory } from "../../../redux/dataSlice/dataSlice";
import { useSelector, useDispatch } from "react-redux";



const AllServicesList = () => {

    const [expanded, setExpanded] = React.useState('panel1');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    // data loaded

    const dispatch = useDispatch();
    const { allServices, serviceIsLoading } = useSelector(allData);

    useEffect(() => {
        dispatch(loadServiceCategory());
    }, [dispatch]);

    // category list style
    const categoryList = {
        fontSize: 17,
        fontWeight: 500,
        mb: 2,
        letterSpacing: 1,
        color: "#383a3c"
    };


    return (

        <>
            {
                serviceIsLoading ?
                    <Box>
                        {
                            [...new Array(6)].map(() => <Skeleton sx={{ height: 70, mb: 3 }} animation="wave" />)
                        }
                    </Box>
                    :
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography sx={{ fontSize: 22, fontWeight: 'bold' }}>Our all services</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {allServices.map(service => <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography sx={categoryList}>
                                    {service.Category}
                                </Typography>
                                <ArrowForwardIosIcon sx={categoryList} />
                            </Box>)}
                        </AccordionDetails>
                    </Accordion>
            }
        </>
    );
};

export default AllServicesList;