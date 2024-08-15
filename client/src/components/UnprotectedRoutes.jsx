import { Route, Routes } from "react-router-dom"

import { UserLogin } from "./UserLogin"
import { UserCreate } from "./UserCreate"
import { UserForm } from "./karlsComponents/UserForm"
import { userServices } from "../services/services"


export const UnprotectedRoutes = () => {
    return (<>
        <Routes>
            <Route path='/' element={<UserLogin/>}/>
            <Route path='/register' element={<UserForm submitHandler={userServices.register}/>}/>
            <Route path='/*' element={<UserLogin/>}/>
        </Routes>
    </>)
}