import React, { useEffect } from "react";
import Layout from "../../components/Layouts";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "../../actions";
import { useLocation, useParams } from "react-router-dom";

const ProductDetailsPage = (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);

    useEffect(() => {
        const productId = params.productId;

        const payload = {
            params: {
                productId,
            },
        };
        dispatch(getProductDetailsById(payload));
    }, []);

    return (
        <Layout>
            <div>{JSON.stringify(product.productDetails)}</div>
        </Layout>
    );
};

export default ProductDetailsPage;
