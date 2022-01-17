import React, {useState, useEffect, Fragment} from 'react'
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import moment from 'moment'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {PayPalButton} from 'react-paypal-button-v2'
import Loader from '../UI/Loader'
import Alert from '../UI/Alert'
import {fetchOrder, payOrder} from '../../redux/actions'
import Spinner from '../UI/Spinner'
import axiosInstance from '../../utils/axiosInstance'
import {ORDER_DETAILS_RESET} from '../../redux/actions/types'

function OrderScreen() {
    const navigate = useNavigate()
    const {id: orderId} = useParams()
    const dispatch = useDispatch()
    const [sdkReady, setSdkReady] = useState(false)
    const {user} = useSelector(state => state.userInfo)
    const {order, loading, error} = useSelector(state => state.orderDetails)
    const {paid} = useSelector(state => state.orderPay)

    if (!loading && !error && order) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
        order.total_price = (+order.total_price).toFixed(2)
    }


    useEffect(() => {
        if (!user) navigate('/login')
        else {
            const addPaypalScript = async () => {
                console.log('Attempting for PayPal SDKKey...')
                const {data: {client_id}} = await axiosInstance('/api/config/paypal', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const script = document.createElement('script')
                script.type = 'text/javascript'
                script.src = `https://www.paypal.com/sdk/js?client-id=${client_id}`
                script.async = true
                script.onload = () => {
                    setSdkReady(true)
                }
                document.body.appendChild(script)
            }
            if (!order || order.id === orderId) {
                dispatch(fetchOrder(orderId))
            } else {
                if (!order.is_paid) {
                    if (!window.paypal) {
                        addPaypalScript().then(() => console.log('Done!'))
                    } else {
                        setSdkReady(true)
                    }
                }
            }
        }
        if (order) {
            return function () {
                dispatch({type: ORDER_DETAILS_RESET})
            }
        }
    }, [user, navigate, dispatch, orderId, order, paid])
    const successPaymentHandler = (paymentResult) => {
        const {id} = paymentResult
        dispatch(payOrder(orderId, id))
    }
    const deliverHandler = () => {
        // dispatch(deliverOrder(order))
    }
    return loading ? (
        <Loader/>
    ) : error ? (
        <Alert type='danger'>{error}</Alert>
    ) : (order && <>
        <h1>Order: {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong> {order.user.name}</p>
                        <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Shipping: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}
                            {'  '}
                            {order.shippingAddress.postalCode},
                            {'  '}
                            {order.shippingAddress.country}
                        </p>

                        {order.is_delivered ? (
                            <Alert type='success'>Delivered on {order.delivered_at}</Alert>
                        ) : (
                            <Alert type='warning'>Not Delivered</Alert>
                        )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.payment_method}
                        </p>
                        {order.is_paid ? (
                            <Alert type='success'>Paid on {moment(order.paid_at).format('LLL')}</Alert>
                        ) : (
                            <Alert type='warning'>Not Paid</Alert>
                        )}

                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? <Alert type='info'>
                            Order is empty
                        </Alert> : (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>

                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
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
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>${order.shipping_price}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${order.tax_price}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>${+order.total_price}</Col>
                            </Row>
                        </ListGroup.Item>


                        {!order.is_paid && (
                            <ListGroup.Item style={{textAlign: 'center'}}>
                                {!sdkReady ? (
                                    <Spinner/>
                                ) : (
                                    <PayPalButton
                                        amount={order.total_price}
                                        onSuccess={successPaymentHandler}
                                    />
                                )}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                    {/*{loadingDeliver && <Loader/>}*/}
                    {user && user.is_admin && order.is_paid && !order.is_delivered && (
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn btn-block'
                                onClick={deliverHandler}
                            >
                                Mark As Delivered
                            </Button>
                        </ListGroup.Item>
                    )}
                </Card>
            </Col>
        </Row>
    </>)
}

export default OrderScreen
