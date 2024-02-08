import React, { useState } from "react";
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

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [showOTPField, setShowOTPField] = useState(false);
  const [otp, setOTP] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform your validation and login logic here
    console.log("Login form submitted", event.target);

    // After login logic, navigate to a new route programmatically
    // navigate("/dashboard");

    // For demonstration, let's just show the OTP field after sending OTP
    setShowOTPField(true);
  };

  const handleVerifyOTP = () => {
    // Here you can implement logic to verify the OTP
    console.log("Verifying OTP:", otp);
    // If OTP is verified successfully, navigate to a new route
    navigate("/dashboard");
  };

  const handleResendOTP = () => {
    // Here you can implement logic to resend the OTP
    console.log("Resending OTP...");
  };

  return (
    <Container component="main" maxWidth="xs" className={style.container}>
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
            />

            {!showOTPField && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={style.submitButton}
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
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
