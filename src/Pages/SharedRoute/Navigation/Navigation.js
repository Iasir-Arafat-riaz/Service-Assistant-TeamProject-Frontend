import React, { useEffect , useState} from "react";
import axios from 'axios'
import {
  Divider,
  Drawer,
  List, 
  ListItem,
  ListItemText,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu, Avatar, Button, Tooltip, MenuItem, Container,
} from "@mui/material";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Popover from '@mui/material/Popover';
import Badge from '@mui/material/Badge';
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { GrLogout } from "react-icons/gr";
import { useTheme } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { AiOutlineHome } from "react-icons/ai";
import logo from '../../images/web-logo.png';
import { MdOutlineDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { allData } from "../../../redux/dataSlice/dataSlice";
import useFirebase from "../../../Hooks/useFirebase";
import "./Navigation.css";

const Navigation = () => {
  const navigate = useNavigate()
  const theme = useTheme();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [state, setState] = React.useState(false);  
  const { user } = useSelector(allData);
  const { handleSignOut } = useFirebase();
  const goHome = () => {
    navigate("/home")
  }
  // Mui popover for notificatio 
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [notificationNumber, setNotificationNumber] = useState([])
  useEffect(() => {
    const api = `http://fierce-meadow-12011.herokuapp.com/notification/${user?.email}`
    axios.get(api).then((res) => {
      console.log(res.data,"got notification");
      setNotificationNumber(res.data)
      
    });
    window.addEventListener("scroll", () => {
      const scroll = window.pageYOffset;
      if (scroll > 100) {
        document.getElementById("navbar").classList.add("scroll-nav");
      } else {
        document.getElementById("navbar").classList.remove("scroll-nav");
      }
    });
  }, [user]);

  // setSearchValue("Hello world")
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleUserLogin = () => {
    navigate("/login")
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // nav button
  const navButton = {
    width: "25px",
    height: "25px",
    borderRadius: "50px",
    padding: "8px",
    marginRight: "20px",
    backgroundColor: "#FF5E14",
    color: "whiteSmoke",
  };
  // link of navbar
  const navLink = {
    textDecoration: "none",
    color: "black",
    fontWeight: 600,
    marginRight: "15px",
    letterSpacing: "3px",
    fontSize: "15px",
  };

  // search popup

  const openSearchBox = () => {
    document.querySelector("#myOverlay").style.display = "block";
  };
  const closeSearchBox = () => {
    document.querySelector("#myOverlay").style.display = "none";
  };

  // form submit
  const handaleSubmitForm = (e) => {
    e.preventDefault();
  };

  // trigger button
  useEffect(() => {
    let input = document.getElementById("search");
    input.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        closeSearchBox();
      }
    });
  }, []);

  // style sheets

  const useStyle = makeStyles({
    navIcon: {
      [theme.breakpoints.up("md")]: {
        display: "none !important",
      },
      [theme.breakpoints.down("md")]: {
        marginLeft: "95% !important",
      },
    },
    navbar: {
      [theme.breakpoints.down("md")]: {
        height: "70px !important",
      },
    },

    navItemContainer: {
      [theme.breakpoints.down("md")]: {
        display: "none !important",
      },
    },
    navLogo: {
      [theme.breakpoints.down("md")]: {
        position: "absolute",
        bottom: "50px",
      },
    },
  });
  const { navIcon, navItemContainer, navLogo, navbar } = useStyle();

  const list = (
    <Box sx={{ width: 250 }} role="presentation">
      <List sx={{ mt: "50%" }}>
        <Divider sx={{ color: "#98a1bc" }} />
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <ListItem button>
            <ListItemText>
              <AiOutlineHome /> HOME
            </ListItemText>
          </ListItem>
        </Link>
        <Divider sx={{ color: "#98a1bc" }} />
        <Link to="/cycles" style={{ textDecoration: "none", color: "black" }}>
          <ListItem button>
            <ListItemText>
              {/* <BsBicycle />    CYCLES */}
              services
            </ListItemText>
          </ListItem>
        </Link>
        <Divider sx={{ color: "#98a1bc" }} />
        <Link
          to="/dashboards"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem button>
            <ListItemText>
              <MdOutlineDashboard /> DASHBOARD
            </ListItemText>
          </ListItem>
        </Link>
        <Divider sx={{ color: "#98a1bc" }} />
        <ListItem>
          {user?.email && (
            <ListItemText sx={{ color: "black" }}>
              <img
                src={user?.photoURL}
                style={{
                  width: "40px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
                alt="userImage"
              />
              {user?.displayName}
            </ListItemText>
          )}
        </ListItem>
        {user?.email && <Divider sx={{ color: "#98a1bc" }} />}
      </List>
    </Box>
  );

  return (
    <Container id="back-to-top-anchor">
      <AppBar
        id="navbar"
        className={navbar}
        position="fixed"
        style={{ boxShadow: "none" }}
        sx={{ paddingX: 3, paddingY: 1, background: "none" }}
      >
        <IconButton
          sx={{ mr: 40, zIndex: 999999, color: "#FF5E14" }}
          onClick={() => setState(true)}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          style={{ zIndex: "99" }}
          className={navIcon}
        >
          <MenuIcon />
        </IconButton>

        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between", ml: 2 }}
        >
          <Box>

            <img onClick={goHome} className={navLogo} src={logo} width="120" alt="weblogo" />
          </Box>

          <Box style={{ zIndex: "9999" }} className={navItemContainer}>
            <Button variant="text">
              <NavLink style={navLink} to="/home">
                HOME
              </NavLink>
            </Button>

            <Button variant="text">
              {" "}
              <NavLink style={navLink} to="/services">
                SERVICES
              </NavLink>
            </Button>


            <Button variant="text">
              {" "}
              <NavLink style={navLink} to="/dashboard">
                DASHBOARD
              </NavLink>
            </Button>

            <Button variant="text">
              {" "}
              <NavLink style={navLink} to="/contact">
                CONTACT US
              </NavLink>
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }} className={navItemContainer}>
            {/* search button */}
            <Tooltip arrow title="Search...">
              <SearchIcon
                type="button"
                onClick={openSearchBox}
                style={navButton}
              />
            </Tooltip>

            {!user?.email && (

              <Button variant="text" onClick={handleUserLogin}>
                <Tooltip arrow title="My account">
                  <ManageAccountsIcon
                    onClick={() => setOpenModal(true)}
                    style={navButton}
                  />
                </Tooltip>
              </Button>
            )}

            {user?.email && (
              <>
                <> 
                
                   
                    <Button aria-describedby={id} variant="" onClick={handleClick}>
                    <Badge badgeContent={notificationNumber.length} color="primary">
                      <NotificationsNoneIcon  className="svg_icons" color="action"></NotificationsNoneIcon >
                       
                    </Badge> 
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
          {
            notificationNumber.map(notificationMessage=>
            //   <div className="notificationBar">
              
            //   <div><img src={notificationMessage.image} alt="notification image" width="120px" height="60px"></img></div>
            //   <div>
                
            //   {notificationMessage.message} <br>
            //   </br>
            //   provider name: Ac service <br>
            //   </br>
            //   Date: 24 january, 2022
            //   </div>
             
            // </div>
            <div class="notifi-box" id="box">
            {/* <h2>Notifications <span>17</span></h2> */}
            <div class="notifi-item">
              <img src={notificationMessage.image} width="120px" height="60px"  alt="img"/>
              <div class="text">
                 <h4>Elias Abdurrahman</h4>
                 <p>@lorem ipsum dolor sit amet</p>
                </div> 
            </div>
      
      
          </div>

            )
              }</Typography>
      </Popover>
      
       </>
              <Tooltip arrow title="My Account">
                <IconButton onClick={handleOpenUserMenu}  >
                  <Avatar alt="Remy Sharp" src={user?.photoURL} />
                </IconButton>
              
              </Tooltip>
              </>
            )}

            {user?.email && (
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* menu items */}
                         
                  
                    
                <MenuItem
                  sx={{ display: "grid", gap: 1, justifyContent: "center" }}
                >
  
                  <Box
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Avatar
                      style={{ borderRadius: "50%", margin: "0 auto" }}
                      src={user?.photoURL}
                      alt="user img"
                    />
                  </Box>

                  <Typography sx={{ textAlign: "center" }}>
                    {user?.displayName}
                  </Typography>

                  <Typography sx={{ textAlign: "center" }}>
                    {user?.email}
                  </Typography>

                </MenuItem>
                <MenuItem
                  sx={{ display: 'flex', justifyContent: 'center' }}
                  onClick={handleSignOut}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    <GrLogout /> Log Out
                  </Typography>
                </MenuItem>
              </Menu>
            )}
          </Box>


        </Toolbar>


      </AppBar>
      <React.Fragment>
        <Drawer open={state} onClose={() => setState(false)}>
          {list}
        </Drawer>
      </React.Fragment>

      <Box id="myOverlay" className="overlay">
        <span
          className="closebtn"
          onClick={closeSearchBox}
          title="Close Overlay"
        >
          ×
        </span>
        <Box className="overlay-content">
          <form id="search" onSubmit={handaleSubmitForm}>
            <input
              type="search"
              placeholder="Search.."
              name="search"
            />
          </form>
        </Box>
      </Box>
    </Container >
  );
};
export default Navigation;
