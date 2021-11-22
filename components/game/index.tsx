import React, {
    FC,
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
} from "react";
import { Deck, Hand, HandType as HandObjType } from "hooks/poker";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import { ScoreType } from "containers/game";
import * as gtag from "utils/gtag";
import HandCard from "./hand-card";
import Modal from "./modal";

export type HandType = {
    first: string;
    second: string;
    atomicFormat: string;
};

export type ResultType = {
    action: string;
    success: boolean;
};

type Props = {
    range: string[];
    stack: number;
    newGame: () => void;
    setScore: Dispatch<SetStateAction<ScoreType>>;
};

const Game: FC<Props> = ({ range, stack, newGame, setScore }) => {
    const [hand, setHand] = useState<HandType>({
        first: "",
        second: "",
        atomicFormat: "",
    });
    const [result, setResult] = useState<ResultType>({
        action: "",
        success: false,
    });
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        /* eslint-disable-next-line */
        const deck: Deck = new Deck();
        deck.make_random();
        /* eslint-disable-next-line */
        const handObj: HandObjType = new Hand(deck.draw(), deck.draw());
        setHand({
            first: handObj.getFirst(),
            second: handObj.getSecond(),
            atomicFormat: handObj.toAtomicFormat(),
        });
    }, []);
    useEffect(() => {
        if (hand) {
            setIsLoaded(true);
        }
    }, [hand]);
    const handlePushOrFold = (value: string) => {
        const isInRange: boolean = range.includes(hand.atomicFormat);
        if (
            (isInRange && value === "push") ||
            (isInRange === false && value === "fold")
        ) {
            setResult({ action: value, success: true });
            setScore((prev) => ({ ...prev, good: prev.good + 1 }));
            gtag.event({
                action: "submit",
                category: "small blind",
                label: value,
                value: 1,
            });
        } else {
            setResult({ action: value, success: false });
            setScore((prev) => ({ ...prev, bad: prev.bad + 1 }));
            gtag.event({
                action: "submit",
                category: "small blind",
                label: value,
                value: 0,
            });
        }
        setShowModal(true);
    };
    if (isLoaded) {
        return (
            <>
                <Card>
                    <Card.Header className="text-center">
                        <h1>push or fold</h1>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {"It's a heads-up. You and your opponent have "}
                            <b>{stack}bb</b>
                        </Card.Text>
                        <Card.Text>You are in small blind with :</Card.Text>
                        <HandCard hand={hand} />
                        <Card.Text>
                            According to the nash equilibrium, do you want to
                            push or fold?
                        </Card.Text>
                        <ButtonToolbar>
                            <div className="col-md-12 text-center">
                                <ButtonGroup className="me-2">
                                    <Button
                                        type="button"
                                        variant="primary"
                                        onClick={() => handlePushOrFold("push")}
                                    >
                                        push
                                    </Button>
                                </ButtonGroup>
                                <ButtonGroup className="me-2">
                                    <Button
                                        type="button"
                                        variant="primary"
                                        onClick={() => handlePushOrFold("fold")}
                                    >
                                        fold
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </ButtonToolbar>
                    </Card.Body>
                </Card>
                <Modal
                    show={showModal}
                    setShow={setShowModal}
                    validate={newGame}
                    hand={hand}
                    stack={stack}
                    result={result}
                />
            </>
        );
    }
    return <div>Loading...</div>;
};

export default Game;
