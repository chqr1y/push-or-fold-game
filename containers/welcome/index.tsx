import React, { FC, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Welcome from "components/welcome";

const WelcomeContainer: FC = () => {
    return (
        <>
            <Container className="mt-3">
                <Row className="justify-content-md-center">
                    <Col md lg="6">
                        <Welcome />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default WelcomeContainer;
