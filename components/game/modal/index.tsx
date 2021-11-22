import React, { FC, Dispatch, SetStateAction } from "react";
import { Modal as BsModal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { HandType, ResultType } from "components/game";
import HandCard from "../hand-card";

type Props = {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    validate: () => void;
    hand: HandType;
    stack: number;
    result: ResultType;
};

const Modal: FC<Props> = ({ show, setShow, validate, hand, stack, result }) => {
    let message = "";
    if (result.success) {
        message = `Absolutely, you have to ${result.action} ${hand.atomicFormat} in small blind with a stack equal to ${stack} big blinds.`;
    } else {
        message = `Unfortunately, you don't have to ${result.action} ${hand.atomicFormat} in small blind with a stack equal to ${stack} big blinds.`;
    }
    return (
        <BsModal show={show} onHide={() => setShow((prev) => !prev)}>
            <BsModal.Header closeButton>
                <BsModal.Title>Result</BsModal.Title>
            </BsModal.Header>

            <BsModal.Body
                style={{
                    backgroundColor: result.success ? "#198754" : "#dc3545",
                }}
            >
                <p>{message}</p>
                <div className="col-md-12 text-center">
                    <HandCard hand={hand} />
                </div>
            </BsModal.Body>

            <BsModal.Footer>
                <Button variant="primary" onClick={() => validate()}>
                    Try again
                </Button>
            </BsModal.Footer>
        </BsModal>
    );
};

export default Modal;
