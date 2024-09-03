import { useState } from "react"
import { UserService } from "../services/user.service.js"
import RythmixIcon from '../assets/imgs/RythmixIcon.png'

export function LoginForm({ onLogin, isErrorMsg }) {

    const [credentials, setCredentials] = useState(UserService.getEmptyCredentials())

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        const { username, password } = credentials
        onLogin({ username, password })
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-container">
                <img src={RythmixIcon} alt="My Image" />
                <h1 className="login-title">Log in to Rythmix</h1>
                <label className='input-label'>Enter your username
                    <input
                        className={`${isErrorMsg ? 'wrong-input' : ""}`}
                        type="text"
                        name="username"
                        value={credentials.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                </label>
                <label className="input-label">Password
                    <input
                        className={`${isErrorMsg ? 'wrong-input' : ""}`}
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                </label>
                {isErrorMsg &&
                    <div className="wrong-credentials-msg">Wrong Credentials</div>
                }
                <button className="login-btn">{'Log In'}</button>
            </div>
        </form>
    )
}

