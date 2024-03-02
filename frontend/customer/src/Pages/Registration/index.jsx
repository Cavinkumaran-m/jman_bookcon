import React, { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Axios from "../../Components/Utils/Axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    date: "",
  });

  const [emailError, setEmailError] = useState(false);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmailError(!validateEmail(value)); // Set emailError to true if email is invalid
    }
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10); // Format as YYYY-MM-DD
    setUser((prevUser) => ({ ...prevUser, date: today }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.name.length < 3) {
      toast.error("Name should be atleast 3 characters");
      return;
    }
    if (user.email.length < 3 || !validateEmail(user.email)) {
      toast.error("Email is not valid");
      return;
    }
    if (user.password.length < 3) {
      toast.error("Password should be atleast 3 characters");
      return;
    }

    const userData = {
      Username: user.name,
      Email: user.email,
      Password: user.password,
      Date: user.date,
      Role: "user",
    };

    try {
      const response = await Axios.post("/user/adduser", userData);

      if (response.status == 200) {
        toast.success("User registered successfully");
        setUser({ name: "", email: "", password: "", date: user.date });
      } else {
        console.log(response);

        const message = response?.data?.message
          ? response.data.message
          : "Failed to register";
        toast.error(message);
      }
    } catch (error) {
      const message = error?.response?.data?.message
        ? error.response.data.message
        : "Failed to register";
      toast.error(message);
    }
  };

  return (
    <Box
      sx={{
        marginTop: "80px",
      }}
      maxWidth="sm"
      margin="auto"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          padding: "30px",
          borderRadius: "10px",
          marginTop: "80px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          bgcolor: "background.paper",

          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
          margin: "auto",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: "#333",
            mb: 2,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
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
          error={emailError && user.email !== ""}
          helperText={
            emailError && user.email !== "" ? "Please enter a valid email" : ""
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          type={"password"}
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          fullWidth
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
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Register
        </Button>
        <Box textAlign="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <NavLink
            to="/login"
            style={{ textDecoration: "none", color: "#007bff" }}
          >
            Login
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
