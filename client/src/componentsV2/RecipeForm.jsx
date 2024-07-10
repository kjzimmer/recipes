import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { recipeServices } from '../services/recipe.services';

export function RecipeForm( {service} ) {
    const [errors, setErrors] = useState()

    const [ recipe, setRecipe ] = useState({
        name: '',
        description: '',
        servings: '',
        prepTime: '',
        cookTime: '',
    })

    const { id } = useParams()
    const navigate = useNavigate()

    const inputHandler = e => {
        const { name, value } = e.target 
        setRecipe(prev => ({...prev, [name]: value}))
    }

    const submitHandler = e => {
        e.preventDefault() 
        service(recipe)
        .then(res => {
            navigate(`/recipes/${res.data.id}`)
        })
        .catch(error => {
            setErrors(error)
            console.log(error)
        })
    }

    useEffect( () => {
        if( id ){
            recipeServices.get(id)
            .then(res => {
                console.log(res)
                setRecipe(res)
            })
            .catch(error => {
                console.log(error)
            })
        }
    },[])



    return(
        <>
            <Form onSubmit={submitHandler}>
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
                    </Form.Group>
                </Row>
                    
                    </div> 
                    : null
                }
                <Button variant='primary' type='submit' className='form'>
                    Submit
                </Button>
            </Form>
        </>
    )
}