import React, { useEffect } from "react";
import "./App.css";
import HomePage from "./containers/HomePage";
import { Route, Routes } from "react-router-dom";
import ProductListPage from "./containers/ProductListPage/index";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions";
import ProductDetailsPage from "./containers/ProductDetailsPage";
import CartPage from "./containers/CartPage";
import { updateCart } from "./actions/cart.action";
import CheckoutPage from "./containers/CheckoutPage";
import OrderPage from "./containers/OrderPage";
import OrderDetailsPage from "./containers/OrderDetailsPage";
function App() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    useEffect(() => {
        if (!auth.authenticate) {
            dispatch(isUserLoggedIn());
        }
    }, [auth.authenticate]);

    useEffect(() => {
        dispatch(updateCart());
    }, [auth.authenticate]);
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/account/orders" element={<OrderPage />} />
                <Route path="/order_details/:orderId" element={<OrderDetailsPage />} />
                <Route path="/:productSlug/:productId/p" element={<ProductDetailsPage />} />
                <Route path="/:slug" element={<ProductListPage />} />
            </Routes>
        </div>
    );
}

export default App;
