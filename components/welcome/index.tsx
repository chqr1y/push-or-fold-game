import React, { FC } from "react";
import Card from "react-bootstrap/Card";

const Welcome: FC = () => (
    <Card>
        <Card.Body>
            <Card.Title className="text-center">Poker simulator</Card.Title>
            <Card.Text>
                This application is a simulator to test your ability to
                choose the right decision when you are in small blind with a
                short stack (less than 20bb) in a heads-up poker game.
            </Card.Text>
            <Card.Text>
                The expected result is the{" "}
                <Card.Link href="https://en.wikipedia.org/wiki/Nash_equilibrium">
                    Nash Equilibrium
                </Card.Link>{" "}
                of the situation, which means that your opponant plays
                according to the Nash Equilibrium.
            </Card.Text>
            <Card.Text>
                The data used to build this application comes from the{" "}
                <Card.Link href="https://www.holdemresources.net/hune">
                    HeadsUp Push/Fold Nash Equilibrium
                </Card.Link>{" "}
                chart of the Holdemresources website.
            </Card.Text>
        </Card.Body>
    </Card>
);

export default Welcome;
