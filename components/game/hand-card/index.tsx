import React, { FC } from "react";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { HandType } from "components/game";
import styles from "./styles.module.css";

const HandCard: FC<{ hand: HandType }> = ({ hand }) => (
    <Container>
        <Row className="justify-content-md-center">
            <Col
                className="d-inline-flex"
                style={{ display: "flex", justifyContent: "center" }}
            >
                <div className={styles.pokercard}>
                    <Image
                        className={styles.pokercard}
                        alt={hand.first}
                        src={`/cards/${hand.first}.svg`}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div className={styles.pokercard}>
                    <Image
                        className={styles.pokercard}
                        alt={hand.second}
                        src={`/cards/${hand.second}.svg`}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            </Col>
        </Row>
    </Container>
);
export default HandCard;
