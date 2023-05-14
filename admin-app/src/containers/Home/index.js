import React from "react";
import Layout from "../../components/Layouts";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../Home/styles.css";

const Home = (props) => {
    return (
        <Layout>
            <Container>
                <Row>
                    <Col md={2} className="sidebar">
                        <ul>
                            <li>
                                <NavLink to={"/"}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/products"}>Products</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/orders"}>Orders</NavLink>
                            </li>
                        </ul>
                    </Col>
                    <Col md={10} style={{ marginLeft: "auto" }}>
                        conatainer
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default Home;
