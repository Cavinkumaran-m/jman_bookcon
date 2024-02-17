import React from "react";
import Axios from "../../Components/Utils/Axios";
import BookCardLoader from "../../Components/BookCard/BoodCardLoader";
import { useState, useEffect, useRef } from "react";
import BookCard from "../../Components/BookCard/BookCard";

function Home(props) {
  const [Books, setBooks] = useState(null);
  const [loaded, setLoaded] = useState();
  const [priceRange, setPriceRange] = useState(5000);
  const [starRange, setStarRange] = useState(5);
  const [Genre, setGenre] = useState(new Array(6).fill(false));
  const sortRef = useRef(null);
  const searchRef = useRef(null);
  const genreNames = [
    "Fiction",
    "Mystery",
    "Fantasy",
    "Romance",
    "Science Fiction",
    "Horror",
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

  useEffect(() => {
    if (loaded) return;
    Axios.post("/books", {
      query: searchRef.current.value,
      sort: sortRef.current.value,
      price: priceRange,
      rating: starRange,
      genre: Genre,
    })
      .then((res) => {
        // console.log(res.data.payload);
        setBooks(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });

    setLoaded(true);
    // Axios.get("trending").then((res) => {
    // console.log(res.data.payLoad);
    //   setTrendingBooks(res.data.payLoad);
    // });
  }, [loaded]);
  return (
    <>
      <div className="bg-dark">
        <div className="row d-flex justify-content-between m-0 pt-2">
          {/* Left Panel */}
          <div className="rounded p-0 col-3 col-md-3 d-none d-md-block">
            {/* Narrow by price */}
            <div className="text-white border border-secondary border-3">
              <div className="border border-secondary border-2 ps-2">
                Narrow By Price
              </div>
              <br></br>
              <center>
                <input
                  style={{ width: "80%" }}
                  type="range"
                  min="100"
                  max="5000"
                  step={100}
                  value={priceRange}
                  onChange={handlePriceRange}
                ></input>
                <br></br>
                <span>Under ₹{priceRange}</span>
              </center>
            </div>

            {/* Narrow by Review */}
            <div className="text-white border border-secondary mt-3 border-3">
              <div className="border border-secondary border-2 ps-2">
                Narrow By Ratings
              </div>
              <br></br>
              <center>
                <input
                  style={{ width: "80%" }}
                  type="range"
                  min="1"
                  max="5"
                  step={1}
                  value={starRange}
                  onChange={handleStarRange}
                ></input>
                <br></br>
                <span>{starRange}&#11088;</span>
              </center>
            </div>

            {/* Narrow by Tag */}
            <div className="text-white border border-secondary border-3 mt-3">
              <div className="border border-secondary border-2 ps-2">
                Narrow By Tag
              </div>
              <br></br>
              <center>
                <table style={{ width: "80%" }}>
                  <tbody>
                    {genreNames.map((genre, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="checkbox"
                            id={genre}
                            name="genre"
                            value={genre}
                            checked={Genre[index]}
                            onChange={() => handleGenreChange(index)}
                          />
                          <label className="ms-2" htmlFor={genre}>
                            {genre}
                          </label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </center>
            </div>
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
                  }}
                >
                  Search
                </button>
              </div>
              <div
                className="col-sm-4 d-flex justify-content-sm-end"
                style={{ height: "80%" }}
              >
                <select
                  className="rounded"
                  style={{ height: "100%" }}
                  name="sorter"
                  id="sorter"
                  ref={sortRef}
                >
                  <option value="" disabled selected hidden>
                    Sort By
                  </option>
                  <option value="Relevance">Relevance</option>
                  <option value="ReleaseDate">Release Date</option>
                  <option value="Name">Name</option>
                  <option value="lowestPrice">Lowest Price</option>
                  <option value="highestPrice">Highest Price</option>
                  <option value="userReview">User Review</option>
                </select>
              </div>
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
            {Books !== null && (
              <div className="row rounded mt-4 mb-2 px-3">
                {Books.map((book, index) => (
                  <BookCard
                    home
                    name={book.Name}
                    author={book.Author}
                    image={book.Cover_Image}
                    price={book.Selling_cost}
                    genre={book.Genre}
                    isbn={book.ISBN}
                    rating={book.Rating}
                    key={index}
                  ></BookCard>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
