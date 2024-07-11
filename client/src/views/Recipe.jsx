import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { recipeServices } from "../services/recipe.services"


export function Recipe() {
    const [recipe, setRecipe] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect( () => {
        recipeServices.get(id)
        .then(res => {
            setRecipe(res)
        })
        .catch(error => {
            console.log(error)
        })
    },[])

    const deleteRecipe = (idToDelete) => {
        recipeServices.delete(idToDelete)
        .then(res => {
           navigate('/recipes')
        })
        .catch(error => {
            console.log(error)
        })
    }

    return(
        <div className="recipePage">
            <h1> {recipe.name} </h1>
            <h2> {recipe.description} </h2>
            {
                recipe.servings
                ? <p> Servings: { recipe.servings } </p>
                : null
            }
            {
                recipe.prepTime
                ? <p> Prep Time: { recipe.prepTime } </p>
                : null
            }
            {
                recipe.cookTime
                ? <p> Cook Time: { recipe.cookTime } </p>
                : null
            }
            {
                recipe.ingredients
                ? <div>
                    <p>Ingredients:</p>
                    {
                        recipe.ingredients.map((ingredient, index) => (
                            <p key={index}> {index + 1}: {ingredient.description} </p>
                        ))
                    }
                </div>
                : null
            }
            {
                recipe.prepSteps
                ? <div>
                    <p>Prep Steps:</p>
                    {
                        recipe.prepSteps.map((step, index) => (
                            <p key={index}> {index + 1}: {step.description} </p>
                        ))
                    }
                </div>
                : null
            }
            
            <Link to={`/recipes/update/${id}`}>Update Recipe</Link>
            <button onClick={() => deleteRecipe(recipe.id)}> Delete this Recipe</button>
        </div>
    )
}