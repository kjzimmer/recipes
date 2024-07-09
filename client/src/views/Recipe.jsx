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
        <>
            <h1> {recipe.name} </h1>
            <Link to={`/recipes/update/${id}`}>Update Recipe</Link>
            <button onClick={() => deleteRecipe(recipe.id)}> Delete this Recipe</button>

        </>
    )
}