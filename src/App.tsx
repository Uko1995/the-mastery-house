import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { EnrollForm } from "./pages/EnrollForm";
import { WaitingList } from "./pages/WaitingList";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/enroll-form" element={<EnrollForm />} />
        <Route path="/waiting-list" element={<WaitingList />} />
      </Routes>
    </Router>
  );
}

export default App;
