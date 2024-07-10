import { Route, Routes } from "react-router-dom"
import { UserLogin } from "../views/UserLogin"
import { UserCreate } from "../views/UserCreate"
import { UserForm } from "../componentsV2/UserForm"
import { userServices } from "../services/services"


export const UnprotectedRoutes = () => {
    return (<>
        <Routes>
            <Route path='/login' element={<UserLogin/>}/>
            <Route path='/register' element={<UserForm submitHandler={userServices.register}/>}/>
            <Route path='/*' element={<UserLogin />}/>
        </Routes>
    </>)
}