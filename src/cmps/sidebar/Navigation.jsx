import { Link } from "react-router-dom"
import { ReactSVG } from "react-svg"

import homeEmpty from "../../assets/imgs/home1.svg"
import homeFilled from "../../assets/imgs/home2.svg"

import searchEmpty from "../../assets/imgs/search1.svg"
import searchFilled from "../../assets/imgs/search2.svg"

export function Navigation({ currentLocation }) {

  return (
    <div className="navigation">
      <ul>
        <li>
          <Link to="/" >
            <div className={`nav-button ${currentLocation === "/" ? 'active' : ''}`}>
              <div className="nav-button-svg">
                <ReactSVG src={currentLocation === "/" ? homeFilled : homeEmpty} />
              </div>
              <span className="nav-button-text">Home</span>
            </div>
          </Link>
        </li>

        <li>
          <Link to="/search" >
            <div className={`nav-button ${currentLocation === "/search" ? 'active' : ''}`}>
              <div className="nav-button-svg">
                <ReactSVG src={currentLocation === "/search" ? searchFilled : searchEmpty} />
              </div>
              <span className="nav-button-text">Search</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  )
}
