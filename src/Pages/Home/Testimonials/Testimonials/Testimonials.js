import { Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

// import "swiper/components/navigation/navigation.min.css";
// import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper.min.css";
import Testimonial from "../Testimonial/Testimonial";
SwiperCore.use([Navigation, Pagination, Autoplay]);

const Testimonials = () => {
  const [testimonialData, setTestimonialData] = useState([]);

  useEffect(() => {
    axios.get("/Testimonial.json").then((res) => setTestimonialData(res.data));
  }, []);

  return (
    <Container sx={{ mb: 20 }}>
      {/* testimonials  */}
      <Swiper
        loop={true}
        style={{ padding: 6 }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={true}
        grabCursor={true}
        slidesPerView={1}
        speed={600}
        spaceBetween={20}
      >
        {testimonialData.map((testiominal) => (
          <SwiperSlide key={testiominal.id}>
            <Testimonial testiominal={testiominal} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Testimonials;
