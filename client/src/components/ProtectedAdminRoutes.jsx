import { Routes, Route } from "react-router-dom"
import { Navigate, Outlet } from 'react-router-dom'

import { Header } from "./Header"
import { ExampleRecipe } from "./ExampleRecipe"
import { RecipeForm } from "./RecipeForm"
import { AddRecipe } from "./AddRecipe"
import { Recipes } from "./Recipes"
import { BlankAdminPage } from "./BlankAdminPage"

const PrivateRoutes = () => {
console.log('checking authorization: ', `we don't get here without authentication`)
    return (
        // TODO: need to add check if use has admin authorization
        true ? <Outlet/> : <Navigate to='/recipes'/>   // user has admin authorization
        // false ? <Outlet/> : <Navigate to='/recipes'/>   // user does not have admin authorization
  )
}

export const ProtectedAdminRoutes = () => {
    return (<>
    <Routes>
        <Route element={<PrivateRoutes/>}>
            {/* these are routes that administrators can use */}
            {/* TODO: need to add real admin routes */}
            <Route path='/' element={<BlankAdminPage/>}/>
        </Route>
    </Routes>
    </>)
}