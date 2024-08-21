import { Link } from 'react-router-dom'

export function LoginAndReg() {
    return(
        <div className='loginAndRegPage'>
            <div className='loginAndRegLink'>
                <Link to={'/createUser'}>
                    <h1>Create an Account</h1>
                </Link>
            </div>

            <div className='loginAndRegLink'>
                <Link to={'/login'}>
                    <h1>Login</h1>
                </Link>
            </div>
        </div>
    )
}