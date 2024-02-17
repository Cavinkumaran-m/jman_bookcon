import React, { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      // Simple regex for basic email validation
      const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      setEmailError(!isValidEmail);
    }

    setUser({ ...user, [name]: value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform further validation if necessary before logging or submitting
    console.log(user);
  };

  return (
    <Box
      sx={{
        marginTop: "80px",
      }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          padding: "20px",
          borderRadius: "10px",
          marginTop: "80px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          bgcolor: "background.paper",

          display: "flex",
          flexDirection: "column",
          gap: "10px",
          // Specifies the maximum width of the form
          width: "60%", // Sets the form width to 90% of its container
          margin: "auto", // Centers the form in the container
        }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: "#333",
            mb: 2,
            textAlign: "center",
            fontWeight: "bold",
          }}>
          Sign Up
        </Typography>
        <TextField
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          fullWidth
          error={emailError}
          helperText={emailError ? "Please enter a valid email" : ""}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}>
          Register
        </Button>
        <Box textAlign="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <a href="/login" style={{ textDecoration: "none", color: "#007bff" }}>
            Login
          </a>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
