import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import { initialRecent } from "../../../utils/utils";
import Slider from "react-slick";
import CommonService from "../HomeServices/CommonService";

const RecentlyViews = () => {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  //console.log(recentIds);

  useEffect(() => {
    // axios
    //   .get("https://fierce-meadow-12011.herokuapp.com/services")
    //   .then((res) => {
    //     const service = [];
    //     res.data.filter((item) => {
    //       item.Services.forEach((ele) => {
    //         // //console.log(recentIds.includes(ele.Id));
    //         if (recentIds.includes(ele.Id)) {
    //           service.push(ele);
    //         }
    //       });
    //     });
    //     // //console.log(recentService);
    //     // setServices(res.data.slice(5, 9));
    //     setServices(service);
    //     setLoading(false);
    //   });
    setServices(initialRecent())


  }, []);

  // slick slider
  const slickSlider = {
    dots: false,
    infinite: false,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };
  // console.log(services[]?.Services[0]?.Id)
  return (
    <Container sx={{ mb: 8 }}>
      {loading ? (
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={"50%"}
          sx={{ mb: 2 }}
          height={30}
        />
      ) : services.length > 0 && (
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
          Recently View
        </Typography>
      )}

      {loading ? (
        <Box sx={{ display: "flex", gap: 5 }}>
          {[...new Array(4)].map(() => (
            <Stack spacing={1}>
              <Skeleton
                variant="rectangular"
                width={250} sx={{ borderRadius: 2 }} height={185}
              />
            </Stack>
          ))}
        </Box>
      )
        :
        services.length > 4 ?
          <Slider {...slickSlider}>
            {
              services.map((service) => (
                <CommonService
                  key={service?._id}
                  service={service}
                />
              ))
            }
          </Slider>
          :
          <Stack direction='row'>
            {
              services.map((service) => (
                <CommonService
                  key={service._id}
                  service={service}
                />
              ))
            }
          </Stack>
      }

    </Container>
  );
};

export default RecentlyViews;
