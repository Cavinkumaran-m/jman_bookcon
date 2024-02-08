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
import { Link, useNavigate } from "react-router-dom";
import style from "./index.module.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform your validation and login logic here
    console.log("Login form submitted", event.target);

    // After login logic, navigate to a new route programmatically
    navigate("/dashboard");
  };

  return (
    <Container component="main" maxWidth="xs" className={style.container}>
      <Paper elevation={3} className={style.paper}>
        <Box className={style.formContainer}>
          <Typography component="h1" variant="h5">
            Sign in to continue for Shopping
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
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={style.submitButton}
            >
              Sign In
            </Button>
            <Box className={style.linksContainer}>
              <MuiLink component={Link} to="/forgot-email" variant="body2">
                Forgot email?
              </MuiLink>
              <MuiLink component={Link} to="/create-account" variant="body2">
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
