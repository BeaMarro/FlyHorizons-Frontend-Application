import HomePage from './pages/HomePage';
import SearchFlightsPage from './pages/SearchFlightsPage'
import FlightResultsPage from './pages/FlightResultsPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import ClassTypePage from './pages/ClassTypePage';
import LuggagePage from './pages/LuggagePage';
import SeatingPage from './pages/SeatingPage';
import PassengerPage from './pages/PassengerPage';
import ConfirmationPage from './pages/ConfirmationPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CustomNavbar from './components/navigation/NavBar';
import PaymentPage from './pages/PaymentPage';

function App() {
  return (
    <Router>
      <div className="App">
        <CustomNavbar/>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/search-flights" element={<SearchFlightsPage />} />
              <Route path="/flights" element={<FlightResultsPage />} />
              <Route path="/class" element={<ClassTypePage />} />
              <Route path="/luggage" element={<LuggagePage/> } />
              <Route path="/seating" element={<SeatingPage/> } />
              <Route path="/passengers" element={<PassengerPage/> } />
              <Route path="/payment" element={<PaymentPage/> } />
              <Route path="/confirmation" element={<ConfirmationPage/>} />
            </Routes>
      </div>
    </Router>
  );
}

export default App 