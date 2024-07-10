import { UserForm } from "../componentsV2/UserForm"
import { useState } from "react"
import { Link } from "react-router-dom"
import { userServices } from "../services/user.services"


export function UserCreate() {

    const [user, setUser] = useState({
        firstName : '',
        lastName : '',
        email : '',
        password: ''
    })

    const updateInput = e => {
        const {name, value} = e.target 
        setUser(prev => ({...prev, [name]: value}))
    }

    return(
        <>
            <h1>Create an Account</h1>
            <UserForm submitHandler={userServices.register}/>
            <Link to={'/'}>Back to Login</Link>
        </>
    )
}