import React from "react";
import Layout from "../../components/Layouts";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Input from "../../components/UI/Input";

const Signin = (props) => {
    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: "50px" }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form>
                            <Input
                                label="Email address"
                                type="email"
                                placeholder="Enter email"
                                errorMessage="We'll never share your email with anyone else"
                                value=""
                                onChange={() => {}}
                            />
                            <Input label="Password" type="text" placeholder="Password" value="" onChange={() => {}} />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default Signin;
