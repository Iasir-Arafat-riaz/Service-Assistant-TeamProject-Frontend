import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Item,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import useFirebase from "../../../Hooks/useFirebase";
import Navigation from "../../SharedRoute/Navigation/Navigation";
import SendIcon from "@mui/icons-material/Send";
import Swal from "sweetalert2";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const UserLogin = () => {
  const { googleSignIn, logInWithEmail , error, isLoading} = useFirebase();
  // const [error,setError] = useState('')
  // const [isLoading,setIsLoading] = useState(false)

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const handleRegister = () => {
    navigate("/register");
  };
  const onSubmit = async(data) => {
   try{
     await logInWithEmail({
       email: data.loginEmail,
       password: data.loginPass,
       location,
       navigate,
     });
    // setIsLoading(false)
   }catch(err){
    // setIsLoading(false)
   }
  };

  const handleLogin = () => {
    if (watch("loginEmail").length && watch("loginPass").length >= 6) {
      logInWithEmail({
        email: watch("loginEmail"),
        password: watch("loginPass"),
        location,
        navigate,
      });
    } else {
      Swal.fire({
        imageUrl: "https://i.ibb.co/n8Wp01q/web-logo.png",
        title: "Oops...",
        text: "Wrong Password, Try again",

        width: "300px",
        padding: "20px",
      });
    }
  };



  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ height: "calc(100vh)" ,overflow:'hidden'}}>
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
                 
                 <h2 style={{fontWeight:'bold',fontSize:30,marginBottom:20}}>Sign In</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack direction="column">
                    
                  <TextField
                   {...register("loginEmail", { required: true })}
          id="outlined-multiline-flexible"
          label="Email *"
          multiline
          maxRows={4}
        />
                    
                    <FormControl sx={{ my:3, width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
          <OutlinedInput
            {...register("loginPass", { required: true })}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

       {!isLoading  ? <Button  type='submit' sx={{p:1.2 , fontWeight:'bold', letterSpacing:1}} variant="outlined">Login</Button>:<Button  sx={{p:1.2 , fontWeight:'bold', letterSpacing:1}} variant="outlined">Loading...</Button>}

       <Button  onClick={googleSignIn} sx={{p:1.2 , fontWeight:'bold', letterSpacing:1, display:'block',mt:3,width:'100%'}} variant="outlined">Sign in with Google</Button>

      {error && <small style={{marginTop:20 ,color:'red'}}>{error}</small>}

                 
                  </Stack>
                </form>
                <br />
                <Typography variant="span">
                  Don't have an acount ? {" "}
                  <span onClick={handleRegister} style={{borderBottom:'1px solid black',cursor:'pointer'}}>register</span>
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


