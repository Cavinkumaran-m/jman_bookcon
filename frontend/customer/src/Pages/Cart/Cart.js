import React, { useEffect, useState, useContext } from "react";
import Axios from "../../Components/Utils/Axios";
import { UserContext } from "../../CustomFunctionalities/Context/UserContext";
import { NavLink } from "react-router-dom";
import emptyCart from "../../Images/cart.png";

function Cart(props) {
  const [cartItems, setCartItems] = useState([]);
  const { Store } = useContext(UserContext);
  // const [garbage, reload] = useState(true);
  // const reloader = () => {
  //   reload((prev) => !prev);
  // };
  const [street,setStreet] = useState('');
  const [city,setCity] = useState('');
  const [stateName,setStateName] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState('');

  const fetchCartItems = async () => {
    
    Axios.post("cart", {
      Customer_id: Store.user_id,
      type: "getCart",
    }).then((res) => {
      setCartItems(res.data.payload);
    });
  };


  // DELETE NOT WORKING 
  const handleDelete = (Book_id,e)=>{
    e.preventDefault();
    Axios.post("cart", {
        Customer_id: Store.user_id,
        type: "removeFromCart",
        Book_id: Book_id,
      })
        .then((res)=>{
          if(res.data.status === "success"){
            console.log("Entry then");
            fetchCartItems();
          }
        })
        .catch((err) => {
        console.error("Error",err);
      });
  };

  const handleUpdateQuantity = async (Book_id, newQuantity,e) => {
    e.preventDefault();
        Axios.post("cart", {
      Customer_id: Store.user_id,
      Book_id: Book_id,
      quantity: newQuantity,
      type: "updateCartQuantity",
      })
      .then((res)=>{
        if(res.data.status === "success"){
          console.log("Entry then");
          fetchCartItems();
        }
      })
    .catch ((error)=> {
      console.error("Error updating cart quantity:", error);
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    console.log(street,city,stateName,country,pincode);
    Axios.post("checkout", {
        Customer_id: Store.user_id,
        Street:street,
        City:city,
        State:stateName,
        Country:country,
        Pincode:pincode,
        Cost:grandTotal
      })
      .then((res)=>{
        if(res.data.status === "success"){
          console.log("Entry then");
          fetchCartItems();
        }
      })
    .catch ((error) =>{
      console.error("Error during checkout:", error);
    });
  };

  const updatedCart = cartItems.map((cartItem, index) => {
    const total = cartItem.book_details.Selling_cost * cartItem.quantity;
    const updatedItem = {
      ...cartItem,
      total: total,
      quantity: cartItem.quantity,
    };
    return updatedItem;
  });

  const grandTotal = updatedCart.reduce((accumulator, cartItem) => {
    return accumulator + cartItem.total;
  }, 0);

  const totalItems = updatedCart.reduce((accumulator, cartItem) => {
    return accumulator + cartItem.quantity;
  }, 0);

  useEffect(() => {
    fetchCartItems();
  }, []);
  return (
    <div>
      <div className=" px-4">
        <div className="row d-flex justify-content-between m-0 p-0 pt-2">
          {cartItems.length ? (
            <div
              role="main"
              className="main shop pb-4"
              style={{ marginTop: "2rem" }}
            >
              <div className="container">
                <div className="row pb-4 mb-5">
                  <div className="col-lg-8 mb-5 mb-lg-0">
                    <form >
                      <div className="table-responsive">
                        {/* Table for displaying the items in a cart */}
                        <table
                          className="table table-striped shop_table cart"
                          style={{ marginTop: "0px" }}
                        >
                          <thead>
                            <tr
                              className="text-primary"
                              style={{ fontWeight: "bold" }}
                            >
                              <th
                                className="product-name text-uppercase"
                                style={{ width: "50%" }}
                              >
                                <span
                                  style={{
                                    fontSize: "1.2em",
                                    fontWeight: "bold",
                                    marginRight: "10px",
                                  }}
                                >
                                  Book Details
                                </span>
                              </th>
                              <th style={{ width: "10%" }}></th>{" "}
                              {/* Column to Display the delete book from cart button */}
                              <th style={{ width: "10%" }}></th>{" "}
                              {/* Column to increase the quantity in cart */}
                              <th style={{ width: "10%" }}></th>{" "}
                              {/* Column to decrease the quantity in cart */}
                              <th
                                className="product-price text-uppercase"
                                style={{ width: "7%" }}
                              >
                                <span
                                  style={{
                                    fontSize: "1.2em",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Price
                                </span>
                              </th>
                              <th
                                className="product-quantity text-uppercase"
                                style={{ width: "13%" }}
                              >
                                <span
                                  style={{
                                    fontSize: "1.2em",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Quantity
                                </span>
                              </th>
                              <th
                                className="product-subtotal text-uppercase text-end"
                                style={{ width: "10%" }}
                              >
                                <span
                                  style={{
                                    fontSize: "1.2em",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Subtotal
                                </span>
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {updatedCart.map((item, index) => (
                              <tr
                                key={index}
                                style={{
                                  marginBottom: "10px",
                                  marginTop: "10px",
                                }}
                              >
                                <td>
                                  {" "}
                                  {/* To display the book cover, name and author */}
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <img
                                      className="img"
                                      src={item.book_details.Cover_Image}
                                      alt="Book Cover"
                                      style={{
                                        maxWidth: "100px",
                                        maxHeight: "100px",
                                        marginRight: "15px",
                                      }}
                                    />
                                    <div>
                                      <span
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "1.2em",
                                          marginBottom: "5px",
                                          display: "block",
                                        }}
                                      >
                                        {item.book_details.Name}
                                      </span>
                                      <span
                                        style={{
                                          fontStyle: "italic",
                                          fontSize: "0.9em",
                                          color: "#555",
                                        }}
                                      >
                                        {item.book_details.Author}
                                      </span>
                                    </div>
                                  </div>
                                </td>
                                <td className="text-center align-middle">
                                  {" "}
                                  {/* To display the delete button*/}
                                  <button
                                    className="btn d-flex justify-content-center align-items-center"
                                    style={{
                                      width: "80px",
                                      height: "40px",
                                      backgroundColor: "#e1e3e6",
                                      color: "#3881f5",
                                      fontWeight: "bold",
                                      display: "inline-block",
                                      border: "1px solid #000",
                                    }}
                                    onClick={(e)=>
                                      handleDelete(item.book_details._id,e)
                                    }
                                  >
                                    {" "}
                                    Delete
                                  </button>
                                </td>
                                <td className="text-center align-middle">
                                  {" "}
                                  {/* To display the increment book quantity*/}
                                  <button
                                    className="btn"
                                    style={{
                                      width: "80px",
                                      height: "40px",
                                      backgroundColor: "transparent",
                                      color: "#3881f5",
                                      fontWeight: "bold",
                                      fontSize: "20px",
                                      display: "inline-block",
                                    }}
                                    onClick={(e) =>
                                      handleUpdateQuantity(
                                        item.book_details._id,
                                        item.quantity + 1,
                                        e
                                      )
                                    }
                                  >
                                    +
                                  </button>
                                </td>
                                <td className="text-center align-middle">
                                  {" "}
                                  {/* To display the decrement book quantity*/}
                                  <button
                                    className="btn"
                                    style={{
                                      width: "80px",
                                      height: "40px",
                                      backgroundColor: "transparent",
                                      color: "#3881f5",
                                      fontWeight: "bold",
                                      fontSize: "20px",
                                      display: "inline-block",
                                    }}
                                    onClick={(e) =>
                                      handleUpdateQuantity(
                                        item.book_details._id,
                                        item.quantity - 1,
                                        e
                                      )
                                    }
                                  >
                                    -
                                  </button>
                                </td>
                                <td
                                  className="text-center align-middle"
                                  style={{
                                    fontWeight: "bold",
                                    paddingLeft: "20px",
                                  }}
                                >
                                  {item.book_details.Selling_cost}
                                </td>
                                <td
                                  className="text-center align-middle"
                                  style={{
                                    fontWeight: "bold",
                                    paddingLeft: "20px",
                                  }}
                                >
                                  {item.quantity}
                                </td>
                                <td
                                  className="text-center align-middle"
                                  style={{
                                    fontWeight: "bold",
                                    paddingLeft: "20px",
                                  }}
                                >
                                  {item.total}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        ;
                      </div>
                    </form>
                  </div>

                  {/*  Order Summary Card */}

                  <div className="col-lg-4 position-relative ">
                    <div
                      className="card border-width-2 border-radius-0 border-color-hover-dark fixed-right "
                      data-plugin-sticky
                      data-plugin-options="{'minWidth': 991, 'containerSelector': '.row', 'padding': {'top': 85}}"
                    >
                      <div className="card-body">
                        <h4 className="font-weight-bold text-primary text-uppercase text-4 mb-3">
                          Order Summary
                        </h4>
                        <table className="shop_table cart-totals mb-4">
                          <thead>
                            <th style={{ width: "40%" }}></th>
                            <th style={{ width: "60%" }}></th>
                          </thead>
                          <tbody>
                            <tr style={{ height: "50px" }}>
                              <td classname="align-middle">
                                <span style={{ fontWeight: "bold" }}>
                                  Street :
                                </span>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Street name"
                                  id="Street"
                                  onChange={e => setStreet(e.target.value)}
                                />
                              </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                              <td classname="align-middle">
                                <span style={{ fontWeight: "bold" }}>
                                  City :
                                </span>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="City name"
                                  id="City"
                                  onChange={e => setCity(e.target.value)}
                                />
                              </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                              <td classname="align-middle">
                                <span style={{ fontWeight: "bold" }}>
                                  State :
                                </span>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="State name"
                                  id="State"
                                  onChange={e => setStateName(e.target.value)}
                                />
                              </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                              <td classname="align-middle">
                                <span style={{ fontWeight: "bold" }}>
                                  Country :
                                </span>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Country name"
                                  id="Country"
                                  onChange={e => setCountry(e.target.value)}
                                />
                              </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                              <td classname="align-middle">
                                <span style={{ fontWeight: "bold" }}>
                                  Pincode :
                                </span>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Pincode"
                                  id="Pincode"
                                  onChange={e => setPincode(e.target.value)}
                                />
                              </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                              <td className=" align-middle">
                                <span style={{ fontWeight: "bold" }}>
                                  Total Number :
                                </span>
                              </td>
                              <td className=" align-middle"> {totalItems} </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                              <td className="align-middler ">
                                <span style={{ fontWeight: "bold" }}>
                                  Total Price :{" "}
                                </span>
                              </td>
                              <td className="align-middle ">{grandTotal}</td>
                            </tr>
                          </tbody>
                        </table>
                        <button
                          type="button"
                          
                          onClick={handleCheckout}
                          className="btn btn-dark btn-modern w-100 text-uppercase bg-color-hover-primary border-color-hover-primary border-radius-0 text-3 py-3"
                        >
                          Proceed to Checkout{" "}
                          <i className="fas fa-arrow-right ms-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <span
                className="rounded-3 display-6 mt-sm-4 mt-5 py-3 bg-dark"
                style={{ color: "#3881F5", textAlign: "center" }}
              >
                <img src={emptyCart} width={"200px"}></img>
                <br></br>
                Browse Our Limitless Collections and find your NEXT GREAT
                READ!!!
              </span>
              <center>
                <NavLink
                  className="nav-item nav-link mt-2 p-2 rounded-3"
                  to="../home"
                  style={{
                    color: "#fff",
                    backgroundColor: "#1f2833",
                    width: "fit-content",
                  }}
                >
                  Click Here !
                </NavLink>
              </center>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Cart;
