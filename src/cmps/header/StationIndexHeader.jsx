import { Link } from "react-router-dom";

export function StationIndexHeader() {
  return (
    <div className="station-index-header">
        <Link to = {`/signup`}><button className="sign-up-btn">Sign Up</button></Link>
        <Link to={`/login`}><button className="login-btn">Login</button></Link>
      </div>
  )
}
