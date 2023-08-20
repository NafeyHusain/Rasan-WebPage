import axios from "../helpers/axios";
import { productConstants } from "./constants";

export const getProductsBySlug = (slug) => {
    return async (dispatch) => {
        const res = await axios.get(`/products/${slug}`);
        console.log(res.data);
        if (res.status === 200) {
            dispatch({
                type: productConstants.GET_PRODUCTS_BY_SLUG,
                payload: res.data,
            });
        } else {
            dispatch({
                type: productConstants.GET_PRODUCTS_BY_SLUG_ERROR,
                payload: res.data,
            });
        }
    };
};
