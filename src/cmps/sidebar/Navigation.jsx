import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";

import homeIcon from "../../assets/imgs/home1.svg";
import Search from "../../assets/imgs/search.svg";

export function Navigation() {
  return (
    <>
      <div className="navigation">
        <ul>
          <li>
            <Link to="/">
              <div className="nav-button">
                <div className="nav-button-svg">
                  <ReactSVG src={homeIcon} />
                </div>
                <span className="nav-button-text">Home</span>
              </div>
            </Link>
          </li>

          <li>
            <Link to="/search">
              <div className="nav-button">
                <div className="nav-button-svg">
                  <ReactSVG src={Search} />
                </div>
                <span className="nav-button-text">Search</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
