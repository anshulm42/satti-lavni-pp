import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WaitingPage from "./components/WaitingPage";

import "./App.css";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home/>}
        />
        <Route path="/waiting/:roomCode" element={<WaitingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
