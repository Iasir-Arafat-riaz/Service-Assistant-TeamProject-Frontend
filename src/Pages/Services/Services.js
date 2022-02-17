import React, { useEffect } from "react";
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

const useStyles = makeStyles({
  drawerPaper: {
    marginTop: "100px",
  },
});

const Services = () => {
  const dispatch = useDispatch();
  const { allServices, serviceIsLoading } = useSelector(
    (state) => state.serviceCategoryState
  );
  const classes = useStyles();

  const drawerWidth = 240;

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
    <div style={{ marginTop: "100px" }}>
      <h1>Our All Services sagar</h1>
      <Container>
        <Grid container>
          <Grid item>
            <Drawer
              sx={{ width: drawerWidth }}
              variant="permanent"
              anchor="left"
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <List>
                {allServices.map((item) => {
                  return (
                    <ListItem key={item._id}>
                      <ListItemButton>
                        <ListItemText>{item.Category}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Drawer>
          </Grid>
          <Grid item>
            <Grid container>
              {allServices.map((service) => (
                <Grid container key={`${service._id}${service.Category}`}>
                  {service.Services.map((item) => (
                    <ServiceCard key={item.Id} {...item} />
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Services;
