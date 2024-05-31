// Libraries
import { Route, HashRouter as Router, Routes } from "react-router-dom"
import { Provider, useSelector } from "react-redux"
// Pages
import { StationIndex } from "./pages/StationIndex.jsx"
import { StationDetails } from "./pages/StationDetails.jsx"
import { SearchPage } from "./pages/SearchPage.jsx"

// Components
import { Sidebar } from "./cmps/sidebar/Sidebar.jsx"
import { Playline } from "./cmps/playline/Playline.jsx"
import { OptionsModal } from "./cmps/OptionsModal.jsx"

// Store
import { store } from "./store/store.js"

// Services
import { stationService } from "./services/station.service.js"
import { useEffect } from "react"
import "./assets/scss/style.scss"
import { loadUserMiniStations, login } from "./store/actions/user.action"


function App() {

  // Create Mock Data - Remove Later
  // stationService.createStations()

  // const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  // console.log(loggedInUser)

  // Load user in store 
  useEffect(() => {
    console.log("tryy")
    login()
  }, [])

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
