import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { Link, useNavigate, NavLink } from "react-router-dom";
import style from "./index.module.css";
import { toast } from "react-toastify";
import Axios from "../../Components/Utils/Axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [showOTPField, setShowOTPField] = useState(false);
  const [otp, setOTP] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  // Email validation function
  const validateEmail = (email) => {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };
  const handleData = async () => {
    const isValid = validateEmail(email);
    setIsEmailValid(isValid);

    if (!isValid) {
      console.log("Invalid email address");
      return; // Stop here if the email is not valid
    }

    // Assuming the email is valid, proceed with OTP sending logic
    console.log("Sending OTP to:", email);
    setShowOTPField(true);
    try {
      const response = await Axios.post("/request-otp", {
        email: email,
      });
      toast.success("OTP Sent", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error.response.data);
      const message = error?.response?.data
        ? error.response.data
        : "Unknown Error Occured";

      toast.error(message, {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleData();

    // Add actual logic to send OTP
  };

  const handleVerifyOTP = async () => {
    console.log("Verifying OTP:", otp);
    try {
      const response = await Axios.post("/verify-otp", {
        email: email,
        otp: otp,
      });
      toast.success("OTP Verified", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.setItem("email", email);
      navigate("/reset-password");
    } catch (error) {
      console.log(error);
      toast.error("Invalid Details", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return; // Stop here if OTP verification fails
    }
    // navigate("/dashboard");
  };

  const handleResendOTP = () => {
    console.log("Resending OTP...");
    handleData();
    // Add logic to resend OTP
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Reset email validity state when user modifies the email
    if (!isEmailValid) setIsEmailValid(true);
  };

  return (
    <Container component="main" maxWidth="sm" className={style.container}>
      <Paper elevation={3} className={style.paper}>
        <Box className={style.formContainer}>
          <Typography component="h1" variant="h5">
            Recover your account
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
              error={!isEmailValid}
              helperText={
                !isEmailValid && "Please enter a valid email address."
              }
            />

            {!showOTPField && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={style.submitButton}
                disabled={!isEmailValid || !email}
              >
                Get OTP
              </Button>
            )}

            {showOTPField && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="otp"
                  label="Enter OTP"
                  name="otp"
                  autoComplete="off"
                  autoFocus
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                />

                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  className={style.verifyButton}
                  onClick={handleVerifyOTP}
                >
                  Verify OTP
                </Button>

                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  className={style.resendButton}
                  sx={{ mt: 2 }}
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </Button>
              </>
            )}
          </form>
          <NavLink to="/login">
            <button className="mt-2 btn btn-primary">Cancel</button>
          </NavLink>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
