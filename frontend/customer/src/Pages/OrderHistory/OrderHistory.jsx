import React, { useEffect, useState } from "react";
import "./OrderHistory.css"; // Import the CSS file
import { UserContext } from "../../CustomFunctionalities/Context/UserContext";
import { useContext } from "react";
import Axios from "../../Components/Utils/Axios";

const OrderHistory = () => {
  const { Store } = useContext(UserContext);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    Axios.post("orderHistory", {
      Customer_id: Store.user_id,
      type: "getOrderHistory",
    })
      .then((res) => {
        // console.log(res);
        // return;
        if (res.data.status === "success") {
          // console.log(res.data.payload);
          setOrders(res.data.payload);
        } else {
          console.log(res.data.error);
        }
      })
      .catch((err) => {
        console.error("Error", err);
      });
  }, []);
  return (
    <div className="order-history">
      <h1 className="mt-3 mb-3">Order History</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Book</th>
            <th>Quantity</th>
            <th>No. of Pieces per Book</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) =>
            order.Order_Details.map((item, index) => (
              <tr key={`${order.id}-${index}`}>
                {<td>{order.Date.split("T")[0]}</td>}
                <td>{item.Book_Name}</td>
                <td>{item.No_Of_Pieces}</td>
                <td>${item.Cost}</td>
                <td>${item.Cost * item.No_Of_Pieces}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
