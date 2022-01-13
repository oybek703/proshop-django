import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Alert from '../UI/Alert'
import {Link, useNavigate} from 'react-router-dom'
import {Row, Col, ListGroup, Form, Button, Card, Image} from 'react-bootstrap'
import {addToCart, removeFromCart} from '../../redux/actions'

const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.userInfo)
    const {items} = useSelector(state => state.cart)
    function addToCartHandler(productId, {target: {value}}) {
        dispatch(addToCart(productId, value, true))
    }

    function removeFromCartHandler(productId) {
        dispatch(removeFromCart(productId))
    }

    function handleProceedToCheckout() {
        user ? navigate('/shipping') : navigate('/login?redirect=shipping')
    }
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {items.length === 0 ? (
                    <Alert type='info'>
                        Your cart is empty. &nbsp; <Link to='/'>Home</Link>
                    </Alert>
                ) : (
                        <ListGroup variant='flush'>
                            {items.map(item => (
                                <ListGroup.Item key={item._id}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                                        </Col>

                                        <Col md={2}>
                                            ${item.price}
                                        </Col>

                                        <Col md={3}>
                                            <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={addToCartHandler.bind(null, item._id)}
                                            >
                                                {

                                                    [...Array(item.count_in_stock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }

                                            </Form.Control>
                                        </Col>

                                        <Col md={1}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={removeFromCartHandler.bind(null, item._id)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({items.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            ${items.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item>
                        <Button
                            type='button'
                            className='btn-block'
                            disabled={items.length === 0}
                            onClick={handleProceedToCheckout}
                        >
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>


                </Card>
            </Col>
        </Row>
    )
}

export default Cart