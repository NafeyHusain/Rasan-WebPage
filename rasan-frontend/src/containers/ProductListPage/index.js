import React from "react";
import Layout from "../../components/Layouts";
import "./style.css";
import getParams from "../../utils/getParams";
import ProductStore from "./ProductStore";
import { useLocation } from "react-router-dom";
import ProductPage from "./ProductPage";
import ClothingAndAccessories from "./ClothingAndAccessories";

const ProductListPage = (props) => {
    const location = useLocation();

    const renderProduct = () => {
        const params = getParams(location.search);
        let content = null;
        switch (params.type) {
            case "store":
                content = <ProductStore {...props} />;
                break;
            case "page":
                content = <ProductPage {...props} />;
                break;
            default:
                content = <ClothingAndAccessories {...props} />;
        }
        return content;
    };
    return <Layout>{renderProduct()}</Layout>;
};

export default ProductListPage;
