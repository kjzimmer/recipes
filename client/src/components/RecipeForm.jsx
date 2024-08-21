import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

import { Button, Col, Form, Row, Image } from 'react-bootstrap';

import { recipeServices } from '../services/recipe.services';
import { ingredientsServices } from '../services/ingredients.services'
import { prepStepServices } from '../services/prepSteps.services'


export function RecipeForm({ service, page }) {
    const [errors, setErrors] = useState({
        name: 'Must be at least 3 characters',
        description: 'Must be at least 3 characters',
        // servings: true,
        // prepTime: true,
        // cookTime: true,
        form: false
    })
    const [displayErrors, setDisplayErrors] = useState(false)

    const [recipe, setRecipe] = useState({
        name: '',
        description: ''
        // ,servings: '',
        // prepTime: '',
        // cookTime: '',
        , image: 'blank.jpg',
        // ingredients: [],
        // prepSteps: [],
    })

    const { id } = useParams()
    const navigate = useNavigate()

    const validation = {
        name: (value) => {
            if (value.length < 3) { return 'Must be at least 3 characters' } else { return true }
        },
        description: (value) => {
            if (value.length < 3) { return 'Must be at least 3 characters' } else { return true }
        },
        servings: (value) => {
            if (isNaN(value) || value < 1) { return 'Must be a number greater than 0' } else { return true }
        },
        prepTime: (value) => {
            if (isNaN(value) || value < 1) { return 'Must be a number greater than 0' } else { return true }
        },
        cookTime: (value) => {
            if (isNaN(value) || value < 0) { return 'Must be a positive number' } else { return true }
        },
    }

    const inputHandler = e => {
        const { name, value } = e.target
        setRecipe(prev => ({ ...prev, [name]: value }))
console.log('recipe: ', recipe)
console.log('errors: ', errors)
        setErrors(prev => {

            let errors = { ...prev }

            errors[name] = validation[name](value)

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
            console.log('submit recipe: ', recipe)
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

    // useEffect(() => {
    useLayoutEffect(() => {
            if (id) {
            recipeServices.get(id)
                .then(res => {
                    let errors = { form: true }
                    for (let key in res) {
                        if (key in validation) {
                            errors[key] = validation[key](res[key])
                            if (errors[key] != true) errors.form = false
                        }
                    }

                    setErrors(errors)
                    // validate all fields here using a for in loop with local let errors
                    // then setErrors
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

    const inputOnFocus = (e) => {
        e.target.startValue = e.target.value
    }

    const inputOnBlur = (e) => {
        if (recipe.id && e.target.startValue != e.target.value) {
            recipeServices.updateField({
                id: recipe.id,
                field: e.target.name,
                value: e.target.value
            })
        }
    }

    function onFileSelected(e) {
        var file = e.target.files[0];

        // var reader = new FileReader();

        
        // reader.onload = function (e) {
        //     img1.src = e.target.result;
        //     img1.title = selectedFile.name;
        // };

        // reader.readAsDataURL(selectedFile);

        const formData = new FormData()
        formData.append('img', file)
        formData.append('recipeId', recipe.id)
        formData.append('fileName', file.name)

        recipeServices.upload(formData)
            .then(res => img1.src = `http://${window.location.hostname}:8010/api/recipes/image/` + file.name)   // for recipes, save the file name in the recipe DB
            .catch(error => console.log(error))
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
                            onBlur={inputOnBlur}
                            onFocus={inputOnFocus}
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
                            onBlur={inputOnBlur}
                            onFocus={inputOnFocus}
                        />
                    </Form.Group>
                    <p className='text-danger'>{displayErrors && errors.description}</p>
                </Row>
                {
                    id ?
                         <div>
                            <Image src={`http://${window.location.hostname}:8010/api/recipes/image/${recipe.image}`} style={{ width: 300 }} id='img1' />
                            <Form.Control
                                type='file'
                                placeholder='file'
                                name='img'
                                onChange={onFileSelected}
                            />
                            <Form.Group>
                                <Form.Label>Servings</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Number of Servings'
                                    name='servings'
                                    value={recipe.servings}
                                    onInput={inputHandler}
                                    onBlur={inputOnBlur}
                                    onFocus={inputOnFocus}
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
                                        onBlur={inputOnBlur}
                                        onFocus={inputOnFocus}
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
                                        onBlur={inputOnBlur}
                                        onFocus={inputOnFocus}
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
                                <Button variant='primary' type='submit' className='formButton' title='Add Ingredient'>Add</Button>
                                <Form.Control
                                    type='text'
                                    name='ingredient'
                                />
                            </Form.Group>
                        </Form>
                        {
                            recipe.ingredients?.map((ingredient, index) => (
                                <p key={index} onClick={() => deleteIngredient(ingredient.id)}> {index + 1}: {ingredient.description} </p>
                            ))
                        }
                        <Form onSubmit={submitPrepStep}>
                            <Form.Group>
                                <Form.Label>Steps </Form.Label>
                                <Button variant='primary' type='submit' className='formButton' title='Add Preparation Step'>Add</Button>
                                <Form.Control
                                    type='text'
                                    name='prepStep'
                                />
                            </Form.Group>
                        </Form>
                        {
                            recipe.prepSteps?.map((step, index) => (
                                <p key={index} onClick={() => deletePrepStep(step.id)}> {index + 1}: {step.description} </p>
                            ))
                        }
                    </div>
                    : 
                    <Button variant='primary' form='recipeForm_Id' type='submit' className='form'>
                    Submit
                </Button>
    
            }
        </>
    )
}