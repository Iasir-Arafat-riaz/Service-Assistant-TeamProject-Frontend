import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { makeStyles } from "@mui/styles";
import { loadServiceCategory } from "../../redux/Reducers/reducersSagar/servicesSlice";
import ServiceCard from "./Component/ServiceCard";
import { Link } from "react-router-dom";

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
    paddingTop: "100px",
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
  const { allServices, serviceIsLoading } = useSelector(
    (state) => state.serviceCategoryState
  );
  const classes = useStyles();

  const drawerWidth = 240;

  const handleNavClick = (id) => {
    const url = `/SERVICES/#${id}`;
    console.log(url);
    navigate(url);
  };

  useEffect(() => {
    const service = dispatch(loadServiceCategory());
  }, []);

  if (serviceIsLoading) {
    return <h1 style={{ marginTop: "100px" }}>Loading....</h1>;
  }

  let menuItem;
  // if (allServices.length > 0){
  //   menuItem = allServices.map(ite )
  // }

  return (
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
                    const ID = item.Category.split(" ").join("").toLowerCase();
                    return (
                      <ListItem key={item._id}>
                        <ListItemButton>
                          <ListItemText>
                            <HashLink
                              smooth
                              to={`/SERVICES/#${ID}`}
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
              <h1>Our All Services</h1>
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
  );
};

export default Services;
