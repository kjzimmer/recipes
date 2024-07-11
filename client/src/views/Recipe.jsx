import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { recipeServices } from "../services/recipe.services"
import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/esm/Row"


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
            <div className="recipeHeading">
                <h1> {recipe.name} </h1>
                <h2> {recipe.description} </h2>
            </div>
            <Row className="recipeTopRow">
                {
                    recipe.servings
                    ? <Col><p> Servings: { recipe.servings } </p></Col>
                    : null
                }
                {
                    recipe.prepTime
                    ? <Col><p> Prep Time: { recipe.prepTime } minute(s) </p></Col>
                    : null
                }
                {
                    recipe.cookTime
                    ? <Col><p> Cook Time: { recipe.cookTime } minute(s) </p></Col>
                    : null
                }
            </Row>
            <Row>
                {
                    recipe.ingredients
                    ? <Col>
                        <p className="recipeHeading">Ingredients:</p>
                        {
                            recipe.ingredients.map((ingredient, index) => (
                                <p key={index}> Item {index + 1}: {ingredient.description} </p>
                            ))
                        }
                    </Col>
                    : null
                }
                {
                    recipe.prepSteps
                    ? <Col>
                        <p className="recipeHeading">Prep Steps:</p>
                        {
                            recipe.prepSteps.map((step, index) => (
                                <p key={index}> Step {index + 1}: {step.description} </p>
                            ))
                        }
                    </Col>
                    : null
                }
            </Row>
            <button className="recipeButton"><Link to={`/recipes/update/${id}`}>Update Recipe</Link></button>
            <button className="recipeButton" onClick={() => deleteRecipe(recipe.id)}> Delete this Recipe</button>
        </div>
    )
}