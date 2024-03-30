// Libaries
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

// Pages
import { Homepage } from './pages/Homepage.jsx'
import { Station } from './pages/Station.jsx'
import { Search } from './pages/Search.jsx'
import { Artist } from './pages/Artist.jsx'
import { Genre } from './pages/Genre.jsx'

// Components
import { Sidebar } from './cmps/Sidebar.jsx'


import './assets/css/style.css'

function App() {


  return (
    <>
      <Router>
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/artist/:id" element={<Artist/>} />
          <Route path="/playlist/:id" element={<Station/>} />
          <Route path="/genre/:id" element={<Genre/>} />
        </Routes>
      </Router>

    </>
  )
}

export default App
