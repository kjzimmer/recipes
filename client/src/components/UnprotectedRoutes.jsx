import { Route, Routes } from "react-router-dom"

import { UserLogin } from "./UserLogin"
import { UserCreate } from "./UserCreate"


export const UnprotectedRoutes = () => {
    return (<>
        <Routes>
            <Route path='/' element={<UserLogin/>}/>
            <Route path='/register' element={<UserCreate/>}/>
            <Route path='/*' element={<UserLogin/>}/>
        </Routes>
    </>)
}