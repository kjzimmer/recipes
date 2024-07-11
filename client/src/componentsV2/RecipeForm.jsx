import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { recipeServices } from '../services/recipe.services';
import { ingredientsServices } from '../services/ingredients.services'
import { prepStepServices } from '../services/prepSteps.services'

export function RecipeForm({ service, page }) {
    const [errors, setErrors] = useState({
        name: 'Must be at least 3 characters',
        description: 'Must be at least 3 characters',
        servings: true,
        prepTime: true,
        cookTime: true,
        form: false
    })
    const [displayErrors, setDisplayErrors] = useState(false)

    const [recipe, setRecipe] = useState({
        name: '',
        description: '',
        servings: undefined,
        prepTime: undefined,
        cookTime: undefined,
        ingredients: [],
        prepSteps: [],
    })

    const { id } = useParams()
    const navigate = useNavigate()

    const inputHandler = e => {
        const { name, value } = e.target
        setRecipe(prev => ({ ...prev, [name]: value }))

        setErrors(prev => {

            let errors = { ...prev }

            const validation = {
                name: () => {
                    value.length < 3 ? errors.name = 'Must be at least 3 characters' : errors.name = true
                },
                description: () => {
                    value.length < 3 ? errors.description = 'Must be at least 3 characters' : errors.description = true
                },
                servings: () => {
                    isNaN(value) || value < 1 ? errors.servings = 'Must be a number greater than 0' : errors.servings = true
                },
                prepTime: () => {
                    isNaN(value) || value < 1 ? errors.prepTime = 'Must be a number greater than 0' : errors.prepTime = true
                },
                cookTime: () => {
                    isNaN(value) || value < 1 ? errors.cookTime = 'Must be a number greater than 0' : errors.cookTime = true
                },
            }

            validation[name]()

            errors.form = true
            for (let key in errors) {
                if (errors[key] != true) {
                    errors.form = false;
                    break
                }
            }
            return errors
        })
    }



    const submitHandler = e => {
        e.preventDefault()
        setDisplayErrors(true)
        if (errors.form) {
            service(recipe)
                .then(res => {
                    {
                        page 
                        ? navigate(`/recipes/update/${res.id}`)
                        : navigate(`/recipes`)
                    }
                })
                .catch(error => {
                    setErrors(error)
                })
        }
    }

    useEffect(() => {
        if (id) {
            recipeServices.get(id)
                .then(res => {
                    setRecipe(res)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [])

    const submitIngredient = (e) => {
        e.preventDefault()

        const newIngredient = {
            description: e.target.ingredient.value,
            recipeId: id
        }
        e.target.ingredient.value = ''
        ingredientsServices.create(newIngredient)
            .then(res => {
                setRecipe(prev => ({ ...prev, ingredients: [...prev.ingredients, res] }))

            })
    }

    const deleteIngredient = (id) => {
        ingredientsServices.delete(id)
            .then(res => {
                setRecipe(prev => ({ ...prev, ingredients: prev.ingredients.filter(ingredient => ingredient.id != id) }))
            })
    }

    const submitPrepStep = (e) => {
        e.preventDefault()

        const newStep = {
            description: e.target.prepStep.value,
            recipeId: id
        }
        e.target.prepStep.value = ''

        prepStepServices.create(newStep)
            .then(res => {
                setRecipe(prev => ({ ...prev, prepSteps: [...prev.prepSteps, res] }))
            })
    }

    const deletePrepStep = (id) => {
        prepStepServices.delete(id)
            .then(res => {
                setRecipe(prev => ({ ...prev, prepSteps: prev.prepSteps.filter(step => step.id != id) }))
            })
    }

    return (
        <>
            <Form id='recipeForm_Id' onSubmit={submitHandler}>
                <Row className='form'>
                    <Form.Group as={Col}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Recipe Name'
                            name='name'
                            value={recipe.name}
                            onInput={inputHandler}
                        />
                    </Form.Group>
                        <p className='text-danger'>{displayErrors && errors.name}</p>

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
                        <p className='text-danger'>{displayErrors && errors.description}</p>
                </Row>
                {
                    id
                        ? <div>
                            <Form.Group>
                                <Form.Label>Servings</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Number of Servings'
                                    name='servings'
                                    value={recipe.servings}
                                    onInput={inputHandler}
                                />
                            </Form.Group>
                                <p className='text-danger'>{displayErrors && errors.servings}</p>
                            <Row className='form'>
                                <Form.Group as={Col}>
                                    <Form.Label>Prep Time</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Prep Time (minutes)'
                                        name='prepTime'
                                        value={recipe.prepTime}
                                        onInput={inputHandler}
                                    />
                                    <p className='text-danger'>{displayErrors && errors.prepTime}</p>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Cook Time</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Cook Time (minutes)'
                                        name='cookTime'
                                        value={recipe.cookTime}
                                        onInput={inputHandler}
                                    />
                                    <p className='text-danger'>{displayErrors && errors.cookTime}</p>
                                </Form.Group>
                            </Row>
                        </div>
                        : null
                }
            </Form>
            {
                id
                    ? <div>
                        <Form onSubmit={submitIngredient}>
                            <Form.Group>
                                <Form.Label>Ingredients</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='ingredient'
                                />
                            </Form.Group>
                            <Button variant='primary' type='submit' className='form'>
                                Add Ingredient
                            </Button>
                        </Form>
                        {
                            recipe.ingredients.map((ingredient, index) => (
                                <p key={index} onClick={() => deleteIngredient(ingredient.id)}> {index + 1}: {ingredient.description} </p>
                            ))
                        }
                    </div>
                    : null
            }
            {
                id
                    ? <div>
                        <Form onSubmit={submitPrepStep}>
                            <Form.Group>
                                <Form.Label>Steps</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='prepStep'
                                />
                            </Form.Group>
                            <Button variant='primary' type='submit' className='form'>
                                Add Step
                            </Button>
                        </Form>
                        {
                            recipe.prepSteps.map((step, index) => (
                                <p key={index} onClick={() => deletePrepStep(step.id)}> Step {index + 1}: {step.description} </p>
                            ))
                        }
                    </div>
                    : null
            }
            <Button variant='primary' form='recipeForm_Id' type='submit' className='form'>
                Submit
            </Button>
        </>
    )
}