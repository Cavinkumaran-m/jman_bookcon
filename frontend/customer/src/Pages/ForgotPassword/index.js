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
import style from "../../Assets/ForgotPassword.module.css";
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

 
    console.log("Sending OTP to:", email);

    Axios.post("/request-otp", {
      email: email,
    })
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("OTP Sent", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setShowOTPField(true);
        } else {
          toast.error(res.data.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleData();

    // Add actual logic to send OTP
  };

  const handleVerifyOTP = async () => {
    console.log("Verifying OTP:", otp);
    await Axios.post("/verify-otp", {
      email: email,
      otp: otp,
    })
      .then((res) => {
        if (res.data.status === "success") {
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
        } else {
          toast.error(res.data.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
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

        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mt={2}>
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

                  <Box  >
                  <Button
                    type="button"
                    variant="contained"
                    sx={{
                      width: { xs: '100%', sm: 'auto' }, 
                      mt: { xs: 1, sm: 0 }, 
                      ml: { sm: '4px' } 
                    }}
                    onClick={handleVerifyOTP}
                  >
                  Verify OTP
                </Button>


                    <Button
                      type="button"
                      variant="contained"
                      sx={{
                        width: { xs: '100%', sm: 'auto' }, 
                        mt: { xs: 1, sm: 0 }, 
                        ml: { sm: '4px' } 
                      }}
                      onClick={handleResendOTP}

                    >
                      Resend OTP
                    </Button>
                  </Box>

                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Button
                    type="button"
                    variant="contained"
                    sx={{
                      width: { xs: '100%', sm: 'auto' }, 
                      mt: { xs: 1, sm: 0 }, 
                      ml: { sm: '4px' } 
                    }}
                   
                    >
                      Go Back
                    </Button>
                  </Link>
                </>
              )}
            </Box>
            {!showOTPField && (
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: { xs: '100%', sm: 'auto' }, 
                    mt: { xs: 1, sm: 0 }, 
                    ml: { sm: '4px' } 
                  }}
                  
                  disabled={!isEmailValid || !email}
                >
                  Get OTP
                </Button>

                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Button
                   type="button"
                   variant="contained"
                   sx={{
                     width: { xs: '100%', sm: 'auto' }, 
                     mt: { xs: 1, sm: 0 }, 
                     ml: { sm: '4px' } 
                   }}
                 
                    
                  >
                    Go Back
                  </Button>
                </Link>
              </Box>
            )}


          </form>
         
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
