import { Routes, Route } from "react-router-dom"
import { Navigate, Outlet } from 'react-router-dom'

import { Header } from "./Header"
import { ExampleRecipe } from "./ExampleRecipe"
import { RecipeForm } from "./RecipeForm"
import { AddRecipe } from "./AddRecipe"
import { Recipes } from "./Recipes"
import { ProtectedAdminRoutes } from "./ProtectedAdminRoutes"

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
            <Route path='/add' element={<AddRecipe/>}/>

            {/* need to add routes that only administrators can use */}
            <Route path='/admin/*' element={<ProtectedAdminRoutes/>}/>
        </Route>
    </Routes>
    </>)
}