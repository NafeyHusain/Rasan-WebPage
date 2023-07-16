import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions";
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import Category from "./containers/Category";

function App() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    useEffect(() => {
        if (!auth.authenticate) {
            dispatch(isUserLoggedIn());
        }
    }, []);

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <PrivateRoute>
                            <Products />
                        </PrivateRoute>
                    }
                />
                {/* <Route exact path="/category" 
                    render=(props => (<PrivateRoute path="/category" component={Wrapper}>))
/></PrivateRoute>
<Route
    path="/category" 

/> */}
                <Route
                    path="/category"
                    element={
                        <PrivateRoute>
                            <Category />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/orders"
                    element={
                        <PrivateRoute>
                            <Orders />
                        </PrivateRoute>
                    }
                />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </div>
    );
}

export default App;
