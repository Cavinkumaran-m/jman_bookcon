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
      className="text-white mt-3"
      style={{
        border: "3px solid #c5c6c7",
        borderRadius: "5px",
        backgroundColor: " #1f2833",
      }}
    >
      <div className="ps-2" style={{ borderBottom: "3px solid #c5c6c7" }}>
        Narrow By Tag
      </div>
      <center>
        <table style={{ width: "80%" }}>
          <tbody>
            {genreNames.map((genre, index) => (
              <tr key={index}>
                <td>
                  <input
                    style={{ accentColor: "#66fcf1" }}
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
