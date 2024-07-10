import { recipeServices } from "../services/recipe.services"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { RecipeForm } from "../componentsV2/RecipeForm"

export function RecipesCreate() {
    return(
        <>
            <h1>Create Recipe</h1>
<<<<<<< HEAD
=======
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
>>>>>>> 5ecc690dd5afbc3a4eaa2ea8a662df66cfd951cf
            <RecipeForm service={recipeServices.create} />
        </>
    )
}