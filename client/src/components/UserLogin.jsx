import {useNavigate} from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import {allServices} from '../services/services';
import { useState } from 'react';

export function UserLogin() {
    const [errors, setErrors] = useState()

    function handleSubmit(e){
        e.preventDefault()

        allServices.login({email:e.target.email.value, password:e.target.password.value})
        // NOTE: redirect after sucessful login is currently done in allServices.  should this be done here instead?
        // .then(data => {
        //     navigate('/recipes')
        // })
        .catch(error => {
            console.log(error.response.data.message)
            setErrors(error.response.data.message)
    })
    }

    return(
        <>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='form'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' name='email' placeholder='Email' /> 
                </Form.Group>
                <Form.Group className='form'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' name='password' placeholder='Password' />
                </Form.Group>
                <p>{errors}</p>
                <Button type='submit' className='form'>
                    Submit
                </Button>
            </Form>
        </>
    )
}