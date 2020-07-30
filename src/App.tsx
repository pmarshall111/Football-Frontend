import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from "./intro/landing-page/LandingPage";
import RisingBetslips from "./intro/landing-page/RisingBetslips";
import PerformancePage from "./intro/performance-page/PerformancePage";

function App() {
  return (
    <div className="App">
      <PerformancePage />
    </div>
  );
}

export default App;
