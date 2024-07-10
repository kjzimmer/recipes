import { recipeServices } from "../services/recipe.services"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { RecipeForm } from "../componentsV2/RecipeForm"

export function RecipesCreate() {
    const [errors, setErrors] = useState()

    const [ recipe, setRecipe ] = useState({
        name: '',
        description: '',
    })

    const inputHandler = e => {
        const { name, value } = e.target 
        setRecipe(prev => ({...prev, [name]: value}))
    }

    const submitHandler = e => {
        e.preventDefault() 
        recipeServices.create(recipe)
        .then(res => {

            navigate(`/recipes/${res.data.id}`)
        })
        .catch(error => {
            setErrors(error)
            console.log(error)
        })
    }

    return(
        <>
            <h1>Create Recipe</h1>
            {/* <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Recipe Name'
                        name='name'
                        value={recipe.name}
                        onInput={inputHandler}
                    />
                </Form.Group>

                <Form.Group className='form'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as='textarea' 
                        rows={4} placeholder='Notes (Step by Step)' 
                        name='description'
                        value={recipe.description}
                        onInput={inputHandler}
                    />
                </Form.Group>
                <Button variant='primary' type='submit' className='form'>
                    Submit
                </Button>
            </Form> */}
            <RecipeForm service={recipeServices.update} />
        </>
    )
}