import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from "./intro/landing-page/LandingPage";
import FloatingBetslips from "./intro/landing-page/FloatingBetslips";
import PerformancePage from "./intro/performance-page/PerformancePage";
import PieChart from "./common/PieChart";
import Filters from "./intro/performance-page/Filters";
import FaqPage from "./intro/faq-page/FaqPage";
import TitleBreak from "./common/TitleBreak";
import NavbarComponent from "./common/NavbarComponent";
import ManualSignUp from "./dashboard/sign-in-popup/ManualSignUp";
import SigninPopup from "./dashboard/sign-in-popup/SigninPopup";
import YourStats from "./dashboard/account-page/YourStats";
import Dashboard from "./dashboard/Dashboard";
import Intro from "./intro/Intro";

function App() {
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
