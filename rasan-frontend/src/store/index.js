import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import rootReducer from "../reducer/index";
import thunk from "redux-thunk";

const store = configureStore({ reducer: rootReducer }, applyMiddleware(thunk));

export default store;
