import React from 'react';
import './OrderHistory.css'; // Import the CSS file

const OrderHistory = () => {
  const orders = [
    { id: 1, date: '2024-03-10', items: [
        { book: "Book A", quantity: 3, piecesPerBook: 5, cost: 150 },
        { book: "Book B", quantity: 2, piecesPerBook: 10, cost: 120 }
      ]
    },
    { id: 2, date: '2024-03-11', items: [
        { book: "Book C", quantity: 4, piecesPerBook: 7, cost: 220 }
      ]
    }
    // Add more orders as needed
  ];

  return (
    <div className="order-history">
      <h1>Order History</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Book</th>
            <th>Quantity</th>
            <th>No. of Pieces per Book</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            order.items.map((item, index) => (
              <tr key={`${order.id}-${index}`}>
                {index === 0 ? <td rowSpan={order.items.length}>{order.id}</td> : null}
                {index === 0 ? <td rowSpan={order.items.length}>{order.date}</td> : null}
                <td>{item.book}</td>
                <td>{item.quantity}</td>
                <td>{item.piecesPerBook}</td>
                <td>${item.cost.toLocaleString()}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
