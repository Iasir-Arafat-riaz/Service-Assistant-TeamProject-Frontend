import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Item,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import useFirebase from "../../../Hooks/useFirebase";
import Navigation from "../../SharedRoute/Navigation/Navigation";
import SendIcon from "@mui/icons-material/Send";

const UserLogin = () => {
  const { googleSignIn, logInWithEmail} = useFirebase();

  const {register, watch, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <Box sx={{ height: "calc(100vh)" }}>
      <Navigation />
      <Box sx={{ pt: "90px" }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ backgroundColor: "transparent", height: "calc(100vh)" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 5,
                pt: 3,
              }}
            >
              {" "}
              <Box>
                <Typography sx={{ color: "#FF5E14", mb: 4 }} variant="h4">
                  <b>Please Login</b>
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack direction="column">
                    <Input
                      placeholder="Enter Your Email"
                      required
                      type="email"
                      sx={{ mb: 3 }}
                      {...register("email")}
                      label="Enter image url"
                      variant="outlined"
                    />

                    <Input
                      placeholder="Enter Your Password"
                      required
                      type="password"
                      sx={{ mb: 3 }}
                      {...register("password")}
                      label="Write Banner text"
                      variant="outlined"
                    />
                    <Button
                  
                      variant="outlined"
                      type="submit"
                      sx={{
                        letterSpacing: 2,
                        px: 3,
                        mb: 3,
                        color: "black",
                        backgroundColor: "#FF5E14",
                      }}
                    >
                      <b>Login</b>
                    </Button>
                    {/* <Button sx={{ borderRadius: 0, p: 1, mt: 3 }} type="submit" variant="contained">
                  Add Banner
                </Button> */}
                    <Button
                      onClick={() => googleSignIn(location, navigate)}
                      sx={{
                        borderRadius: 0,
                        p: 1,
                        mt: 3,
                        letterSpacing: 2,
                        backgroundColor: "black",
                      }}
                      variant="contained"
                    >
                      Google Signin
                    </Button>
                  </Stack>
                </form>
                <Typography variant="h6">
                  New User?{" "}
                  <Button
                  
                  endIcon={<SendIcon />}
                    sx={{ p: 2, color: "#FF5E14" }}
                    onClick={handleRegister}
                  >
                    Register
                  </Button>
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            className="loginBanner"
            item
            xs={12}
            md={8}
            sx={{
              backgroundImage:
                "url(https://i.ibb.co/W6jPsvh/managed-services-1-1.png)",
              height: "calc(100vh)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserLogin;

// import { Box, Paper, Typography } from "@mui/material";
// import React, { useEffect, } from "react";
// import useFirebase from "../../../Hooks/useFirebase";
// import Navigation from "../../SharedRoute/Navigation/Navigation";
// import { useNavigate, useLocation, NavLink } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import "./UserLogin.css";

// const UserLogin = () => {
// 	const { googleSignIn, logInWithEmail, signUpWithEmail } = useFirebase();
// 	const location = useLocation()
// 	const navigate = useNavigate()
// 	const { register, watch, handleSubmit, formState: { errors } } = useForm();
// 	useEffect(() => {
// 		console.clear();

// 		const loginBtn = document.getElementById('login');
// 		const signupBtn = document.getElementById('signup');

// 		loginBtn.addEventListener('click', (e) => {
// 			let parent = e.target.parentNode.parentNode;
// 			Array.from(e.target.parentNode.parentNode.classList).find((element) => {
// 				if (element !== "slide-up") {
// 					parent.classList.add('slide-up')
// 				} else {
// 					signupBtn.parentNode.classList.add('slide-up')
// 					parent.classList.remove('slide-up')
// 				}
// 			});
// 		});

// 		signupBtn.addEventListener('click', (e) => {
// 			let parent = e.target.parentNode;
// 			Array.from(e.target.parentNode.classList).find((element) => {
// 				if (element !== "slide-up") {
// 					parent.classList.add('slide-up')
// 				} else {
// 					loginBtn.parentNode.parentNode.classList.add('slide-up')
// 					parent.classList.remove('slide-up')
// 				}
// 			});
// 		});
// 	}, [])
// 	const handleSignUp = () => {
// 		//
// 		if (watch('signupEmail').length && watch('name').length && watch('signupPass').length >= 6) {
// 			signUpWithEmail({ name: watch('name'), email: watch('signupEmail'), password: watch('signupPass'), location, navigate })
// 		}
// 		else {
// 			alert('Wrong input ')
// 		}
// 	}

// 	const handleLogin = () => {
// 		if (watch('loginEmail').length && watch('loginPass').length >= 6) {
// 			logInWithEmail({ email: watch('loginEmail'), password: watch('loginPass'), location, navigate })
// 		}
// 		else {
// 			alert('Wrong input ')
// 		}
// 	}
// 	const onSubmit = () => {
// 	}
// 	return (
// 		<>
// 			<Navigation />

// 			<Box className="userLogin">

// 				<form onSubmit={handleSubmit(onSubmit)} className="form-structor" style={{ "marginTop": "150px" }}>

// 					<Box className="signup">

// 						<h2 className="form-title" id="signup"><span>or</span>Sign up</h2>

// 						<Box className="form-holder">
// 							<input type="text" className="input" placeholder="Name" {...register("name", { required: true })} />
// 							<input type="email" className="input" placeholder="Email"
// 								{...register("signupEmail")} />
// 							<input type="password" className="input" placeholder="Password"  {...register("signupPass", { required: true, minLength: 6 })} />
// 						</Box>

// 						<button onClick={handleSignUp} className="submit-btn">Sign up</button>
// 						<Typography variant="h5" ><button className="google-btn" onClick={() => googleSignIn(location, navigate)} >Google Login</button></Typography>

// 					</Box>

// 					<Box className="login slide-up">
// 						<Box className="center">
// 							<h2 className="form-title" id="login"><span>or</span>Log in</h2>
// 							<Box className="form-holder">
// 								<input type="email" className="input" placeholder="Email"
// 									{...register("loginEmail", { required: true })} />
// 								<input type="password" {...register("loginPass", { required: true })} className="input" placeholder="Password" />
// 							</Box>
// 							<button onClick={handleLogin} className="submit-btn">Log in</button>
// 							<Typography variant="h5" ><button onClick={() => googleSignIn(location, navigate)} className="google-btn">Google Login</button></Typography>
// 						</Box>
// 					</Box>

// 				</form>
// 			</Box>
// 		</>
// 	);
// };

// export default UserLogin;
