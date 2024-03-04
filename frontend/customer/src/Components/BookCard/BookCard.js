import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import style from "./BookCard.module.css";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import Axios from "../Utils/Axios";
import { useContext } from "react";
import { UserContext } from "../../CustomFunctionalities/Context/UserContext";
import { toast } from "react-toastify";
import BookModal from "../../Pages/BookDetail/bookDetail";

function BookCard(props) {
  const { Store } = useContext(UserContext);
  const [hover, setHover] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [buyHover, setBuyHover] = useState(false);
  const stars = new Array(props.rating).fill("⭐");
  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };
  const likeHandler = () => {
    // console.log(props);
    Axios.post("wishlist", {
      token: Store.token,
      Customer_id: Store.user_id,
      Book_id: props.id,
      type: "addWishlist",
    })
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Book Added to your wishlist", {
            position: "top-center",
            autoClose: 2000,
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
  const removeWishlistHandler = () => {
    // console.log(props);
    // return;
    Axios.post("wishlist", {
      token: Store.token,
      Customer_id: Store.user_id,
      Book_id: props.id,
      type: "removeWishlist",
    })
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Book Removed from your wishlist", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          props.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOpenModal = () => {
    
    setModalOpen(true);

  };
  const handleClose = () => {
    console.log("here");
    setModalOpen(false);
    console.log(modalOpen);
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05, backgroundColor: "#a678e7" }}
      className="col-6 col-sm-6 col-md-3 col-lg-2 mt-2 p-1 py-0 rounded"
    >
      <div
        className="d-flex text-black p-3 pb-3 pt-3 flex-column rounded-4"
        style={{ height: "100%" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleOpenModal()}
      >
        <div className={style.image_container}>
          <center>
            <img
              src={props.image}
              width={"100%"}
              height={"100%"}
              alt="Product"
            />
          </center>
          {hover && (
            <div
              className={`${style.rating_card} d-flex flex-column align-items-center`}
            >
              <div className="flex-grow-1"></div>
              <div>{stars}</div>
              <div className="rounded px-2 text-white">
                <b>{props.genre}</b>
              </div>
              <div className="rounded px-2 text-white">
                {props.publishYear === 0 ? "NA" : props.publishYear}
              </div>
            </div>
          )}
        </div>

        {/* If the bookcard is displayed in home page */}
        {props.home && (
          <div
            style={{ height: "100%" }}
            className="d-flex flex-column justify-content-between"
          >
            <div
              style={{
                textAlign: "center",
                overflow: hover ? "none" : "hidden",
                textOverflow: hover ? "ellipsis" : "none",
                whiteSpace: hover ? "normal" : "nowrap",
              }}
            >
              {props.name}
            </div>
            <div
              style={{
                textAlign: "center",
                overflow: hover ? "none" : "hidden",
                textOverflow: hover ? "ellipsis" : "none",
                whiteSpace: hover ? "normal" : "nowrap",
              }}
            >
              - <em>{props.author}</em>
            </div>
            <div className="flex-grow-1"></div>
            {props.loggedIn && (
              <div>
                <button
                  className="btn mb-1"
                  onMouseEnter={() => {
                    setBuyHover(true);
                  }}
                  onMouseLeave={() => {
                    setBuyHover(false);
                  }}
                  style={{
                    width: "100%",
                    color: buyHover ? "white" : "white",
                    backgroundColor: "#3881F5",
                    border: "0px",
                  }}
                >
                  {buyHover ? <>Add to Cart</> : <>₹ {props.price}</>}
                  {/* &#128722; */}
                </button>
                <br></br>
                <motion.button
                  whileTap={{ scale: 1.1 }}
                  onClick={likeHandler}
                  className="btn btn-dark"
                  style={{
                    width: "100%",
                    color: "#000",
                    border: "0px",
                    backgroundColor: hover ? "white" : "#c0c0c0",
                  }}
                >
                  Like &#x2764;
                </motion.button>
              </div>
            )}
            {!props.loggedIn && (
              <div>
                <NavLink to={"../login"}>
                  <button
                    onMouseEnter={() => {
                      setBuyHover(true);
                    }}
                    onMouseLeave={() => {
                      setBuyHover(false);
                    }}
                    className="btn btn-primary mb-1"
                    style={{
                      width: "100%",
                      color: "white",
                      backgroundColor: "#3881F5",
                      border: "0px",
                    }}
                  >
                    {buyHover ? "Login" : "₹" + props.price}
                  </button>
                </NavLink>
              </div>
            )}
          </div>
        )}


        {/* If the bookcard is displayed in wishlist page */}
        {props.wishlist && (
          <div
            style={{ height: "100%" }}
            className="d-flex flex-column justify-content-between"
          >
            <div
              style={{
                textAlign: "center",
                overflow: hover ? "none" : "hidden",
                textOverflow: hover ? "ellipsis" : "none",
                whiteSpace: hover ? "normal" : "nowrap",
              }}
            >
              {props.name}
            </div>
            <div
              style={{
                textAlign: "center",
                overflow: hover ? "none" : "hidden",
                textOverflow: hover ? "ellipsis" : "none",
                whiteSpace: hover ? "normal" : "nowrap",
              }}
            >
              - <em>{props.author}</em>
            </div>
            <div className="flex-grow-1"></div>
            <div>
              <button
                className="btn mb-1"
                onMouseEnter={() => {
                  setBuyHover(true);
                }}
                onMouseLeave={() => {
                  setBuyHover(false);
                }}
                style={{
                  width: "100%",
                  color: buyHover ? "white" : "white",
                  backgroundColor: "#3881F5",
                  border: "0px",
                }}
              >
                {buyHover ? <>Add to Cart</> : <>₹ {props.price}</>}
                {/* &#128722; */}
              </button>
              <br></br>
              <motion.button
                whileTap={{ scale: 1.1 }}
                onClick={removeWishlistHandler}
                className="btn btn-dark"
                style={{
                  width: "100%",
                  color: "#000",
                  border: "0px",
                  backgroundColor: hover ? "white" : "#c0c0c0",
                }}
              >
                Remove 🗑
              </motion.button>
            </div>
          </div>
        )}
        {modalOpen === true && (
        
          <BookModal
            book={props}
            addToWishlist={likeHandler}
            setOpen={setModalOpen}
            addToCart={likeHandler}
            open={modalOpen}
            handleClose={handleClose}
          
          
          />
      )}
      </div>
    </motion.div>
  );
}

export default BookCard;
