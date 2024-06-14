import { Link } from "react-router-dom";

export function StationIndexHeader() {
  return (
    <div className="station-index-header">
        <button className="sign-up-btn">Sign Up</button>
        {/* <button className="login-btn"><Link to={`/login`}>Login</Link></button> */}
        <Link to={`/login`}><button className="login-btn">Login</button></Link>
      </div>
  )
}
