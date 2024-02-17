import React from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Paper,
  Link as MuiLink,
} from "@mui/material";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import style from "./index.module.css";
import { useContext } from "react";
import { UserContext } from "../../CustomFunctionalities/Context/UserContext";
import { useState } from "react";
import Axios from "../../Components/Utils/Axios";
const LoginPage = () => {
  const navigate = useNavigate();

  const { setStore } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Login form submitted", event.target.value);
    console.log("Logging in user...");
    console.log(email);
    console.log(password);
    try {
      const response = await Axios.post("/login", {
        username: email,
        password: password,
      });

      console.log(response.data);
      if (response.data.accessToken) {
        setStore({ isLoggedIn: true, user_id: null, cart_items: null });
        navigate("/home");
      }
    } catch (error) {
      toast.error("Login failed: Invalid credentials", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      console.log(error);
    }
    // If success set context data
    // setStore({ isLoggedIn: true, user_id: null, cart_items: null });

    // After login logic, navigate to a new route programmatically
    // navigate("/home");
  };

  return (
    <Container component="main" maxWidth="xs" className={style.container}>
      <Paper elevation={3} className={style.paper}>
        <Box className={style.formContainer}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              type="password"
              label="Password"
              name="password"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={style.submitButton}>
              Sign In
            </Button>
            <Box className={style.linksContainer}>
              <MuiLink
                component={Link}
                to="/forgot-password"
                variant="body2"
                underline="none">
                Forgot Password?
              </MuiLink>
              <MuiLink
                component={Link}
                to="/register"
                variant="body2"
                underline="none">
                Create account
              </MuiLink>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
