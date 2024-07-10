import { RecipeForm } from "../componentsV2/RecipeForm"
import {recipeServices } from '../services/recipe.services'

export function RecipeUpdate() {

    return(
        <>
            <h1>Update Recipe</h1>
            <RecipeForm service={recipeServices.update} />
        </>
    )
}