import React from "react";

function GenreFilter({ Genre, handleGenreChange }) {
  const genreNames = [
    "Fiction",
    "Mystery",
    "Fantasy",
    "Romance",
    "Science Fiction",
    "Horror",
  ];
  return (
    <div
      className="text-black mt-4"
      style={{
        border: "1px solid #000",
        borderRadius: "5px",
        backgroundColor: "#f8f6f6",
      }}
    >
      <div className="ps-2" style={{ fontWeight:"bold",borderBottom: "5px solid #fff" }}>
        Narrow By Tag
      </div>
      <center>
        <table style={{fontWeight:"bold", width: "80%" }}>
          <tbody>
            {genreNames.map((genre, index) => (
              <tr key={index}>
                <td>
                  <input
                    style={{ fontWeight:"bold",accentColor: "#3881f5" }}
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
  );
}

export default GenreFilter;
