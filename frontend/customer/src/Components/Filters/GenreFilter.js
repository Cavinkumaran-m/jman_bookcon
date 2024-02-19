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
    <div className="text-white border border-secondary border-3 mt-3">
      <div className="border border-secondary border-2 ps-2">Narrow By Tag</div>
      <br></br>
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
