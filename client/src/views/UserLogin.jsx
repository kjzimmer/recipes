import {Link, useNavigate} from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import {userServices} from '../services/user.services';
import { useState } from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

export function UserLogin() {
    const [errors, setErrors] = useState()
    const [viewPassword, setViewPassword] = useState(false)

    function handleSubmit(e){
        e.preventDefault()

        userServices.login({email:e.target.email.value, password:e.target.password.value})
        // NOTE: redirect after sucessful login is currently done in allServices.  should this be done here instead?
        // .then(data => {
        //     navigate('/recipes')
        // })
        .catch(error => {
            console.log(error.response.data.message)
            setErrors(error.response.data.message)
    })
    }
    
    const switchPassword = () => {
        setViewPassword(!viewPassword)
    }

    return(
        <>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='form'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' name='email' placeholder='Email' /> 
                </Form.Group>
                <Row>
                    <Form.Group as={Col} className='form'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type={ viewPassword == false ? 'password':'text'} name='password' placeholder='Password' />
                    </Form.Group>
                    <Form.Group className='form'>
                        <Form.Label>View Password</Form.Label>
                        <Form.Check
                            type='switch'
                            id='custom-switch'
                            onClick={switchPassword}
                        />
                    </Form.Group>
                </Row>
                { errors && <p className='text-danger'>{errors}</p> }
                <Button type='submit' className='form'>
                    Submit
                </Button>
            </Form>
            <Link to={'/register'}>Create an Account</Link>
        </>
    )
}