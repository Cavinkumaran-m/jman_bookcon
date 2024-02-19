import React from "react";

function Pagination({ nPages, currentPage, setCurrentPage }) {
  var limitExceed = false;
  var pageNumbers;
  // if (nPages.length > 10) {
  //   pageNumbers
  // } else {
  //
  // }
  pageNumbers = [...Array(nPages + 1).keys()].slice(1);
  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <nav>
      <ul className="pagination justify-content-center mb-0">
        <li className="page-item">
          <a
            className="page-link"
            style={{ backgroundColor: "#1f2833", color: "#c5c6c7" }}
            onClick={goToPrevPage}
            href="#"
          >
            Previous
          </a>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item ${currentPage == pgNumber ? "active" : ""} `}
          >
            <a
              onClick={() => setCurrentPage(pgNumber)}
              className="page-link"
              href="#"
              style={{ backgroundColor: "#1f2833", color: "#c5c6c7" }}
            >
              {pgNumber}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            className="page-link"
            onClick={goToNextPage}
            href="#"
            style={{ backgroundColor: "#1f2833", color: "#c5c6c7" }}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
