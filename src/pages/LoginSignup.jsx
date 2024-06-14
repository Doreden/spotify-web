
import { useNavigate } from 'react-router'
import { LoginForm } from '../cmps/LoginForm'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { UserService } from '../services/user.service'

export function LoginSignup() {
    const navigate = useNavigate()

    const [isSignUp, setIsSignUp] = useState(false)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })


    async function login(credentials) {
        try {
            const user = await UserService.login(credentials)
            if (user) {
                showSuccessMsg('Logged in successfully')
                return navigate('/')
            }
        } catch (err) {
            showErrorMsg('Oops try again')
        }
    }




    return (
        <div className='login-page'>
            <LoginForm onLogin={login} />
        </div>
    )
}
