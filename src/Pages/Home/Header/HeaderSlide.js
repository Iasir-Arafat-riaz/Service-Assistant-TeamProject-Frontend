import { Container, Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import 'aos/dist/aos.css';
const HeaderSlide = ({ banner,imageLoading,handleImageLoaded }) => {
    const targetRef = useRef();
    const [isVisible, setIsVisible] = useState(false);
    // const [imageLoading,setimageLoading] = useState(true)
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

   useEffect(() => {
    window.addEventListener("load", event => {
        const image = document.querySelector('img');
        const isLoaded = image.complete && image.naturalHeight !== 0;
        // setimageLoading(false)
        handleImageLoaded(false)
    });
   },[])
    
    return (
        <>

{imageLoading && <i style={{marginTop:100,marginLeft:10, position:'absolute', transform:'rotate(-40deg)'}}>Loading...</i>}


{
        imageLoading &&   <Skeleton variant="rectangular" width={window.innerWidth} height={window.innerHeight}/>        
}
 <Box
        className={imageLoading ? 'slide_active' : ''}
            ref={targetRef}

            sx={{
                backgroundImage: `url(${banner.imageUrl})`,
                backgroundColor:'white',
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
                sx={{ height: "100%",ml:15, display: "flex", alignItems: "center" }}
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
                        <h4 style={{ fontWeight: 'bolder'}}>{banner.bannerText}</h4>
                    </Box>
                    <Box
                        data-aos="fade-left"
                        data-aos-delay="300"
                        data-aos-easing="linear"
                        data-aos-duration="500"
                        className={isVisible ? 'aos-init aos-animate text1' : 'aos-init text1'}

                    >
                        <h4 style={{ fontWeight: 'bolder'}}>{banner.bannerTex2}</h4>
                    </Box>
                </Box>
            </Container>
        </Box>
        </>
    );
};

export default HeaderSlide;