import React, {useEffect} from 'react'
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import CheckoutSteps from '../UI/CheckoutSteps'
import Alert from '../UI/Alert'
import {createOrder} from '../../redux/actions'
import Spinner from '../UI/Spinner'
import {ADD_ORDER_RESET} from '../../redux/actions/types'

function PlaceOrder() {
    const navigate = useNavigate()
    const {order, error, loading} = useSelector(state => state.addOrder)
    const {user} = useSelector(state => state.userInfo)
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {shippingAddress = {}} = cart
    cart.itemsPrice = +cart.items.reduce((acc, item) => acc + (+item.price) * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number((0.082) * cart.itemsPrice).toFixed(2)

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    useEffect(() => {
        if (!cart.paymentMethod || !user || !shippingAddress) navigate('/payment')
        return function () {
            dispatch({type: ADD_ORDER_RESET})
        }
    }, [cart, user, navigate, shippingAddress, dispatch])
    useEffect(() => {
        if(order) navigate(`/order/${order._id}`)
    }, [order, navigate])
    const handlePlaceOrder = () => {
        dispatch(createOrder({
            orderItems: cart.items,
            shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>

                            <p>
                                <strong>Shipping: </strong>
                                {(shippingAddress || {}).address}, {(shippingAddress || {}).city}
                                {'  '}
                                {(shippingAddress || {}).postalCode},
                                {'  '}
                                {(shippingAddress || {}).country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.items.length === 0 ? <Alert type='info'>
                                Your cart is empty
                            </Alert> : (
                                <ListGroup variant='flush'>
                                    {cart.items.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>

                                                <Col>
                                                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>

                    </ListGroup>

                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>


                            {error && <ListGroup.Item>
                                <Alert type='danger'>{error}</Alert>
                            </ListGroup.Item>}

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.items.length === 0 || loading}
                                    onClick={handlePlaceOrder}
                                >
                                    Place Order {loading && <Spinner small/>}
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrder
