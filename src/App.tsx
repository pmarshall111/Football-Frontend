import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from "./landing-page/LandingPage";
import RisingBetslips from "./landing-page/RisingBetslips";
import PerformancePage from "./performance-page/PerformancePage";

function App() {
  return (
    <div className="App">
      <PerformancePage />
    </div>
  );
}

export default App;
