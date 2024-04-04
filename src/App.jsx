// Libraries
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";
// Pages
import { StationIndex } from "./cmps/station/StationIndex.jsx";
import { StationDetails } from "./cmps/station/StationDetails.jsx";
import { Search } from "./pages/Search.jsx";

// // Components
import { Sidebar } from "./cmps/Sidebar.jsx";
import { Playline } from "./cmps/Playline.jsx";

// // Store
import { store } from "./store/store.js";

// Services
// import { stationService } from "../services/station.service.js";

import "./assets/css/style.css";

function App() {
  // stationService.createStations();

  return (
    <>
      <Provider store={store}>
        <Router>
          <section className="main-app">
            <Sidebar />
            <Routes>
              <Route path="/" element={<StationIndex />} />
              <Route path="/search" element={<Search />} />
              <Route path="/station/:id" element={<StationDetails />} />
            </Routes>
            <Playline />
          </section>
        </Router>
      </Provider>
    </>
  );
}

export default App;
