import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" exact Component={Home} />
                    <Route path="/signin" Component={Signin} />
                    <Route path="/signup" Component={Signup} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
