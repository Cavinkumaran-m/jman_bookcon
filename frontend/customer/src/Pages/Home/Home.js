import React from "react";
import Axios from "../../Components/Utils/Axios";
import BookCardLoader from "../../Components/BookCard/BoodCardLoader";
import { useState, useEffect } from "react";

function Home(props) {
  const [trendingBooks, setTrendingBooks] = useState(null);
  const [priceRange, setPriceRange] = useState(500);
  const [starRange, setStarRange] = useState(5);

  const handlePriceRange = (event) => {
    setPriceRange(event.target.value);
  };
  const handleStarRange = (event) => {
    setStarRange(event.target.value);
  };
  useEffect(() => {
    // Axios.get("trending").then((res) => {
    // console.log(res.data.payLoad);
    //   setTrendingBooks(res.data.payLoad);
    // });
  }, []);
  return (
    <>
      <div className="mt-5 bg-dark container rounded">
        <div className="row d-flex justify-content-between">
          {/* Left Panel */}
          <div className="rounded" style={{ width: "75%" }}>
            <div
              className="d-flex align-items-center justify-content-between"
              style={{ height: "40px" }}
            >
              <div>
                <input
                  className="form-control-sm"
                  style={{ height: "80%" }}
                  placeholder="Book Name/Author Name"
                ></input>
                <button className="ms-2 btn btn-sm btn-danger rounded">
                  Search
                </button>
              </div>
              <div style={{ height: "80%" }}>
                <label className="text-white" htmlFor="sorter">
                  Sort By:
                </label>
                <select
                  className="rounded"
                  style={{ height: "100%" }}
                  name="sorter"
                  id="sorter"
                >
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
            <div className="bg-white rounded mt-4 mb-2">
              <BookCardLoader />
            </div>
          </div>

          {/* Right Panel */}
          <div className="rounded p-0" style={{ width: "24%" }}>
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
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          id="fiction"
                          name="genre"
                          value="fiction"
                        />
                        <label className="ms-2" htmlFor="fiction">
                          Fiction
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          id="mystery"
                          name="genre"
                          value="mystery"
                        />
                        <label className="ms-2" htmlFor="mystery">
                          Mystery
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          id="fantasy"
                          name="genre"
                          value="fantasy"
                        />
                        <label className="ms-2" htmlFor="fantasy">
                          Fantasy
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          id="romance"
                          name="genre"
                          value="romance"
                        />
                        <label className="ms-2" htmlFor="romance">
                          Romance
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          id="science-fiction"
                          name="genre"
                          value="science-fiction"
                        />
                        <label className="ms-2" htmlFor="science-fiction">
                          Science Fiction
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          id="horror"
                          name="genre"
                          value="horror"
                        />
                        <label className="ms-2" htmlFor="horror">
                          Horror
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </center>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
