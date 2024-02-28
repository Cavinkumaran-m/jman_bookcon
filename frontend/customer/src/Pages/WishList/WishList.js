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

  useEffect(() => {
    Axios.post("wishlist", {
      token: Store.token,
      Customer_id: Store.user_id,
    }).then((res) => {
      console.log(res.data);
      // setTrendingBooks(res.data.payLoad);
    });
    setTimeout(() => {
      setWishList([]);
    }, 1000);
  }, []);

  return (
    <>
      <div className="bg-transparent mt-3 px-2">
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
                style={{ color: "#66fcf1", textAlign: "center" }}
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
            <div className="row rounded mt-4 mb-2 px-1">
              {wishList.map((book, index) => (
                <BookCard
                  loggedIn={Store.isLoggedIn}
                  home
                  name={book.Name}
                  author={book.Author}
                  image={book.Cover_Image}
                  price={book.Selling_cost}
                  genre={book.Genre}
                  isbn={book.ISBN}
                  rating={book.Rating}
                  key={index}
                  publishYear={book.Year_of_Publication}
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
