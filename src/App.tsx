import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import ReactGA from 'react-ga';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from "./common/NavbarComponent";
import Intro from "./intro/Intro";

const GOOGLE_ANAYTICS_TAG = "G-QNTTPNDQMK"

function App() {
    useEffect(() => {
        document.title = "Beating The Bookies"
    }, [])

    ReactGA.initialize(GOOGLE_ANAYTICS_TAG)
    return (
        <Router>
            <div className="App">
                <NavbarComponent />
                <Switch>
                    <Route exact path={"/"}>
                        <Intro />
                    </Route>
                </Switch>
            </div>
        </Router>
);
}

export default App;
