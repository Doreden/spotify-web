// Libaries
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

// Pages
import { Homepage } from './pages/Homepage.jsx'

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
        </Routes>


      </Router>

    </>
  )
}

export default App
