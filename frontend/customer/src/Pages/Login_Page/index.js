import React, { useState, useContext } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Paper,
  Link as MuiLink,
  InputAdornment,
  IconButton,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../CustomFunctionalities/Context/UserContext";
import Axios from "../../Components/Utils/Axios";
// import style from "./index.module.css"; // Assuming you have specific CSS module styles

const LoginPage = () => {
  const navigate = useNavigate();
  const { setStore } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChangeEmail = (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
    setIsEmailValid(validateEmail(emailInput));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await Axios.post("/login", {
        email: email,
        password: password,
      });

      if (response.data.status === "success") {
        setStore({
          isLoggedIn: true,
          user_id: response.data.payload.userId,
          cart_items: null,
        });
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
    }
  };

  return (
    <Container component="main" maxWidth="sm" style={{ marginTop: "80px" }}>
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "20px" }}>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            style={{
              margin: "20px 0",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Sign in to continue for Shopping
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            style={{ width: "90%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleChangeEmail}
              error={!isEmailValid}
              helperText={!isEmailValid ? "Invalid email address" : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type={"password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ marginTop: "20px", borderRadius: "20px" }}
            >
              Sign In
            </Button>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <MuiLink
                component={Link}
                to="/forgot-password"
                variant="body2"
                underline="none"
              >
                Forgot Password?
              </MuiLink>
              <MuiLink
                component={Link}
                to="/register"
                variant="body2"
                underline="none"
              >
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
