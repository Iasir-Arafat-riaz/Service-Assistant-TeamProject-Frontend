import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavHashLink } from 'react-router-hash-link';
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
import { allData, loadServiceCategory, singleService } from "../../redux/dataSlice/dataSlice";
import Loading from "../SharedRoute/Loader/Loading";
import './Services.css';
import { Box } from "@mui/system";

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

const Services = (props) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { allServices, serviceIsLoading } = useSelector(allData);
  const classes = useStyles();
<<<<<<< HEAD
  console.log(allServices);

  const drawerWidth = 240;
  console.log(allServices);
=======
  //console.log(allServices);
  const { window } = props;

  const sidebarRef = useRef(null);
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };

  // useEffect(() => {
  //   window.addEventListener('scroll', () => {
  //     const scroll = window.pageYOffset;
  //     if (scroll > 100) {
  //       if (sidebarRef.current) {
  //         sidebarRef.current.classList.add("scroll-sidebar");
  //       }
  //     } else {
  //       // sidebarRef.current.classList.remove("scroll-sidebar");
  //     }
  //   })
  // }, [])


  const drawerWidth = 270;
  //console.log(allServices);
>>>>>>> remotes/origin/mahfujStore
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
    return <Loading />
<<<<<<< HEAD
  }
=======
  };


>>>>>>> remotes/origin/mahfujStore

  return (
    <>
      <Navigation />
<<<<<<< HEAD
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
                    const divID = service.Category?.split(" ")
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

                          {service.Services?.map((item) => (
                            <ServiceCard key={item.Id} {...item} />
                          ))}
                        </Grid>
                      </div>
                    );
                  })}
                </Grid>
              </Grid>
            </div>
=======

      <Container sx={{ mt: 15 }}>

        <Typography variant="h4" sx={{ fontSize: '32px', fontWeight: 600, color: "#323334", mb: 3, ml: 1.5 }}>All Services</Typography>


        <Grid container>


          <Grid item lg={3}>

            <Box className="sidebar" ref={sidebarRef}>

              {
                allServices.map((item) => {
                  const ID = item.Category.split(" ")
                    .join("")
                    .toLowerCase();
                  return (
                    // <a to={`/services/#${ID}`}>{item.Category}</a>
                    <ListItem
                      sx={{ p: 0 }}
                      key={item._id}
                    >

                      <NavHashLink
                        smooth
                        className="list_item"
                        tabIndex={4}
                        to={`/services/#${ID}`}
                      >
                        {item.Category}
                      </NavHashLink>

                      {/* <NavL ink exact activeClassName="active" to={`/services/#${ID}`} >{item.Category}</NavLink> */}

                    </ListItem>
                  );
                })
              }

            </Box>

          </Grid>

          <Grid item lg={9}>

            <Box className="content" sx={{ mt: -2 }}>

              {
                allServices.map((service) => {
                  const divID = service.Category.split(" ")
                    .join("")
                    .toLowerCase();
                  return (
                    <div
                      id={divID}
                      key={`${service._id}${service.Category}`}
                      className={classes.subServices}
                    >
                      <Typography sx={{ pb: 2, fontSize: '24px', color: "rgba(0,0,0,.8)", fontWeight: 600 }} variant="h5" gutterBottom component="div">{service.Category}</Typography>

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
                })
              }

            </Box>

          </Grid>

        </Grid>





        <Grid container>
          {/* <div style={{ display: "flex" }}> */}
          <Grid item >

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
>>>>>>> remotes/origin/mahfujStore
          </Grid>
          {/* </div> */}
        </Grid>
      </Container >
    </>
  );
};

export default Services;
