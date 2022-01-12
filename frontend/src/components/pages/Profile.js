import React, {useEffect, useState} from 'react'
import {Form, Button, Row, Col, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Alert from '../UI/Alert'
import {Link, useNavigate} from 'react-router-dom'
import {fetchUser, updateUser} from '../../redux/actions'
import Spinner from '../UI/Spinner'

function Profile() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    let {error, loading, userDetails} = useSelector(state => state.userDetails)
    const {user} = useSelector(state => state.userInfo)
    useEffect(() => {
        if (!user) {
            navigate('/login')
        } else {
            dispatch(fetchUser())
        }
    }, [dispatch, user, navigate])
    useEffect(() => {
        if (Object.keys(userDetails).length > 0) {
            setName(userDetails['name'])
            setEmail(userDetails['username'])
        }
    }, [userDetails])
    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
            setTimeout(() => setMessage(''), 3000)
        } else {
            dispatch(updateUser({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
            setPassword('')
            setConfirmPassword('')
            setMessage('')
        }

    }
    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Alert type='danger'>{message}</Alert>}
                {error && <Alert type='danger'>{error}</Alert>}
                <Form onSubmit={submitHandler}>
                    <br/>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            disabled={loading}
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
                            disabled={loading}
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
                            disabled={loading}
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <br/>
                    <Button type='submit' variant='primary' disabled={loading}>
                        Update {loading && <Spinner small/>}
                    </Button>

                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {/*{loadingOrders ? (*/}
                {/*    <Loader />*/}
                {/*) : errorOrders ? (*/}
                {/*    <Message variant='danger'>{errorOrders}</Message>*/}
                {/*) : (*/}
                <Table striped responsive className='table-sm'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th/>
                    </tr>
                    </thead>

                    <tbody>
                    {[].map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )}</td>
                            <td>
                                <Link to={`/order/${order._id}`}>
                                    <Button className='btn-sm'>Details</Button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                {/*)}*/}
            </Col>
        </Row>
    )
}

export default Profile