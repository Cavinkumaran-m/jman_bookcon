import React from "react";
import { useEffect, useState } from "react";
import Axios from "../../Components/Utils/Axios";
import BookCardLoader from "../../Components/BookCard/BoodCardLoader";

function WishList(props) {
  const [wishList, setWishList] = useState(null);

  useEffect(() => {
    // Axios.get("trending").then((res) => {
    // console.log(res.data.payLoad);
    //   setTrendingBooks(res.data.payLoad);
    // });
    setTimeout(() => {
      setWishList([]);
    }, 1000);
  }, []);

  return (
    <div>
      <div className="mt-sm-5 mt-2 bg-dark container rounded bg-black text-white">
        <span className="display-6">Your WishList Items</span>
        {wishList === null && (
          <div className="bg-white rounded mt-sm-2 mt-3 mb-2">
            <BookCardLoader />
          </div>
        )}
        {wishList !== null && wishList.length === 0 && (
          <>
            <br></br>
            <span className="display-6 text-danger">
              No books in your wishlist
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default WishList;
