import React, { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../UI/FormContainer'
import Alert from '../UI/Alert'
import Spinner from '../UI/Spinner'
import {registerUser} from '../../redux/actions'
import {USER_LOGIN_RESET, USER_REGISTER_RESET} from '../../redux/actions/types'

function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const {user,loading, error} = useSelector(state => state.userInfo)

    useEffect(() => {
        if (user) navigate('/')
        return function () {
            dispatch({type: USER_LOGIN_RESET})
            dispatch({type: USER_REGISTER_RESET})
        }
    }, [user, navigate, dispatch])
    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
            setTimeout(() => setMessage(''), 3000)
        } else {
            dispatch(registerUser({name, email, password}))
        }

    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {message && <Alert type='danger'>{message}</Alert>}
            {error && <Alert type='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <br/>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        disabled={loading}
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        disabled={loading}
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br/>
                <Button type='submit' variant='primary' disabled={loading}>
                    Register {loading && <Spinner small/>}
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account? &nbsp; <Link
                        to='/login'>
                        Sign In
                        </Link>
                </Col>
            </Row>
        </FormContainer >
    )
}

export default Register
