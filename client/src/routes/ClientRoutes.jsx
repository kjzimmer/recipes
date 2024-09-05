import { Routes, Route } from "react-router-dom"
import { Navigate, Outlet } from 'react-router-dom'
import { ClientHeader } from "../components/ClientHeader"
import { Recipes } from "../views/Recipes"
import { Recipe } from '../views/Recipe'

const PrivateRoutes = () => {
    const token = localStorage.getItem('userToken')

    return (
    token ? <Outlet/> : <Navigate to='/login'/>
  )
}

export const ClientRoutes = () => {
    return (<>
    <ClientHeader/>
    <Routes>
        <Route element={<PrivateRoutes/>}>
            {/* these are routes that all authenticated users have access to */}
            <Route path='/recipes' element={<Recipes/>}/>
            <Route path='/recipes/:id' element={<Recipe />} />
            <Route path='/*' element={<Recipes/>}/>
        </Route>
    </Routes>
    </>)
}