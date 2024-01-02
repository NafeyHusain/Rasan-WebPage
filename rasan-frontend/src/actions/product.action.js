import axios from "../helpers/axios";
import { productConstants } from "./constants";

export const getProductsBySlug = (slug) => {
    return async (dispatch) => {
        const res = await axios.get(`/products/${slug}`);

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

export const getProductPage = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST });
            const { cid, type } = payload.params;
            const res = await axios.get(`/page/${cid}/${type}`);
            if (res.status === 200) {
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
                    payload: res.data,
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_ERROR,
                    payload: error,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getProductDetailsById = (payload) => {
    console.log(payload);
    return async (dispatch) => {
        dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
        let res;
        try {
            const { productId } = payload.params;
            res = await axios.get(`/product/${productId}`);
            console.log("***********#$@%@#%@#%@#");
            console.log(res);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                payload: { productDetails: res.data.product },
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
                payload: { error: res.data.error },
            });
        }
    };
};
