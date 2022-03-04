import React, { useEffect, useRef, useState } from "react";
import axios from 'axios'
import { Divider, Drawer, List, ListItem, ListItemText, AppBar, Box, Toolbar, IconButton, Typography, Menu, Avatar, Button, Tooltip, MenuItem, Container, ListItemIcon, } from "@mui/material";
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
import logo from "../../images/web-logo.png";
import { MdOutlineDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { allData, getNotification } from "../../../redux/dataSlice/dataSlice";
import notificationIcon from '../../images/notification-icon.jpg';
import useFirebase from "../../../Hooks/useFirebase";
import "./Navigation.css";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";

const Navigation = () => {

  const navRef = useRef(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [state, setState] = React.useState(false);
  const { user, notificationCount } = useSelector(allData);
  const { handleSignOut } = useFirebase();
  const dispatch = useDispatch();
  const goHome = () => {
    navigate("/home")
  }
  // Mui popover for notificatio 
  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [notifications, setNotifications] = useState([])
  useEffect(() => {
    const api = `http://localhost:5000/notification/getnotification?email=${user?.email}`
    axios.get(api).then((res) => {
      setNotifications(res.data)

    });
    // 
    // dispatch(getNotification(user?.email))

  }, [notificationCount])

  // const number = Math.random() * 100

  console.log(notificationCount)


  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scroll = window.pageYOffset;
      if (scroll > 100) {
        // document.getElementById("navbar").classList.add("scroll-nav");
        if (navRef.current) {
          navRef.current.classList.add("scroll-nav");
        }
      } else {
        // document.getElementById("navbar").classList.remove("scroll-nav");
        if (navRef.current) {
          navRef.current.classList.remove("scroll-nav");
        }
      }
    });
  }, [user]);

  // setSearchValue("Hello world")
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleUserLogin = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // nav button
  const navButton = {
    width: "25px",
    height: "25px",
    borderRadius: "50px",
    padding: "8px",
    marginRight: "0px",
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
        ref={navRef}
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
            <img
              onClick={goHome}
              className={navLogo}
              src={logo}
              width="120"
              alt="weblogo"
            />
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
              <NavLink style={navLink} to="/dashboard/myorders">
                My Order
              </NavLink>
            </Button>

            <Button variant="text">
              {" "}
              <NavLink style={navLink} to="/contact">
                CONTACT US
              </NavLink>
            </Button>
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center" }}
            className={navItemContainer}
          >
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


                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ mx: 3 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Badge badgeContent={notifications?.length} color="primary">


                      <NotificationsNoneIcon className="svg_icons" color="action"></NotificationsNoneIcon >
                    </Badge>

                    {/* <Avatar sx={{ width: 32, height: 32 }}>M</Avatar> */}


                  </IconButton>

                  <Menu sx={{

                  }}
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,

                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        height: 300,
                        width: 400,
                        overflowY: 'scroll',
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    {
                      notificationIcon.length > 0
                        ?
                        <Box>
                          {
                            notifications.map(notification => <Box sx={{ borderBottom: '2px solid #F4F5F8', mb: 1 }}>

                              <MenuItem>

                                <Avatar sx={{ width: 40, height: 40, borderRadius: 0 }} src={notification?.image}></Avatar>

                                <Typography variant="h6" sx={{ fontSize: 14 }}>{notification?.message}</Typography>



                              </MenuItem>

                              <small style={{ paddingLeft: 10 }}>{notification.time}</small>

                            </Box>)

                          }
                        </Box>
                        :
                        <Box sx={{ width: 250, display: 'grid', alignItems: 'center', justifyContent: 'center' }}>
                          <img src={notificationIcon} style={{ marginTop: '50%' }} width="100" height="100" alt="" />
                          <Typography variant="body2">No message notification!</Typography>
                        </Box>}


                  </Menu>


                </>

                <Tooltip arrow title="My Account">
                  <IconButton onClick={handleOpenUserMenu}>
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
                  sx={{ display: "flex", justifyContent: "center" }}
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
            <input type="search" placeholder="Search.." name="search" />
          </form>
        </Box>
      </Box>
    </Container>
  );
};
export default Navigation;
