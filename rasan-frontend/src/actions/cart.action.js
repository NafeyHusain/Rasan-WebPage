import { cartConstants } from "./constants";
import store from "../store";
import axios from "../helpers/axios";

const getCartItems = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
            const res = await axios.post(`/user/getAllCartItems`);
            console.log("#$$#$$#$#$@#   STFU^^#$#$%@#$@# ");
            console.log(res);

            if (res.status === 200) {
                const { cartItems } = res.data;
                console.log({ getCartItems: cartItems });
                if (cartItems) {
                    dispatch({
                        type: cartConstants.ADD_TO_CART_SUCCESS,
                        payload: { cartItems },
                    });
                }
            } else {
                console.log("bas request ");
            }
        } catch (error) {
            console.log(error);
        }
    };
};
export const addToCart = (product, newqty = 1) => {
    return async (dispatch) => {
        const {
            cart: { cartItems },
            auth,
        } = store.getState();

        const qty = cartItems[product._id] ? parseInt(cartItems[product._id].qty + newqty) : 1;
        const updatedCartItems = {
            ...cartItems,
            [product._id]: {
                ...product,
                qty,
            },
        };

        if (auth.authenticate) {
            dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
            const payload = {
                cartItems: [
                    {
                        product: product._id,
                        quantity: qty,
                    },
                ],
            };
            console.log("payload  ", payload);
            const res = await axios.post("/user/cart/addtocart", payload);
            console.log(res);
            if (res.status === 201 || res.status === 200) {
                dispatch(getCartItems());
            }
        } else {
            localStorage.setItem("cart", JSON.stringify(updatedCartItems));
        }

        dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: { cartItems: updatedCartItems },
        });
    };
};

export const updateCart = () => {
    return async (dispatch) => {
        const { auth } = store.getState();
        let cartItems = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : null;

        if (auth.authenticate) {
            localStorage.removeItem("cart");
            if (cartItems) {
                const payload = {
                    cartItems: Object.keys(cartItems).map((key, index) => {
                        return {
                            quantity: cartItems[key].qty,
                            product: cartItems[key]._id,
                        };
                    }),
                };
                if (Object.keys(cartItems).length > 0) {
                    const res = await axios.post(`/user/cart/addtocart`, payload);
                    if (res.status === 201) {
                        dispatch(getCartItems());
                    }
                }
            }
        } else {
            if (cartItems) {
                dispatch({
                    type: cartConstants.ADD_TO_CART_SUCCESS,
                    payload: { cartItems },
                });
            }
        }
    };
};

export { getCartItems };
