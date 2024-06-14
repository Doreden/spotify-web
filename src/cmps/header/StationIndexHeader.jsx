import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { logout } from "../../store/actions/user.action"
import { useNavigate } from "react-router-dom"

export function StationIndexHeader() {

  const loggedInUser = useSelector((storeState) => storeState.userModule.user)

  const navigate = useNavigate()

  async function onLogout() {
    await logout()
    navigate('/')
  }

  return (
    <div className="station-index-header">
      {!loggedInUser ?
        <div className="login-signup-buttons">
          <Link to={`/signup`}><button className="sign-up-btn">Sign Up</button></Link>
          <Link to={`/login`}><button className="login-logout-btn">Login</button></Link>
        </div>
        :
        <div className="user-greeting">
          <div>{`Hello ${loggedInUser.fullname}`}</div>
          <button className="login-logout-btn" onClick={onLogout}>Logout</button>
        </div>
      }
    </div>
  )
}
