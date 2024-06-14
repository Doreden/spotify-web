
import { useNavigate } from 'react-router'
import { LoginForm } from '../cmps/LoginForm'
import { login } from '../store/actions/user.action'

export function LoginPage() {
    const navigate = useNavigate()

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            if (user) {
                return navigate('/')
            }
        } catch (err) {
            showErrorMsg('Oops try again')
        }
    }

    return (
        <div className='login-page'>
            <LoginForm onLogin={onLogin} />
        </div>
    )
}
