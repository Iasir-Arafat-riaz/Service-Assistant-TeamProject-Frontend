import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { useSelector, useDispatch } from "react-redux";
import { Grid, IconButton, Typography } from "@mui/material";
import { Container } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { makeStyles } from "@mui/styles";
import ServiceCard from "./ServiceCard";
import Navigation from "../SharedRoute/Navigation/Navigation";
import {
  allData,
  loadServiceCategory,
  singleService,
} from "../../redux/dataSlice/dataSlice";
import Loading from "../SharedRoute/Loader/Loading";
import "./Services.css";
import { Box } from "@mui/system";
import ServiceCardWrap from "./Component/ServiceCardWrap";
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const useStyles = makeStyles({
  drawerPaper: {
    marginTop: "100px",
    zIndex: 0,
  },
  root: {
    display: "flex",
  },
  gridMargin: {
    marginBottom: "50px",
    marginTop: "50px",
    boxShadow: "none",
  },
  subServices: {
    px: 2,
  },
  listBottomPadding: {
    marginBottom: "20px",
  },
  linkClass: {
    textDecoration: "none",
    color: "#000",
  },
});

const Services = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allServices, serviceIsLoading } = useSelector(allData);
  const classes = useStyles();
  const location = useLocation();

  const handleNavClick = (id) => {
    const url = `/SERVICES/#${id}`;
    console.log(url);
    navigate(url);
  };

  useEffect(() => {
    dispatch(loadServiceCategory());
    dispatch(singleService());
  }, [dispatch]);
  if (serviceIsLoading) {
    return <Loading />;
  }
  return (
    <>
      <Navigation />

      <Container sx={{ mt: 15 }}>
        <Grid container>
          <Grid item xs={4} md={3} lg={3} spacing={{ xs: 2, md: 3 }}>
            <Box className="sidebar-wrap"
              sx={{ position: { xs: 'fixed', md: 'fixed' }, }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  color: "#323334",
                  mb: 3,
                  ml: 1.5,
                  fontSize: '17px',
                  display: { xs: 'none', md: 'block' }

                }}
              >
                All Services
              </Typography>

              <Box className="sidebar"
                sx={{ height: { xs: '80vh', md: '75vh' } }}
              >
                {allServices.map((item) => {
                  const ID = item.Category.split(" ").join("").toLowerCase();
                  return (
                    <ListItem sx={{ p: 0 }} key={item._id}>
                      <ListItemButton
                        component={NavHashLink}
                        smooth
                        className={
                          location.hash === "#" + ID ? "select-service" : ""
                        }
                        to={`/services/#${ID}`}
                      >
                        <ListItemText sx={{ display: { xs: 'none', md: 'block' }, px: { xs: 0, md: 1 } }}>{item.Category.length >= 25 ? item.Category.slice(0, 16) + '...' : item.Category}</ListItemText>
                        <ListItemText sx={{ display: { xs: 'block', md: 'none ' }, px: { xs: 0, md: 1 } }} >{item.Category.split(' ')[0].length >= 10 ? item.Category.slice(0, 7) + '...' : item.Category.split(' ')[0]}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={8} md={9} lg={9}>
            <Box className="content" >
              {allServices.map((service) => <ServiceCardWrap service={service} classes={classes}></ServiceCardWrap>)}

            </Box>
          </Grid>
        </Grid>

      </Container>
    </>
  );
};

export default Services;
