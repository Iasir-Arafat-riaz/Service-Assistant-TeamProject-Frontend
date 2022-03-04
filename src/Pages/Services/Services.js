import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
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
    paddingTop: "20px",
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
  //console.log(allServices);

  const drawerWidth = 240;
  //console.log(allServices);
  const handleNavClick = (id) => {
    const url = `/SERVICES/#${id}`;
    //console.log(url);
    navigate(url);
  };

  useEffect(() => {
    dispatch(loadServiceCategory());
    dispatch(singleService());
  }, []);

  if (serviceIsLoading) {
    return <Loading/>
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
                      const ID = item.Category.split(" ")
                        .join("")
                        .toLowerCase();
                      return (
                        <ListItem key={item._id}>
                          <ListItemButton>
                            <ListItemText>
                              <HashLink
                                smooth
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
                </Drawer>
              </Grid>
              <Grid>
                {/* <Typography sx={{ textAlign: "center", fontWeight: 'bold' }} gutterBottom variant="h4" component="div">OUR ALL SERVICES</Typography> */}
                <Grid>
                  {allServices.map((service) => {
                    const divID = service.Category.split(" ")
                      .join("")
                      .toLowerCase();
                    return (
                      <div
                        id={divID}
                        key={`${service._id}${service.Category}`}
                        className={classes.subServices}
                      >
                        <Typography sx={{ pb: 2 }} variant="h4" gutterBottom component="div">{service.Category}</Typography>

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
                  })}
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
