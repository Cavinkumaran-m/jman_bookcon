import React from "react";

function Pagination({ nPages, currentPage, setCurrentPage }) {
  var limitExceed = false;
  var pageNumbers = [];
  if (nPages > 5) {
    // Adds starting first 2 pages to paginator
    for (var i = 1; i < 3; i++) {
      if (!pageNumbers.includes(i)) {
        pageNumbers.push(i);
      }
    }
    // Adds current to paginator
    if (!pageNumbers.includes(currentPage)) {
      pageNumbers.push(currentPage);
    }

    // Adds starting last 2 pages to paginator
    for (var i = 2; i > 0; i--) {
      if (!pageNumbers.includes(nPages + 1 - i)) {
        pageNumbers.push(nPages + 1 - i);
      }
    }

    pageNumbers.sort((a, b) => a - b);

    for (var i = 0; i < pageNumbers.length - 1; i++) {
      if (pageNumbers[i] + 1 !== pageNumbers[i + 1]) {
        pageNumbers.splice(i + 1, 0, "...");
        i++;
      }
    }
  } else {
    pageNumbers = [...Array(nPages + 1).keys()].slice(1);
  }
  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  // console.log(nPages + " " + currentPage + " \n" + pageNumbers);

  return (
    <nav>
      <ul className="pagination justify-content-center mt-2 mb-0">
        <li className="page-item">
          <a
            className="page-link"
            style={{
              backgroundColor: "#1f2833",
              color: "#c5c6c7",
              cursor: "pointer",
            }}
            onClick={goToPrevPage}
          >
            {"<"}
          </a>
        </li>
        {pageNumbers.map((pgNumber, index) => {
          if (pgNumber === "...") {
            return (
              <li key={index}>
                <a
                  className="page-link"
                  style={{ backgroundColor: "#1f2833", color: "#c5c6c7" }}
                >
                  {pgNumber}
                </a>
              </li>
            );
          } else {
            return (
              <li
                key={index}
                className={`page-item ${
                  currentPage == pgNumber ? "active" : ""
                } `}
              >
                <a
                  onClick={() => setCurrentPage(pgNumber)}
                  className="page-link"
                  style={{
                    backgroundColor: "#1f2833",
                    color: "#c5c6c7",
                    cursor: "pointer",
                  }}
                >
                  {pgNumber}
                </a>
              </li>
            );
          }
        })}
        <li className="page-item">
          <a
            className="page-link"
            onClick={goToNextPage}
            style={{
              backgroundColor: "#1f2833",
              color: "#c5c6c7",
              cursor: "pointer",
            }}
          >
            {">"}
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
