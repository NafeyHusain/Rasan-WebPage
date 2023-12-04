import { cartConstants } from "./constants";
import store from "../store";

export const addToCart = (product, newqty = 1) => {
    return async (dispatch) => {
        const { cartItems } = store.getState().cart;
        console.log("action ");

        const qty = cartItems[product._id] ? parseInt(cartItems[product._id].qty + newqty) : 1;
        const updatedCartItems = {
            ...cartItems,
            [product._id]: {
                ...product,
                qty,
            },
        };

        console.log("updated Card ", updatedCartItems);
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
        dispatch({
            type: cartConstants.ADD_TO_CART,
            payload: { cartItems: updatedCartItems },
        });
    };
};

export const updateCart = () => {
    return async (dispatch) => {
        const cartItems = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : null;
        console.log("cart items : ", cartItems);
        if (cartItems) {
            dispatch({
                type: cartConstants.ADD_TO_CART,
                payload: { cartItems },
            });
        }
    };
};
