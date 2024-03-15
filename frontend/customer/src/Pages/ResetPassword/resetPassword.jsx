import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import Axios from "../../Components/Utils/Axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    newPassword: "",
    confirmPassword: "",
    showPassword: false,
    shownewPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickShownewPassword = () => {
    setValues({ ...values, shownewPassword: !values.shownewPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (values.newPassword.length < 8 || values.newPassword.length>16) {
        toast.error("Password should be atleast 8  and maximum 16 characters");
        return;
      }
      const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
      if (!passwordPattern.test(values.newPassword)) {
        toast.error("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
        return;
      }
      if (values.newPassword !== values.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      const response = await Axios.post("/reset-password", {
        email: localStorage.getItem("email"),
        password: values.newPassword,
      });
      if (response.status === 200) {
        toast.success("Password reset successfull");
        localStorage.clear();
        navigate("/login");
      } else {
        toast.error("Error resetting password");
      }
      console.log(response);
    } catch (error) {
      toast.error("Error resetting password");
      console.error(error);
    }
    // Add logic to handle password reset
    console.log(values);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type={"password"}
            id="new-password"
            autoComplete="new-password"
            value={values.newPassword}
            onChange={handleChange("newPassword")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={"password"}
            id="confirm-password"
            autoComplete="new-password"
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
          />
          <Button
              type="submit"
              // fullWidth
              variant="contained"
              style={{   marginTop: "20px",
              borderRadius: "20px",
              display: "block", // Change this to "block" to allow `margin: auto` to work
              marginLeft: "auto",
              marginRight: "auto",
              width: "fit-content" // This ensures the button width only fits its content
           }}
            >
            Reset Password
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
