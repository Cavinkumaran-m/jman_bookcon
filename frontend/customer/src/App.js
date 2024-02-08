import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Login_Page";
import NotFound from "./Pages/NotFound/NotFound";
import Home from "./Pages/Home/Home";
import { UserContext } from "./CustomFunctionalities/Context/UserContext";
import { useState } from "react";
import Header from "./Components/Header/Header";
import Search from "./Pages/Search/Search";
import WishList from "./Pages/WishList/WishList";
import Cart from "./Pages/Cart/Cart";
import Register from "./Pages/Registration";
import ForgotPassword from "./Pages/ForgotPassword";
function App() {
  // Use this context to store data locally
  const [Store, setStore] = useState({
    isLoggedIn: false,
    user_id: null,
    cart_items: null,
  });

  // to use context on other components
  // import { UserContext } from "./Context/UserContext";
  // import { useContext } from "react";
  // ...inside component function...
  // const {Store, setStore} = useContext(UserContext)
  // console.log(Store.isLoggedIn)
  // Store.setStore({<new data>})

  return (
    <UserContext.Provider value={{ Store, setStore }}>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
