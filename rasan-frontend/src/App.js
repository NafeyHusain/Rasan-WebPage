import React, { useEffect } from "react";
import "./App.css";
import HomePage from "./containers/HomePage";
import { Route, Routes } from "react-router-dom";
import ProductListPage from "./containers/ProductListPage/index";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions";
import ProductDetailsPage from "./containers/:roductDetailsPage";
function App() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    useEffect(() => {
        if (!auth.authenticate) {
            dispatch(isUserLoggedIn());
        }
    }, [auth.authenticate]);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:productSlug/:productId/p" element={<ProductDetailsPage />} />
                <Route path="/:slug" element={<ProductListPage />} />
            </Routes>
        </div>
    );
}

export default App;
