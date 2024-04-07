import { Link } from "react-router-dom";
import homeIcon from "../../assets/imgs/home1.svg";
import { ReactSVG } from "react-svg";
export function Navigation() {
  return (
    <>
      <div className="navigation">
        <ul>
          <li className="nav-button">
            <a href="/">
              <ReactSVG className="icon" src={homeIcon} /> 
              <span>Home</span>
            </a>
          </li>
          <li className="nav-button">
            <Link to="/search">Search</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
