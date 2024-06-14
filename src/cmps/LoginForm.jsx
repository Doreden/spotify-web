import { useState } from "react"
import { UserService } from "../services/user.service.js"
import spotifyPng from '../assets/imgs/spotify3D.png'

export function LoginForm({ onLogin, isSignup }) {

    const [credentials, setCredentials] = useState(UserService.getEmptyCredentials())

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        onLogin(credentials)
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-container">
                <img src={spotifyPng} alt="My Image" />
                <h1 className="login-title">Log in to Spotify</h1>
                <label className="input-label">Enter your username
                    <input
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
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                </label>
                {isSignup && <input
                    type="text"
                    name="fullname"
                    value={credentials.fullname}
                    placeholder="Full name"
                    onChange={handleChange}
                    required
                />}
                <button className="login-btn">{isSignup ? 'Signup' : 'Log In'}</button>
            </div>
        </form>
    )
}