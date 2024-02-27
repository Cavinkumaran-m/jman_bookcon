import React from "react";
import Axios from "../../Components/Utils/Axios";
import BookCardLoader from "../../Components/BookCard/BoodCardLoader";
import { useState, useEffect, useRef } from "react";
import BookCard from "../../Components/BookCard/BookCard";
import PriceFilter from "../../Components/Filters/PriceFilter";
import RatingFilter from "../../Components/Filters/RatingFilter";
import GenreFilter from "../../Components/Filters/GenreFilter";
import DropDown from "../../Components/InputFields/DropDown";
import Pagination from "../../Components/Utils/Pagination";
import { useContext } from "react";
import { UserContext } from "../../CustomFunctionalities/Context/UserContext";
import styles from "./Home.module.css";

function Home(props) {
  const { Store } = useContext(UserContext);
  const [Books, setBooks] = useState(null);
  const [currentPageBooks, setCurrentPageBooks] = useState(null);
  const [loaded, setLoaded] = useState();
  const [pageLoaded, setPageLoaded] = useState(true);
  const [priceRange, setPriceRange] = useState(5000);
  const [starRange, setStarRange] = useState(5);
  const [nPages, setNPages] = useState(0);
  const [Genre, setGenre] = useState(new Array(6).fill(false));
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(24);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const sortRef = useRef(null);
  const searchRef = useRef(null);
  const DropDownValues = [
    "Name",
    "Latest",
    "Old",
    "lowestPrice",
    "highestPrice",
    "userReview",
  ];
  const handlePriceRange = (event) => {
    setPriceRange(event.target.value);
  };

  const handleStarRange = (event) => {
    setStarRange(event.target.value);
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
      price: priceRange,
      rating: starRange,
      genre: Genre,
    })
      .then((res) => {
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
            <div className="d-flex align-items-center row justify-content-between mt-2">
              <div className="d-flex">
                <input
                  className="form-control-sm"
                  style={{
                    height: "80%",
                    width: "85%",
                  }}
                  placeholder="Book Name/Author Name"
                  ref={searchRef}
                ></input>
                <button
                  className="btn btn-sm rounded-0 text-white flex-grow-1"
                  style={{ backgroundColor: "#1f2833" }}
                  onClick={() => {
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
              {/* Sorter */}
              <div className="d-flex justify-content-end my-3 text-white">
                Sort By:
                <DropDown
                  values={DropDownValues}
                  Reference={sortRef}
                  id="sorter"
                />
              </div>
            </div>
            {/* Narrow by price */}
            <PriceFilter
              priceRange={priceRange}
              handlePriceRange={handlePriceRange}
            />
            {/* Narrow by Review */}
            <RatingFilter
              starRange={starRange}
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
              <span className="display-6 mt-sm-4 mt-5 text-danger">
                No books :{"("}
              </span>
            )}
            {currentPageBooks !== null && (
              <div className="row rounded mb-2 mx-0">
                {currentPageBooks.map((book, index) => (
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
          {currentPageBooks !== null && (
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
