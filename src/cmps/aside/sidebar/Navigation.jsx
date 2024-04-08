import { Link } from "react-router-dom";
import homeIcon from "../../../assets/imgs/home1.svg";
import { ReactSVG } from "react-svg";
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
          <li className="nav-button">
            <Link to="/search">Search</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
