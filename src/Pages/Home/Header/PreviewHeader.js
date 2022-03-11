import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const PreviewHeader = ({ bannerInfo, banner }) => {
  const { imageUrl, bannerText, bannerNumber, id, bannerTex2 } = bannerInfo;

  // //console.log("this is banners datas",banner)

  if (!imageUrl) {
    return (
      <Box>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Preview Banner
        </Typography>
        <br />
        <Box
          sx={{
            backgroundImage: `url(${banner.imageUrl})`,
            padding: " 70px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100%",
          }}
        >
          <br />
          <article type="button"></article>

          <Typography
            variant="h6"
            align={"center"}
            sx={{ textShadow: "1px 1px  black", color: "silver" }}
          >
            <b>
              <i>{banner.bannerText}</i>
            </b>
          </Typography>
          <Typography
            variant="h6"
            align={"center"}
            sx={{ textShadow: "1px 1px  black", color: "silver" }}
          >
            <b>
              <i>{banner.bannerTex2}</i>
            </b>
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ mt: 1 }}>
          Banner Text : {banner.bannerText}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          Banner Text-2 : {banner.bannerTex2}
        </Typography>

        {/* <Button size="small">{banner.bannerNumber}</Button> */}
      </Box>
    );
  } else {
    return (
      <Box>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Preview Banner
        </Typography>
        <br />
        <Box
          sx={{
            backgroundImage: `url(${imageUrl})`,
            padding: "140px 0",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <br />
          <article type="button"></article>
          <Typography
            variant="h6"
            align={"center"}
            sx={{ textShadow: "1px 1px  black", color: "silver" }}
          >
            <b>
              <i>{bannerText}</i>
            </b>
          </Typography>
          <Typography
            variant="h6"
            align={"center"}
            sx={{ textShadow: "1px 1px  black", color: "silver" }}
          >
            <b>
              <i>{bannerTex2}</i>
            </b>
          </Typography>
        </Box>
        <Typography>Banner Text : {bannerText}</Typography>
        <Typography>Banner Text-2 : {bannerTex2}</Typography>

        {/* <Button size="small">{bannerNumber}</Button> */}
      </Box>
    );
  }
};

export default PreviewHeader;
