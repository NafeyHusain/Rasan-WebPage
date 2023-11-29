import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductPage } from "../../../actions";
import getParams from "../../../utils/getParams";
import { useLocation } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Card from "../../../components/UI/Card";

const ProductPage = (props) => {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);
    const location = useLocation();
    const { page } = product;

    console.log("Inside Product page");

    useEffect(() => {
        const params = getParams(location.search);
        const payload = {
            params,
        };
        dispatch(getProductPage(payload));
    }, []);
    return (
        <>
            <h3>{page.title}</h3>
            <Carousel renderThumbs={() => {}}>
                {page.banners &&
                    page.banners.map((banner, index) => (
                        <a key={index} style={{ display: "block" }} href={banner.navigateTo}>
                            <img src={banner.img} alt="" />
                            {/* <p className="legend">Legent 1</p> */}
                        </a>
                    ))}
            </Carousel>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", margin: "10px 0" }}>
                {page.products &&
                    page.products.map((product, index) => (
                        <Card
                            key={index}
                            style={{
                                width: "400px",
                                height: "200px",
                                margin: "0 5px",
                            }}
                        >
                            <img
                                src={product.img}
                                alt=""
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    margin: "0 5px",
                                }}
                            />
                        </Card>
                    ))}
            </div>
        </>
    );
};

export default ProductPage;
