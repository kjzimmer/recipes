import { UserForm } from "./UserForm"
import { useState } from "react"


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
            <UserForm user={user} updateInput={updateInput} />
        </>
    )
}