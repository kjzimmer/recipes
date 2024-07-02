import { Routes, Route } from "react-router-dom"
import { Navigate, Outlet } from 'react-router-dom'

import { Header } from "./Header"
import { ExampleRecipe } from "./ExampleRecipe"
import { RecipeForm } from "./RecipeForm"
import { AddRecipe } from "./AddRecipe"
import { Recipes } from "./Recipes"

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
            <Route path='/' element={<Recipes/>}/>
            <Route path='/add' element={<AddRecipe/>}/>
        </Route>
    </Routes>
    </>)
}