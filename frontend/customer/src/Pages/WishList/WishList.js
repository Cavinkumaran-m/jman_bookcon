import React from "react";
import { useEffect, useState } from "react";
import Axios from "../../Components/Utils/Axios";
import BookCardLoader from "../../Components/BookCard/BoodCardLoader";
import BookCard from "../../Components/BookCard/BookCard";
import { useContext } from "react";
import { UserContext } from "../../CustomFunctionalities/Context/UserContext";
import { NavLink } from "react-router-dom";
import tree from "../../Images/tree.png";
function WishList(props) {
  const [wishList, setWishList] = useState(null);
  const { Store } = useContext(UserContext);
  const [garbage, reload] = useState(true);
  const reloader = () => {
    reload((prev) => !prev);
  };

  useEffect(() => {
    Axios.post("wishlist", {
      Customer_id: Store.user_id,
      type: "getWishlist",
    }).then((res) => {
      setWishList(res.data.payload);
    });
  }, [garbage]);

  return (
    <>
      <div className=" px-4">
        <div className="row d-flex justify-content-between m-0 p-0 pt-2">
          {/* Results div */}
          {wishList === null && (
            <div className="row m-0">
              <BookCardLoader />
              <BookCardLoader />
              <BookCardLoader />
              <BookCardLoader />
            </div>
          )}

          {wishList !== null && wishList.length === 0 && (
            <>
              <span
                className="rounded-3 display-6 mt-sm-4 mt-5 py-3 bg-dark"
                style={{ color: "#3881F5", textAlign: "center" }}
              >
                <img src={tree} width={"200px"}></img>
                <br></br>
                Browse Our Limitless Collections and find your NEXT GREAT
                READ!!!
              </span>
              <center>
                <NavLink
                  className="nav-item nav-link mt-2 p-2 rounded-3"
                  to="../home"
                  style={{
                    color: "#fff",
                    backgroundColor: "#1f2833",
                    width: "fit-content",
                  }}
                >
                  Click Here !
                </NavLink>
              </center>
            </>
          )}
          {wishList !== null && wishList.length !== 0 && (
            <div className="row rounded mb-2 px-1">
              <div className="display-5">Your Wish List Items</div>
              {wishList.map((book, index) => (
                <BookCard
                  loggedIn={Store.isLoggedIn}
                  wishlist
                  reload={reloader}
                  id={book.book_details._id}
                  name={book.book_details.Name}
                  author={book.book_details.Author}
                  image={book.book_details.Cover_Image}
                  price={book.book_details.Selling_cost}
                  genre={book.book_details.Genre}
                  isbn={book.book_details.ISBN}
                  rating={book.book_details.Rating}
                  key={index}
                  publishYear={book.book_details.Year_of_Publication}
                ></BookCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WishList;
