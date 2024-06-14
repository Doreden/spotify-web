
import { useNavigate } from 'react-router'
import { LoginForm } from '../cmps/LoginForm'
import { login } from '../store/actions/user.action'
import { useState } from 'react'

export function LoginPage() {

    const [isErrorMsg, setIsErrorMsg] = useState(false)

    const navigate = useNavigate()

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            if (user) {
                return navigate('/')
            } else {
                setIsErrorMsg((prevState) => true)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='login-page'>
            <LoginForm onLogin={onLogin} isErrorMsg={isErrorMsg} />
        </div>
    )
}
