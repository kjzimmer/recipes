import { Route, Routes } from "react-router-dom"

import { UserLogin } from "./UserLogin"
import { UserCreate } from "./UserCreate"
import { UserForm } from "./karlsComponents/UserForm"


export const UnprotectedRoutes = () => {
    return (<>
        <Routes>
            <Route path='/' element={<UserLogin/>}/>
            <Route path='/register' element={<UserForm/>}/>
            <Route path='/*' element={<UserLogin/>}/>
        </Routes>
    </>)
}