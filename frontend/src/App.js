import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Forecast from './pages/Forecast';

import CityCard from './components/CityCard';
import ForecastCard from './components/ForecastCard';

// Example app code, kept for reference.

// import logo from './logo.svg';
// import './App.css';
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forecast" element={<Forecast cityName="Orlando" currentTemp={77}/>} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

function Test() {
  return <div style={{maxWidth: "300px"}}>
    <CityCard cityName="Orlando" highTemp={80} lowTemp={60} currentTemp={77} />
    <br></br>
    <ForecastCard hourTimes={['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm','3pm','4pm','5pm','6pm','7pm']} hourWeather={['—','—','—','—','—','—','—','—','—','—','—','—']} hourTemps={['77', '77', '77', '77', '77', '77', '77', '77','77', '77','77', '77']}/>
  </div>;
}

export default App;
