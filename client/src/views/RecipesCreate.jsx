import { recipeServices } from "../services/recipe.services"
import { RecipeForm } from "../components/RecipeForm"

export function RecipesCreate() {

    const createPage = true

    return(
        <>
            <h1>Create Recipe</h1>
            <RecipeForm service={recipeServices.create} page={createPage} />
        </>
    )
}