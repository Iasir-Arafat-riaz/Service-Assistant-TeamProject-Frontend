import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography } from "@mui/material";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const { allServices, serviceIsLoading } = useSelector(allData);
  const classes = useStyles();
  const location = useLocation();

  const drawerWidth = 240;
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
        <Typography
          variant="h4"
          sx={{
            fontSize: "32px",
            fontWeight: 600,
            color: "#323334",
            mb: 3,
            ml: 1.5,
          }}
        >
          All Services
        </Typography>

        <Grid container>
          <Grid item lg={3}>
            <Box className="sidebar" >
              {allServices.map((item) => {
                const ID = item.Category.split(" ").join("").toLowerCase();
                return (
                  // <a to={`/services/#${ID}`}>{item.Category}</a>
                  <ListItem sx={{ p: 0 }} key={item._id}>
                    <ListItemButton
                      component={NavHashLink}
                      smooth
                      className={
                        location.hash === "#" + ID ? "select-service" : ""
                      }
                      to={`/services/#${ID}`}
                    >
                      <ListItemText>{item.Category}</ListItemText>
                    </ListItemButton>

                    {/* <NavHashLink
                        smooth
                        className="list_item"
                        tabIndex={4}
                        to={`/services/#${ID}`}
                      >
                        {item.Category}
                      </NavHashLink> */}

                    {/* <NavL ink exact activeClassName="active" to={`/services/#${ID}`} >{item.Category}</NavLink> */}
                  </ListItem>
                );
              })}
            </Box>
          </Grid>

          <Grid item lg={9}>
            <Box className="content" sx={{ mt: -2 }}>
            {allServices.map((service) => <ServiceCardWrap service={service} classes={classes}></ServiceCardWrap>)}
              
            </Box>
          </Grid>
        </Grid>

        <Grid container>
          {/* <div style={{ display: "flex" }}> */}
          <Grid item>
            {/* <Drawer


            >

              <List className={classes.listBottomPadding} >
                {allServices.map((item) => {
                  const ID = item.Category.split(" ")
                    .join("")
                    .toLowerCase();
                  return (
                    <ListItem key={item._id}>
                      <ListItemButton>
                        <ListItemText>
                          <HashLink
                            id="sidenavlink"
                            smooth
                            tabIndex="42"
                            to={`/services/#${ID}`}
                            className={classes.linkClass}
                          >
                            {item.Category}
                          </HashLink>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Drawer> */}
          </Grid>
          <Grid>
            {/* <Typography sx={{ textAlign: "center", fontWeight: 'bold' }} gutterBottom variant="h4" component="div">OUR ALL SERVICES</Typography> */}
            <Grid>
              {/* {allServices.map((service) => {
                const divID = service.Category.split(" ")
                  .join("")
                  .toLowerCase();
                return (
                  <div
                    id={divID}
                    key={`${service._id}${service.Category}`}
                    className={classes.subServices}
                  >
                    <Typography sx={{ pb: 2 }} variant="h5" gutterBottom component="div">{service.Category}</Typography>

                    <Grid
                      container
                      alignItems="stretch"
                      className={classes.gridMargin}
                      spacing={3}
                    >

                      {service.Services.map((item) => (
                        <ServiceCard key={item.Id} {...item} />
                      ))}
                    </Grid>
                  </div>
                );
              })} */}
            </Grid>
          </Grid>
          {/* </div> */}
        </Grid>
      </Container>
    </>
  );
};

export default Services;
