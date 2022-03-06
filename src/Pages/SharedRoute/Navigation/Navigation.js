import React, { useEffect, useRef, useState } from "react";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
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
  Menu,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Container,
  CardContent,
  CardActionArea,
  Card,
  Grid,
  Modal,
  TextField,
  Popover,
  Badge,
} from "@mui/material";
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
import "./Navigation.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allData, getNotification, setNotificationCount, updateMessageStatus } from "../../../redux/dataSlice/dataSlice";
import useFirebase from "../../../Hooks/useFirebase";
import axios from "axios";



const Navigation = () => {
  const navRef = useRef(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [state, setState] = React.useState(false);
  const { user, notifications, notificationCount } = useSelector(allData);
  const { handleSignOut } = useFirebase();
  const dispatch = useDispatch();
  const [APIData, setAPIData] = useState([])
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [messageSeen, setMessageSeen] = useState(0);

  const [open, setOpen] = React.useState(false);
  const [isMessageSeen, setIsMessageSeen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open2 = Boolean(anchorEl);
  const id = open2 ? 'simple-popover' : undefined;

  useEffect(() => {
    axios.get(`https://fierce-meadow-12011.herokuapp.com/singleservice`)
      .then((response) => {
        setAPIData(response.data);
      })
  }, [])

  useEffect(() => {
    dispatch(getNotification(user));
  }, [user, dispatch, isMessageSeen])

  // let 
  // let MessageSeen;
  useEffect(() => {
    const filterMessage = notifications.filter(notification => notification.seen === false);
    console.log(filterMessage);
    setMessageSeen(filterMessage.length);
  }, [notifications, user])



  const handleClickClose = () => {
    setAnchorEl(null);
  };

  // current notifications  
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filteredData = APIData.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
    }
    else {
      setFilteredResults(APIData)
    }
  }

  const handleCardClick = (id) => {
    //console.log("card clicked");
    navigate(`/Home/service-details/${id}`);
  };

  const goHome = () => {
    navigate("/home");
  };

  useEffect(() => {

    window.addEventListener("scroll", () => {
      const scroll = window.pageYOffset;
      if (scroll > 100) {
        if (navRef.current) {
          navRef.current.classList.add("scroll-nav");
        }
      } else {
        if (navRef.current) {
          navRef.current.classList.remove("scroll-nav");
        }
      }
    });
  }, []);

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


  // message status change

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(updateMessageStatus(user));
    setIsMessageSeen(true);


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
                onClick={handleOpen}
                style={navButton}
              />
            </Tooltip>


            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                xs={12}
                md={12}
                sx={{
                  top: '10%',
                  width: "100%",
                  bgcolor: '#F4F5F8',
                  boxShadow: 24,
                  p: 4,
                  height: '200px',
                  overflow: 'scroll'
                }}>
                <TextField icon='search'
                  placeholder='Search Services...'
                  onChange={(e) => searchItems(e.target.value)}
                  sx={{ width: '80%', left: '5%', mb: 3 }}
                  id="standard-search"
                  type="search"
                  variant="standard"

                />
                <Grid
                  container
                  spacing={3}

                >
                  {
                    searchInput.length > 1 ? (
                      filteredResults.map((item) => {
                        return (
                          <Grid item md={5.5} xs={10} sx={{ mr: 2 }}>
                            <Card >
                              <CardActionArea onClick={() => handleCardClick(item.parentService)}>
                                <CardContent>
                                  <Typography>
                                    {item.Title}
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                          </Grid>
                        )
                      })
                    ) : (

                      APIData.map((item) => {
                        return (
                          <Grid item md={12} xs={12}>

                          </Grid>
                        )
                      })
                    )
                  }
                </Grid>
              </Box>
            </Modal>

            {user?.email && (
              <>
                <>

                  <Button aria-describedby={id} variant="" onClick={handleClick}>

                    {messageSeen > 0 ? <Badge badgeContent={messageSeen} color="primary">
                      <NotificationsNoneIcon className="svg_icons" color="action"></NotificationsNoneIcon >
                    </Badge>
                      :
                      <NotificationsNoneIcon className="svg_icons" color="action"></NotificationsNoneIcon >
                    }

                  </Button>




                  <Popover
                    sx={{ borderRadius: 5 }}
                    id={id}
                    open={open2}
                    anchorEl={anchorEl}
                    onClose={handleClickClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    <Box sx={{ width: '300px', height: '300px', borderRadius: 5, p: 2 }}>
                      {
                        notifications.map((notification) => <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 1, borderBottom: '2px solid #F4F5F8', pb: 1 }}>

                          <Avatar alt="notification image" sx={{ borderRadius: 0, width: 60, height: 60 }} src={notification?.image} />

                          <Box>
                            <Typography variant="h6" sx={{ fontSize: 14 }}>{notification.message}</Typography>
                            <Typography variant="h6" sx={{ fontSize: 11 }}>Time: {notification.time}</Typography>

                          </Box>

                        </Box>
                        )
                      }
                    </Box>
                  </Popover>

                </>
                <Tooltip arrow title="My Account">
                  <IconButton onClick={handleOpenUserMenu}  >
                    <Avatar alt="Remy Sharp" src={user?.photoURL} />
                  </IconButton>

                </Tooltip>
              </>
            )}


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
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
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



    </Container >
  );
};
export default Navigation;