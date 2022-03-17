import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavHashLink } from 'react-router-hash-link';
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { makeStyles } from "@mui/styles";
import ServiceCard from "./Component/ServiceCard";
import Navigation from "../SharedRoute/Navigation/Navigation";
import { allData, loadServiceCategory, singleService } from "../../redux/dataSlice/dataSlice";
import Loading from "../SharedRoute/Loader/Loading";
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

const Services = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allServices, serviceIsLoading } = useSelector(allData);
  const classes = useStyles();
  const location = useLocation()

  const drawerWidth = 240;
  const handleNavClick = (id) => {
    const url = `/SERVICES/#${id}`;
    console.log(url);
    navigate(url);
  };

  useEffect(() => {
    dispatch(loadServiceCategory());
    dispatch(singleService());
  }, []);

  if (serviceIsLoading) {
    return <Loading />
  }

  return (
    <>
      <Navigation />
      <div style={{ marginTop: "80px" }}>
        <Container>
          <Grid container>
            <div style={{ display: "flex" }}>
              <Grid item>
                <Drawer
                  sx={{ width: drawerWidth }}
                  variant="permanent"
                  anchor="left"
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                >
                  <List className={classes.listBottomPadding}>
                    {allServices.map((item) => {
                      const ID = item?.Category?.split(" ")
                        .join("")
                        .toLowerCase();
                      return (
                        <ListItem key={item._id} sx={{ pr: 0 }}>
                          <ListItemButton
                            component={NavHashLink}
                            smooth
                            className={location.hash === '#' + ID ? 'select-service' : ""}
                            to={`/services/#${ID}`}
                          >
                            <ListItemText
                            >
                              {item.Category}
                            </ListItemText>
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Drawer>
              </Grid>
              <Grid>
                {/* <Typography sx={{ textAlign: "center", fontWeight: 'bold' }} gutterBottom variant="h4" component="div">OUR ALL SERVICES</Typography> */}
                <Grid>
                  {allServices.map((service) => <ServiceCardWrap service={service} classes={classes}></ServiceCardWrap>)}
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Services;
