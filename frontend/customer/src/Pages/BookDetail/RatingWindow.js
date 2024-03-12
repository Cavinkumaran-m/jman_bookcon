import { Rating } from "react-simple-star-rating";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../CustomFunctionalities/Context/UserContext";
import Axios from "../../Components/Utils/Axios";
import { toast } from "react-toastify";

const RatingWindow = (props) => {
  const { Store } = useContext(UserContext);
  const [rate, setRate] = useState(0);

  function handleRating(rate) {
    setRate(rate);
  }

  function submission() {
    Axios.post("rating", {
      //   Customer_id: Store.user_id,
      Book_id: props.id,
      rating: rate,
      type: "addRating",
    })
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Your rating submitted successfully", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          props.close();
        } else {
          toast.error("Error submitting the rating", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <center className="border rounded-1 mb-3 pb-2">
      <Rating onClick={handleRating}></Rating>
      <div>
        <button
          style={{ width: "fit-content" }}
          className="btn btn-sm btn-primary"
          onClick={submission}
        >
          Submit
        </button>
        <button
          style={{ width: "fit-content" }}
          className="ms-1 btn-sm btn btn-danger"
          onClick={props.close}
        >
          Cancel
        </button>
      </div>
    </center>
  );
};

export default RatingWindow;
