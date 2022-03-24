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
import Swal from "sweetalert2";

const UserLogin = () => {
  const { googleSignIn, logInWithEmail } = useFirebase();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
                      {...register("loginEmail")}
                      label="Enter image url"
                      variant="outlined"
                    />

                    <Input
                      placeholder="Enter Your Password"
                      required
                      type="password"
                      sx={{ mb: 3 }}
                      {...register("loginPass")}
                      label="Write Banner text"
                      variant="outlined"
                    />
                    <Button
                      onClick={handleLogin}
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


