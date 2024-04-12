// Libraries
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";
// Pages
import { StationIndex } from "./pages/StationIndex.jsx";
import { StationDetails } from "./pages/StationDetails.jsx";
import { Search } from "./pages/Search.jsx";

// Components
import { Sidebar } from "./cmps/sidebar/Sidebar.jsx";
import { Playline } from "./cmps/playline/Playline.jsx";
import { OptionsModal } from "./cmps/OptionsModal.jsx";

// Store
import { store } from "./store/store.js";

// Services
import { stationService } from "./services/station.service.js";
import { useEffect } from "react";
import "./assets/css/style.css";
import { NavHeader } from "./cmps/header/NavHeader.jsx";
import { loadStations } from "./store/actions/station.action";


function App() {
  stationService.createStations();

  useEffect(() => {
    loadStations();
  }, []);

  return (
    <>
      <Provider store={store}>
        <Router>
          <section className="main-app">
            <Sidebar />
            {/* TODO Figure out how to layout NavHeader */}
            {/* <NavHeader/> */}
            <Routes>
              <Route path="/" element={<StationIndex />} />
              <Route path="/search" element={<Search />} />
              <Route path="/station/:stationId" element={<StationDetails />} />
            </Routes>
            <Playline />
          </section>
        </Router>
      </Provider>
    </>
  );
}

export default App;
