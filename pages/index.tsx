import React, { FC } from "react";
import Main from "containers/game";
import WelcomeContainer from "containers/welcome";
import "bootstrap/dist/css/bootstrap.min.css";

const App: FC = () => (
    <>
        <WelcomeContainer />
        <Main />
    </>
);

export default App;
