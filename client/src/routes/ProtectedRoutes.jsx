import { Routes, Route } from "react-router-dom"
import { Navigate, Outlet } from 'react-router-dom'

import { Header } from "../componentsV2/Header"
import { Recipes } from "../views/Recipes"
import { ProtectedAdminRoutes } from "./ProtectedAdminRoutes"
import { RecipesCreate } from "../views/RecipesCreate"
import { RecipeUpdate } from "../views/RecipeUpdate" 
import { Recipe } from '../views/Recipe'
const PrivateRoutes = () => {
    const token = localStorage.getItem('userToken')

    return (
    token ? <Outlet/> : <Navigate to='/'/>
  )
}

export const ProtectedRoutes = () => {
    return (<>
    <Header/>
    <Routes>
        <Route element={<PrivateRoutes/>}>
            {/* these are routes that subscribers can use */}
            <Route path='/' element={<Recipes/>}/>
            <Route path='/create' element={<RecipesCreate/>}/>
            <Route path='/create/:id' element={<RecipesCreate/>} />
            <Route path='/update/:id' element={<RecipeUpdate/>}/>
            <Route path='/:id' element={<Recipe />} />

            {/* need to add routes that only administrators can use */}
            <Route path='/admin/*' element={<ProtectedAdminRoutes/>}/>
        </Route>
    </Routes>
    </>)
}