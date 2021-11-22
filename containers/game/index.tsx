import React, { FC, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Game from "components/game";
import { getRange } from "hooks/poker";

export type ScoreType = {
    good: number;
    bad: number;
};

const Main: FC = () => {
    const [range, setRange] = useState<string[]>([]);
    const [stack, setStack] = useState<number>(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [score, setScore] = useState<ScoreType>({ good: 0, bad: 0 });

    const newGame = (): void => {
        setIsLoaded(false);
    };
    useEffect(() => {
        if (isLoaded === false) {
            const newStack = Math.floor(Math.random() * 20 + 1);
            if (newStack !== stack) {
                setStack(newStack);
            } else {
                setIsLoaded(true);
            }
        }
    }, [isLoaded]);
    useEffect(() => {
        if (stack > 0) {
            setRange(getRange(stack));
        }
    }, [stack]);
    useEffect(() => {
        if (range.length > 0) {
            setIsLoaded(true);
        }
    }, [range]);
    if (isLoaded) {
        return (
            <>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md lg="6">
                            <Game
                                range={range}
                                stack={stack}
                                newGame={newGame}
                                setScore={setScore}
                            />
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md lg="6">
                            <div>
                                <span>Good answers : {score.good}</span>
                            </div>
                            <div>
                                <span>Bad answers : {score.bad}</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
    return <div>Loading...</div>;
};

export default Main;
