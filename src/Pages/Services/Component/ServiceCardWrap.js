import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ServiceCard from '../ServiceCard';

const ServiceCardWrap = (props) => {
    const { service, classes } = props;
    
    const [isVisible, setIsVisible] = useState(false);
    const divID = service.Category?.split(" ").join("").toLowerCase();
    const targetRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const options = useMemo(() => {
        return {
            root: null,
            rootMargin: '0px',
            threshold: window.innerWidth <= 500 ? .3 : 1
        }
    }, [])




    useEffect(() => {
        // creating observer
        const observer = new IntersectionObserver(entries => {
            const [entry] = entries;
            setIsVisible(entry.isIntersecting)
        }, options)
        //init observer
        const currentTarget = targetRef.current;
        if (currentTarget) observer.observe(currentTarget);

        return () => {
            if (currentTarget) observer.unobserve(currentTarget)
        }
    }, [targetRef, options]);
    useEffect(() => {
        if (isVisible && divID !== location) {
            navigate(`/services/#${divID}`)

        }
    }, [isVisible, divID, navigate])

    return (
        <Box sx={{ pl: { xs: 2, md: 0 } }}>
            <div
                id={divID}
                ref={targetRef}
                key={`${service._id}${service.Category}`}
                className={classes.subServices}
            >
                <Typography
                    sx={{
                        pb: 2,
                        fontSize: "24px",
                        color: "rgba(0,0,0,.8)",
                        fontWeight: 600,
                    }}
                    variant="h5"
                    gutterBottom
                    component="div"
                >
                    {service.Category}
                </Typography>
                <Grid
                    container
                    className={classes.gridMargin}
                    spacing={3}
                >

                    {service.Services?.map((item) => (
                        <ServiceCard key={item.Id} {...item} />
                    ))}
                </Grid>
            </div>
        </Box>
    );
};

export default ServiceCardWrap;