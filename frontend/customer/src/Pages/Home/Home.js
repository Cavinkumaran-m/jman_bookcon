import React from "react";
import Axios from "../../Components/Utils/Axios";
import BookCardLoader from "../../Components/BookCard/BoodCardLoader";
import { useState, useEffect, useRef } from "react";
import BookCard from "../../Components/BookCard/BookCard";
import PriceFilter from "../../Components/Filters/PriceFilter";
import RatingFilter from "../../Components/Filters/RatingFilter";
import GenreFilter from "../../Components/Filters/GenreFilter";
import DropDown from "../../Components/Filters/DropDown";
import Pagination from "../../Components/Utils/Pagination";
import { useContext } from "react";
import { UserContext } from "../../CustomFunctionalities/Context/UserContext";
import styles from "../../Assets/Home.module.css";
import puss from "../../Images/puss.jpg";

function Home(props) {
  const { Store } = useContext(UserContext);
  const [Books, setBooks] = useState(null);
  const [currentPageBooks, setCurrentPageBooks] = useState(null);
  const [loaded, setLoaded] = useState();
  const [pageLoaded, setPageLoaded] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [minStar, setMinStar] = useState(1);
  const [maxStar, setMaxStar] = useState(5);
  const [nPages, setNPages] = useState(0);
  const [Genre, setGenre] = useState(new Array(6).fill(false));
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(24);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const sortRef = useRef(null);
  const searchRef = useRef(null);
  var debouncer = null;
  const DropDownValues = [
    "Name",
    "Latest",
    "Old",
    "lowestPrice",
    "highestPrice",
    "userReview",
  ];
  const handlePriceRange = (e) => {
    setMinPrice(e.minValue);
    setMaxPrice(e.maxValue);
  };

  const handleStarRange = (e) => {
    setMinStar(e.minValue);
    setMaxStar(e.maxValue);
  };

  const handleGenreChange = (position) => {
    const updatedCheckedState = Genre.map((item, index) =>
      index === position ? !item : item
    );
    setGenre(updatedCheckedState);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCurrentPageBooks(null);
    setPageLoaded(false);
  };

  useEffect(() => {
    if (!pageLoaded) {
      setCurrentPageBooks(Books.slice(indexOfFirstRecord, indexOfLastRecord));
      setPageLoaded(true);
    }
    if (loaded) return;
    Axios.post("/books", {
      query: searchRef.current.value,
      sort: sortRef.current.value,
      price: [minPrice, maxPrice],
      rating: [minStar, maxStar],
      genre: Genre,
    })
      .then((res) => {
        // console.log(res);
        setNPages(Math.ceil(res.data.payload.length / recordsPerPage));
        setBooks(res.data.payload);
        setCurrentPage(1);
        setCurrentPageBooks(
          res.data.payload.slice(indexOfFirstRecord, indexOfLastRecord)
        );
      })
      .catch((err) => {
        console.log(err);
      });

    setLoaded(true);
    // Axios.get("trending").then((res) => {
    // console.log(res.data.payLoad);
    //   setTrendingBooks(res.data.payLoad);
    // });
  }, [loaded, pageLoaded]);
  return (
    <>
      <div className="bg-transparent mt-3 px-2">
        <div className="row d-flex justify-content-between m-0 pt-2">
          {/* Left Panel */}
          <div
            className={`${styles.left_panel} rounded p-0 px-3 d-none d-md-block`}
          >
            {/* col-3 col-md-3 for above */}
            {/* Search Bar */}
            <div className="d-flex align-items-center row justify-content-between mt-4">
              <div className="d-flex">
                <input
                  onChange={() => {
                    if (debouncer !== null) {
                      clearInterval(debouncer);
                    }
                    debouncer = setInterval(() => {
                      clearInterval(debouncer);
                      setLoaded(false);
                      setBooks(null);
                      setCurrentPageBooks(null);
                    }, 3000);
                  }}
                  className="form-control-sm rounded-0"
                  style={{
                    height: "80%",
                    width: "85%",
                  }}
                  placeholder="Book Name/Author Name"
                  ref={searchRef}
                ></input>
                <button
                  className="btn btn-sm text-white flex-grow-1"
                  style={{
                    backgroundColor: "#3881F5",
                    borderRadius: "0px 10px 10px 0px ",
                  }}
                  onClick={() => {
                    if (debouncer !== null) {
                      clearInterval(debouncer);
                    }
                    setLoaded(false);
                    setBooks(null);
                    setCurrentPageBooks(null);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Sorter */}
            <DropDown
              values={DropDownValues}
              Reference={sortRef}
              id="sorter"
              className={"mt-4"}
            />
            {/* Narrow by price */}
            <PriceFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              handlePriceRange={handlePriceRange}
            />
            {/* Narrow by Review */}
            <RatingFilter
              minStar={minStar}
              maxStar={maxStar}
              handleStarRange={handleStarRange}
            />
            {/* Narrow by Tag */}
            <GenreFilter Genre={Genre} handleGenreChange={handleGenreChange} />
          </div>
          <div style={{ width: "22%" }}></div>

          {/* Right Panel */}
          <div className={`${styles.right_panel} p-0`}>
            {/* col-md-9 for above */}
            {/* Results div */}
            {Books === null && (
              <div className="row m-0">
                <BookCardLoader />
                <BookCardLoader />
                <BookCardLoader />
                <BookCardLoader />
              </div>
            )}

            {Books !== null && Books.length === 0 && (
              <span className="display-6 mt-sm-4 mt-5">
                <div className="row m-0">
                  <center>
                    <img
                      src={puss}
                      // style={{ width: "60%" }}
                      className="rounded-5 mt-2 col-10 col-sm-6"
                    ></img>
                  </center>
                </div>
                <div className="display-6 px-5">
                  Sorry... Unfortunately we don't have the book you want...
                </div>
              </span>
            )}
            {currentPageBooks !== null && (
              <div className="row rounded mb-2 mx-0">
                {currentPageBooks.map((book, index) => (
                  <BookCard
                    loggedIn={Store.isLoggedIn}
                    home
                    id={book._id}
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
          {currentPageBooks !== null && nPages > 1 && (
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={handlePageChange}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
