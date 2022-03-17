import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import SavedSearchOutlinedIcon from '@mui/icons-material/SavedSearchOutlined';
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ReviewsIcon from "@mui/icons-material/Reviews";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PaymentIcon from "@mui/icons-material/Payment";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink, useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HandymanIcon from "@mui/icons-material/Handyman";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import Avatar from "@mui/material/Avatar";
import { Outlet } from "react-router-dom";
import logo from "../images/web-logo.png";
import PersonIcon from '@mui/icons-material/Person';

import DoneAllIcon from '@mui/icons-material/DoneAll';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AnchorIcon from '@mui/icons-material/Anchor';

import { useSelector } from "react-redux";
import { allData } from "../../redux/dataSlice/dataSlice";
import ContactSupportIcon from '@mui/icons-material/ContactSupport';




const drawerWidth = 240;
const Dashboard = (props) => {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const goHome = () => {
    navigate("/home")
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { user } = useSelector(allData)

  const drawer = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Avatar
          sx={{ width: 70, height: 70 }}
          src={user?.photoURL}
          alt='admin img'
        />
        <Typography variant="h6" gutterBottom mt={1}>
          {user?.displayName}
        </Typography>
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <NavLink style={{ textDecoration: "none", color: "gray" }} to="/home">
          <Button color="inherit">Home</Button>
        </NavLink>
        <NavLink
          style={{ textDecoration: "none", color: "gray" }}
          to="/services"
        >
          <Button color="inherit">SERVICES</Button>
        </NavLink>
      </Box>
      <Divider />
      <List>
        {
          <Box>
            
            <ListItem
              component={NavLink}
              to={`/dashboard/overview`}
              button
            >
              <ListItemIcon>
                <ManageSearchIcon />
              </ListItemIcon>
              <ListItemText primary={"Over view"} />
            </ListItem>
            {/* Service Provider Overview */}
            <ListItem
              component={NavLink}
              to={`/dashboard/providerOverview`}
              button
            >
              <ListItemIcon>
                <AnchorIcon />
              </ListItemIcon>
              <ListItemText primary={"Provider Overview"} />
            </ListItem>

            <ListItem
              component={NavLink}
              to={`/dashboard/manageAllOrders`}
              button
            >
              <ListItemIcon>
                <RateReviewIcon />
              </ListItemIcon>
              <ListItemText primary={"Manage all orders"} />
            </ListItem>
            <ListItem
              component={NavLink}
              to={`/dashboard/adminChat`}
              button
            >
              <ListItemIcon>
                <ContactSupportIcon />
              </ListItemIcon>
              <ListItemText primary={"Chat with user"} />
            </ListItem>
            <ListItem
              component={NavLink}
              to={`/dashboard/ordersChat`}
              button
            >
              <ListItemIcon>
                <ContactSupportIcon />
              </ListItemIcon>
              <ListItemText primary={"Orders Chat"} />
            </ListItem>

            <ListItem
              component={NavLink}
              to={`/dashboard/manageproducts`}
              button
            >
              <ListItemIcon>
                <HandymanIcon />
              </ListItemIcon>
              <ListItemText primary={"Manage Products"} />
            </ListItem>


            <ListItem
              component={NavLink}
              to={`/dashboard/addproduct`}
              button
            >
              <ListItemIcon>
                <RateReviewIcon />
              </ListItemIcon>
              <ListItemText primary={"Add Products"} />
            </ListItem>


            <ListItem 

              component={NavLink}
              to={`/dashboard/addBanner`}
              button
            >
              <ListItemIcon>
                <AddPhotoAlternateIcon />
              </ListItemIcon>
              <ListItemText primary={"Add Banner"} />
            </ListItem>


            {/* service request dashbord menu item - by sagar */}
            <ListItem
              component={NavLink}
              to={`/dashboard/make-service-request`}
              button
            >
              <ListItemIcon>
                <RateReviewIcon />
              </ListItemIcon>
              <ListItemText primary={"Make Service Request"} />
            </ListItem>

            {/* see all the pending reqest menu item - by sagar */}
            <ListItem
              component={NavLink}
              to={`/dashboard/all-pending-services`}
              button
            >
              <ListItemIcon>
                <RateReviewIcon />
              </ListItemIcon>
              <ListItemText primary={"Pending Service Request"} />
            </ListItem>

            {/* add new service category for admin - by sagar */}

            <ListItem
              component={NavLink}
              to={`/dashboard/add-service-category`}
              button
            >
              <ListItemIcon>
                <RateReviewIcon />
              </ListItemIcon>
              <ListItemText primary={"Add Service Category"} />
            </ListItem>


            <ListItem
              component={NavLink}
              to={`/dashboard/provider/appointment`}
              button
            >
              <ListItemIcon>
                <AnchorIcon />
              </ListItemIcon>
              <ListItemText primary={"Appointment"} />
            </ListItem>

            <ListItem
              component={NavLink}
              to={`/dashboard/makeAdmin`}
              button
            >
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Add Admin"} />
            </ListItem>
            <ListItem
              component={NavLink}
              to={`/dashboard/myorders`}
              button
            >
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary={"My Orders"} />
            </ListItem>

            <ListItem
              component={NavLink}
              to={`/dashboard/servicerequest`}
              button
            >
              <ListItemIcon>
                <DoneAllIcon />
              </ListItemIcon>
              <ListItemText primary={"Service Request"} />
            </ListItem>

            <ListItem
              component={NavLink}
              to={`/Dashboard/addtestimonial`}
              button
            >
              <ListItemIcon>
                <ReviewsIcon />
              </ListItemIcon>
              <ListItemText primary={"Add Testimonial"} />
            </ListItem>

            <ListItem
              component={NavLink}
              to={`/Dashboard/pendingtestimonial`}
              button
            >
              <ListItemIcon>
                <AutorenewIcon />
              </ListItemIcon>
              <ListItemText primary={"Pending Testimonial"} />
            </ListItem>

            <ListItem
              component={NavLink}
              to={`/Dashboard/managetestimonials`}
              button
            >
              <ListItemIcon>
                <ManageSearchIcon />
              </ListItemIcon>
              <ListItemText primary={"Manage Testimonial"} />
            </ListItem>

            <ListItem
              component={NavLink}
              to={`/Dashboard/savedservice`}
              button
            >
              <ListItemIcon>
                <SavedSearchOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Saved Service"} />
            </ListItem>

            <ListItem
              component={NavLink}
              to={`/Dashboard/becomeaprovider`}
              button
            >
              <ListItemIcon>
                <SavedSearchOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={user.role === 'provider' ? "Add another service" : "Become a provider ?"} />
            </ListItem>

            <ListItem
              component={NavLink}
              to={`/Dashboard/pendingprovider`}
              button
            >
              <ListItemIcon>
                <SavedSearchOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Pending Providers"} />
            </ListItem>


          </Box>
        }
        <ListItem button>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary={"LogOut"} />
        </ListItem>
      </List>
      <Divider />
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const navStyle = {
    backgroundColor: "white",
    color: "black",
    boxShadow:
      " 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        style={navStyle}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <img onClick={goHome} src={logo} width="120" alt="weblogo" />
          </Box>
          <Typography sx={{ display: { xs: "none", md: "block" } }}>
            <NavLink
              style={{ textDecoration: "none", color: "gray" }}
              to="/home"
            >
              <Button color="inherit">Home</Button>
            </NavLink>
            <NavLink
              style={{ textDecoration: "none", color: "gray" }}
              to="/services"
            >
              <Button color="inherit">SERVICES</Button>
            </NavLink>
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 10,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Outlet></Outlet>
      </Box>
    </Box>
  );
};

export default Dashboard;
