import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import 'aos/dist/aos.css';
const HeaderSlide = ({ banner }) => {
    const targetRef = useRef();
    const [isVisible, setIsVisible] = useState(false);
    const options = useMemo(() => {
        return {
            root: null,
            rootMargin: '0px',
            threshold: 1
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
    return (
        <Box
            ref={targetRef}
            sx={{
                backgroundImage: `url(${banner.imageUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "calc(100vh)",
            }}
            key={banner._id}
            type="button"
        >
            {/* <img type="button" src={banner.imageUrl} alt="" /> */}
            <Container
                maxWidth="md"
                sx={{ height: "100%", display: "flex", alignItems: "center" }}
            >
                <Box >
                    <Box id="commonBannerText"
                        data-aos="fade-left"
                        data-aos-delay="100"
                        data-aos-easing="linear"
                        data-aos-duration="500"
                        className={isVisible ? 'aos-init aos-animate' : 'aos-init'}
                    >
                        <Typography variant="h6">
                            Service Deliver with professionalism
                        </Typography>
                    </Box>
                    <Box
                        data-aos="fade-left"
                        data-aos-delay="200"
                        data-aos-easing="linear"
                        data-aos-duration="500"
                        className={isVisible ? 'aos-init aos-animate text1' : 'aos-init text1'}

                    >
                        <Typography variant='h3'>{banner.bannerText}</Typography>
                    </Box>
                    <Box
                        data-aos="fade-left"
                        data-aos-delay="300"
                        data-aos-easing="linear"
                        data-aos-duration="500"
                        className={isVisible ? 'aos-init aos-animate text1' : 'aos-init text1'}

                    >
                        <Typography variant='h3'>{banner.bannerTex2}</Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default HeaderSlide;