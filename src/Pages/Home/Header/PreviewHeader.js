import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";


const PreviewHeader = ({ bannerInfo }) => {
  const { imageUrl, bannerText, quality } = bannerInfo;

  return (
    <Box>
        
       <Typography variant="h4">
        <b>Preview</b>
      </Typography>
      <br />
      <Box
        sx={{
          backgroundImage: `url(${imageUrl})`,
          padding: "140px 0",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      >
        <br />
        <article type="button">
        
        </article>
        <Typography variant="h6" align={"center"} sx={{textShadow:"1px 1px  black",color:"silver"}}><b><i>{bannerText}</i></b></Typography>
        
      </Box>
      <Typography>Banner Text : {bannerText}</Typography>
        
        <Button size="small">{quality}</Button>
       
    </Box>
  );
};

export default PreviewHeader;
