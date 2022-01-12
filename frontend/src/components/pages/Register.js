import React, { useState, useEffect } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../UI/Alert'
import {login} from '../../redux/actions'
import Spinner from '../UI/Spinner'
import {USER_LOGIN_RESET} from '../../redux/actions/types'

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()


    const {user, loading, error} = useSelector(state => state.userInfo)
    useEffect(() => {
        if(user) navigate('/')
        return function () {
            dispatch({type: USER_LOGIN_RESET})
        }
    }, [navigate, user, dispatch])
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login({email, password}))
    }
    return (
        <Container>
            <h1>Sign In</h1>
            {error && <Alert type='danger'>{error}</Alert>}
            <Form onSubmit={submitHandler}>
                <br/>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        disabled={loading}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <br/>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        required
                        disabled={loading}
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br/>
                <Button type='submit' variant='primary' disabled={loading}>
                    Sign In &nbsp; {loading && <Spinner small />}
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer? <Link
                        to='/register'>
                        Register
                        </Link>
                </Col>
            </Row>

        </Container>
    )
}

export default Login
