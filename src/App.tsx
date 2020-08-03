import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from "./intro/landing-page/LandingPage";
import FloatingBetslips from "./intro/landing-page/FloatingBetslips";
import PerformancePage from "./intro/performance-page/PerformancePage";
import PieChart from "./common/PieChart";

function App() {
  return (
    <div className="App">
        <LandingPage />
    </div>
  );
}

export default App;
