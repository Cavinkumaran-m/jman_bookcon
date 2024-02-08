import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaPhoneAlt,
  FaBabyCarriage,
  FaLock,
  FaSearchLocation,
} from "react-icons/fa";
// Instead of importing from 'react-icons/md'
import { MdEmail } from "react-icons/md";

import { CgGenderMale } from "react-icons/cg";
import style from "./index.module.css"; // Import CSS file

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    // Add your registration logic here
    // Example: Posting data to your API
    console.log("Register form submitted", event.target);
    console.log("Registering user...");

    // On successful registration, navigate to the login page or dashboard
    // navigate('/dashboard'); // Adjust the route as needed
  };

  return (
    <section className={style.register_bg}>
      <div className={style.register_container}>
        <div className={style.register_card}>
          <div className={style.register_content}>
            <h1 className={style.register_heading}>Create an account</h1>
            <form className={style.form_container} onSubmit={handleRegister}>
              <div className={style.input_group}>
                <FaUser className={style.input_icon} />
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  required
                  className={style.input_field}
                />
              </div>

              <div className={style.input_group}>
                <CgGenderMale className={style.input_icon} />
                <select id="gender" required className={style.input_select}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className={style.input_group}>
                <MdEmail className={style.input_icon} />
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  required
                  className={style.input_field}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Please enter a valid email address."
                />
              </div>
              <div className={style.input_group}>
                <FaPhoneAlt className={style.input_icon} />
                <input
                  type="tel"
                  id="phone"
                  placeholder="Your Phone"
                  required
                  className={style.input_field}
                  pattern="^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$"
                  title="Please enter a valid phone number."
                />
              </div>
              <div className={style.input_group}>
                <FaLock className={style.input_icon} />
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  required
                  className={style.input_field}
                />
              </div>
              <div className={style.input_group}>
                <FaLock className={style.input_icon} />
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm Password"
                  required
                  className={style.input_field}
                />
              </div>

              <div className={style.input_group}>
                <FaSearchLocation className={style.input_icon} />
                <textarea
                  id="address"
                  placeholder="Your Address"
                  rows="4"
                  required
                  className={style.textarea_field}
                ></textarea>
              </div>
              <button
                type="submit"
                className={style.register_btn}
                sx={{
                  color: "white",
                }}
              >
                R E G I S T E R
              </button>
            </form>
            <p className={style.login_redirect}>
              Already have an account?{" "}
              <Link to="/login" className={style.login_link}>
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
