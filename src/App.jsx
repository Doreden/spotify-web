// Libraries
import { Route, HashRouter as Router, Routes, useLocation, useParams } from "react-router-dom"
import { Provider } from "react-redux"
// Pages
import { StationIndex } from "./pages/StationIndex.jsx"
import { StationDetails } from "./pages/StationDetails.jsx"
import { SearchPage } from "./pages/SearchPage.jsx"

// Components
import { Sidebar } from "./cmps/sidebar/Sidebar.jsx"
import { Playline } from "./cmps/playline/Playline.jsx"

// Store
import { store } from "./store/store.js"

// Services
import "./assets/scss/style.scss"
import { LikedSongs } from "./cmps/station/stationDetails/LikedSongs.jsx"
import { LoginPage } from "./pages/LoginPage.jsx"
import { SignupForm } from "./cmps/SignupForm.jsx"


function App() {

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
              <Route path="/search" element={<SearchPage />} />
              <Route path='/likedsongs' element={<LikedSongs />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignupForm />} />
              <Route path="/station/:stationId" element={<StationDetails />} />
            </Routes>
            <Playline />
          </section>
        </Router>
      </Provider>
    </>
  )
}

export default App
