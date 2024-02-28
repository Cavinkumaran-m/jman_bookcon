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
        border: "3px solid #000000",
        borderRadius: "5px",
        backgroundColor: "#4d004d",
      }}
    >
      <div className="ps-2" style={{ borderBottom: "3px solid #ffffff" }}>
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
