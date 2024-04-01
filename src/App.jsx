// Libaries
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

// Pages
import { Homepage } from './pages/Homepage.jsx'
import { StationDetails } from './pages/StationDetails.jsx'
import { Search } from './pages/Search.jsx'
import { Artist } from './pages/Artist.jsx'
import { Genre } from './pages/Genre.jsx'

// Components
import { Sidebar } from './cmps/Sidebar.jsx'
import { Playline } from './cmps/Playline.jsx'


import './assets/css/style.css'

function App() {


  return (
    <>
      <Router>
        <div className='main-app'>
          <Sidebar/>
          <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/search" element={<Search/>} />
            <Route path="/playlist/:id" element={<StationDetails/>} />
            
            {/* <Route path="/artist/:id" element={<Artist/>} /> */}
            {/* <Route path="/genre/:id" element={<Genre/>} /> */}
          </Routes>
          <Playline/>
        </div>
      </Router>

    </>
  )
}

export default App
