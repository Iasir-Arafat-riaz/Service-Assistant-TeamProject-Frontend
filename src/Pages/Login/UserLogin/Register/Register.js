import { Box, Button, Grid, Input, Stack, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "../../../SharedRoute/Navigation/Navigation";
import SendIcon from "@mui/icons-material/Send";
import useFirebase from "../../../../Hooks/useFirebase";

const Register = () => {
    const { googleSignIn, signUpWithEmail } = useFirebase();

  const { register, watch, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  const location =useLocation()
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
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
                  <b>Please Register</b>
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack direction="column">
                    <Input
                      placeholder="Enter Your Name"
                      required
                      type="text"
                      sx={{ mb: 3 }}
                      {...register("name")}
                      label="Enter image url"
                      variant="outlined"
                    />
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
                    {/* <Input 
                      placeholder="Re-Enter Your Password"
                        required
                        type="password"
                        sx={{ mb: 3 }}
                        {...register("password2")}
                        label="Write Banner text"
                        variant="outlined"
                      /> */}
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
                  Already Registered?{" "}
                  <Button
                    endIcon={<SendIcon />}
                    sx={{ p: 2, color: "#FF5E14" }}
                    onClick={handleLogin}
                  >
                    Login
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

export default Register;
