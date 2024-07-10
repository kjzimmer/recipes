import { RecipeForm } from "../components/RecipeForm"
import { recipeServices } from "../services/recipe.services"

export function RecipesCreate() {

    return(
        <>
            <h1>Create Recipe</h1>
            <RecipeForm service={recipeServices.create} />
        </>
    )
}