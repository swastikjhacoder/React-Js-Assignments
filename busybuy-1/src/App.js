//impoting from react------------------------------------------------------------------------------------------------
import React from "react";
//importing the components-------------------------------------------------------------------------------------------
import Navbar from "./components/Navbar";
import ErrorPage from "./pages/misc/Page404";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
//importing components-----------------------------------------------------------------------------------------------
import MyOrders from "./pages/MyOrders";
import Products from "./pages/Products";
//importing context--------------------------------------------------------------------------------------------------
import AuthContextProvider from "./context/AuthContext";
import ProductContextProvider from "./context/ProductContext";
import CartContextProvider from "./context/CartContext";
import MyOrderContextProvider from "./context/MyOrderContext";
//importing from react-router-dom------------------------------------------------------------------------------------
import {Routes,Route} from "react-router-dom";
//implementing App component-----------------------------------------------------------------------------------------
function App() {
  //creating the UI using route--------------------------------------------------------------------------------------
  return (
    <>
      <AuthContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <MyOrderContextProvider>
              <Routes>
                <Route path="/" element={<Navbar />} errorElement={<ErrorPage/>} >
                  <Route path="/" element={<Home />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/myorders" element={<MyOrders />} />
                  <Route path="/products" element={<Products />} />
                </Route>
              </Routes>
            </MyOrderContextProvider>
          </CartContextProvider>
        </ProductContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
