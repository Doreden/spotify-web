import { useState } from "react"
import { UserService } from "../services/user.service.js"
import spotifyPng from '../assets/imgs/spotify3D.png'
import { useNavigate } from "react-router"

export function SignupForm() {
    const [credentials, setCredentials] = useState(UserService.getEmptyCredentials())
    const navigate = useNavigate()

    async function signup(credentials) {
        try {
            await UserService.signup(credentials)
            navigate('/')
        } catch (err) {
            console.log('Oops try again')
        }
    }


    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        signup(credentials)
    }

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-container">
                <img src={spotifyPng} alt="My Image" />
                <h1 className="signup-title">Sign Up to Spotify</h1>
                <label className="input-label">Enter your full name
                    <input
                        type="text"
                        name="fullname"
                        value={credentials.fullname}
                        placeholder="Fullname"
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                </label>
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
                <button className="signup-btn">{'Sign Up'}</button>
            </div>
        </form>
    )
}
