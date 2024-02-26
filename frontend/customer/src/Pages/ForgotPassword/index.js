import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import style from "./index.module.css";

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateEmail(email);
    setIsEmailValid(isValid);

    if (!isValid) {
      console.log("Invalid email address");
      return; // Stop here if the email is not valid
    }

    // Assuming the email is valid, proceed with OTP sending logic
    console.log("Sending OTP to:", email);
    setShowOTPField(true);
    // Add actual logic to send OTP
  };

  const handleVerifyOTP = () => {
    console.log("Verifying OTP:", otp);
    navigate("/dashboard");
  };

  const handleResendOTP = () => {
    console.log("Resending OTP...");
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
                disabled={!isEmailValid || !email}>
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
                  onClick={handleVerifyOTP}>
                  Verify OTP
                </Button>

                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  className={style.resendButton}
                  sx={{ mt: 2 }}
                  onClick={handleResendOTP}>
                  Resend OTP
                </Button>
              </>
            )}
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
