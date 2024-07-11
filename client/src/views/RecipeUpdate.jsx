import { RecipeForm } from "../components/RecipeForm"
import {recipeServices } from '../services/recipe.services'

export function RecipeUpdate() {

    const updatePage = false

    return(
        <>
            <h1>Recipe</h1>
            <RecipeForm service={recipeServices.update} page={updatePage} />
        </>
    )
}