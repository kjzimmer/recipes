import { Routes, Route } from "react-router-dom"
import { Navigate, Outlet } from 'react-router-dom'
import { Recipes } from "../views/Recipes"
import { Recipe } from '../views/Recipe'
import { ProviderHeader } from "../components/ProviderHeader"
import { Clients } from "../components/Clients"
import { RecipeForm } from "../components/RecipeForm"
import { recipeServices } from "../services/recipe.services"

const PrivateRoutes = () => {
    const token = localStorage.getItem('userToken')
    // add code here to check authorization

    return (
    token ? <Outlet/> : <Navigate to='/login'/>
  )
}

export const ProviderRoutes = () => {
    return (<>
    <ProviderHeader/>
    <Routes>
        <Route element={<PrivateRoutes/>}>
            {/* these are routes that providers can use */}
            <Route path='/recipes' element={<Recipes/>}/>
            <Route path='/recipes/:id' element={<Recipe />} />
            <Route path='/recipes/create' element={<RecipeForm service={recipeServices.create}/>} />
            <Route path='/clients' element={<Clients/>}/>
            <Route path='/*' element={<Recipes/>}/>
        </Route>
    </Routes>
    </>)
}