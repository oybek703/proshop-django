import React, {useEffect} from 'react'
import {Table, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Loader from '../UI/Loader'
import Alert from '../UI/Alert'
import moment from 'moment'
import {fetchAllOrders} from '../../redux/actions'
import {LinkContainer} from 'react-router-bootstrap'

function OrderList() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {orders, loading, error} = useSelector(state => state.allOrders)

    const {user} = useSelector(state => state.userInfo)


    useEffect(() => {
        if (user && user['is_admin']) {
            dispatch(fetchAllOrders())
        } else {
            navigate('/login')
        }

    }, [dispatch, navigate, user])


    return (
        <div>
            <h1>Orders</h1>
            {loading
                ? (<Loader/>)
                : error
                    ? (<Alert type='danger'>{error}</Alert>)
                    : (
                        <Table striped responsive className='table'>
                            <thead>
                            <tr>
                                <th>№</th>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th>Details</th>
                            </tr>
                            </thead>

                            <tbody>
                            {orders.map((order, i) => (
                                <tr key={order._id}>
                                    <td>{i + 1}</td>
                                    <td>{order._id}</td>
                                    <td>{moment(order.created_at).format('LLL')}</td>
                                    <td>${order.total_price}</td>
                                    <td>{order.is_paid ? moment(order.paid_at).format('LLL') : (
                                        <i className='fas fa-times' style={{color: 'red'}}/>
                                    )}</td>
                                    <td>{order.is_delivered ? moment(order.delivered_at).format('LLL') : (
                                        <i className='fas fa-times' style={{color: 'red'}}/>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant='outline-primary' className='btn-sm'>
                                                <i className='fas fa-question-circle'/>
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default OrderList