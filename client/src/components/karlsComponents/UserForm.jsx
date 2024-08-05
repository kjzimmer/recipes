import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { userServices } from '../../services/services';
import { Link, useNavigate } from 'react-router-dom';


export function UserForm({ submitHandler }) {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [errors, setErrors] = useState({
        firstName: 'Must be at least 3 characters',
        lastName: 'Must be at least 3 characters',
        email: 'Must be a valid email',
        password: 'Pasword must contain at lease 8 characters, upper and lower case, a number and a special character',
        confirmPassword: 'Passwords must match',
        form: false
    })
    const [displayErrors, setDisplayErrors] = useState(false)
    const navigate = useNavigate()

    const updateInput = e => {
        const { name, value } = e.target

        setUser(prev => ({ ...prev, [name]: value }))

        setErrors(prev => {

            let errors = { ...prev }

            const validation = {
                firstName: () => {
                    value.length < 3 ? errors.firstName = 'Must be at least 3 characters' : errors.firstName = true
                },
                lastName: () => {
                    value.length < 3 ? errors.lastName = 'Must be at least 3 characters' : errors.lastName = true
                },
                email: () => {
                    const validEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
                    !validEmail.test(value) ? errors.email = 'Must be a valid email' : errors.email = true
                },
                password: () => {
                    const validPassword = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/
                    !validPassword.test(value) ? errors.password = 'Pasword must contain at lease 8 characters, upper and lower case, a number and a special character' : errors.password = true

                    value !== user.confirmPassword ? errors.confirmPassword = 'Passwords must match' : errors.confirmPassword = true
                },
                confirmPassword: () => value != user.password ? errors.confirmPassword = 'Passwords must match' : errors.confirmPassword = true
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
    const handleSubmit = e => {
        e.preventDefault()

        setDisplayErrors(true)
        
        console.log('form state: ', errors.form)
        if(errors.form){
            console.log('submitting')
            submitHandler(user)
            .then(res => navigate('/admin'))
            .catch(res => {
                console.log(res.response.data)
                setErrors(res.response.data.errors)
            })
        }
    }

    return (
        <>
            <h2>Create an Account</h2>
            <Form onSubmit={handleSubmit}>
                <Row className='form'>
                    <Form.Group as={Col}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='First Name'
                            name='firstName'
                            value={user.firstName}
                            onChange={updateInput}
                        />
                        <p className='text-danger'>{displayErrors && errors.firstName}</p>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Last Name'
                            name='lastName'
                            value={user.lastName}
                            onChange={updateInput}
                        />
                        <p className='text-danger'>{displayErrors && errors.lastName}</p>
                    </Form.Group>
                </Row>
                <Form.Group className='form'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='text' // TODO: change this to email for production
                        placeholder='Email'
                        name='email'
                        value={user.email}
                        onChange={updateInput}
                    />
                    <p className='text-danger'>{displayErrors && errors.email}</p>
                </Form.Group>
                <Row className='form'>
                    <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={user.password}
                            onChange={updateInput}
                        />
                    <p className='text-danger'>{displayErrors && errors.password}</p>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            name='confirmPassword'
                            value={user.confirmPassword}
                            onChange={updateInput}
                        />
                    <p className='text-danger'>{displayErrors && errors.confirmPassword}</p>
                    </Form.Group>
                </Row>
                <Button type='submit' className='form'>
                    Submit
                </Button>
            </Form>
            <Link to={'/'}>Login</Link>
        </>
    )
}

