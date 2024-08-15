import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { recipeServices } from "../services/recipe.services"
import { Col, Row, Image } from "react-bootstrap/esm"


export function Recipe() {
    const [recipe, setRecipe] = useState({image:'blank.jpg'})   // initalizing image to a real file eliminates server api error, calling for undefined image
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
                <p> {recipe.description} </p>
                <Image src={`http://${window.location.hostname}:8000/api/recipes/image/${recipe.image}`} style={{width:300}} />
            </div>
            <Row className="recipeTopRow">
                {
                    recipe.servings
                    ? <Col><p> Servings: { recipe.servings } </p></Col>
                    : <Col><p> Servings: Not provided </p></Col>
                }
                {
                    recipe.prepTime
                    ? <Col><p> Prep Time: { recipe.prepTime } minute(s) </p></Col>
                    : <Col><p> Prep Time: Not provided </p></Col>
                }
                {
                    recipe.cookTime
                    ? <Col><p> Cook Time: { recipe.cookTime } minute(s) </p></Col>
                    : <Col><p> Cook Time: Not provided </p></Col>
                }
            </Row>
            <Row>
                {
                    recipe.ingredients
                    ? <Col className="recipeHeading">
                        <p className="recipeI">Ingredients:</p>
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
                    ? <Col  className="recipeHeading">
                        <p className="recipeI">Prep Steps:</p>
                        {
                            recipe.prepSteps.map((step, index) => (
                                <p key={index}> Step {index + 1}: {step.description} </p>
                            ))
                        }
                    </Col>
                    : null
                }
            </Row>
            <button className="recipeButton"><Link className="recipeButton" to={`/recipes/update/${id}`}>Update Recipe</Link></button>
            <button className="recipeButton" onClick={() => deleteRecipe(recipe.id)}> Delete this Recipe</button>
        </div>
    )
}