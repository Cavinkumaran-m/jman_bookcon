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
  const [recordsPerPage] = useState(12);
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
      <div className="bg-transparent">
        <div className="row d-flex justify-content-between m-0 pt-2">
          {/* Left Panel */}
          <div className="rounded p-0 col-3 col-md-3 d-none d-md-block">
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

          {/* Right Panel */}
          <div className="col-md-9">
            <div className="d-flex align-items-center row justify-content-between mt-1">
              <div className="col-sm-8">
                <input
                  className="form-control-sm"
                  style={{ height: "80%" }}
                  placeholder="Book Name/Author Name"
                  ref={searchRef}
                ></input>
                <button
                  className="ms-2 btn btn-sm btn-danger rounded"
                  onClick={() => {
                    setLoaded(false);
                    setBooks(null);
                    setCurrentPageBooks(null);
                  }}
                >
                  Search
                </button>
              </div>
              <DropDown
                className="col-sm-4 d-flex justify-content-sm-end"
                values={DropDownValues}
                Reference={sortRef}
                id="sorter"
              />
            </div>
            {/* Results div */}
            {Books === null && (
              <div className="bg-white rounded mt-4 mb-2">
                <BookCardLoader />
              </div>
            )}

            {Books !== null && Books.length === 0 && (
              <span className="display-6 mt-sm-4 mt-5 text-danger">
                No books :(
              </span>
            )}
            {currentPageBooks !== null && (
              <div className="row rounded mt-4 mb-2 px-3">
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
