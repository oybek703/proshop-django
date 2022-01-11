import React, {useEffect, useState} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {
    ListGroup,
    Form, Row,
    Col, Image,
    ListGroupItem, Container
} from 'react-bootstrap'
import Rating from '../UI/Rating'
import {useDispatch, useSelector} from 'react-redux'
import {addToCart, fetchProduct} from '../../redux/actions'
import Loader from '../UI/Loader'
import Alert from '../UI/Alert'

const ProductDetails = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const [qty, setQty] = useState(1)
    const {product, loading, error} = useSelector(state => state.product)
    function handleAddToCart() {
        const {id} = params
        dispatch(addToCart(id, qty))
        navigate(`/cart`)
    }

    useEffect(() => {
        const {id} = params
        dispatch(fetchProduct(id))
    }, [params, dispatch])
    return (
        <Container className='mt-3'>
            <Link to='/' className='btn btn-light'>Go Back</Link>
            <br/><br/>
            {loading
                ? <Loader/>
                : error
                    ? <Alert message={error}/>
                    : <>
                        <Row className='my-2'>
                            <Col md={6}>
                                <Image rounded src={product.image} alt={product.name} fluid/>
                            </Col>
                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroupItem><h4>{product.name}</h4></ListGroupItem>
                                    <ListGroupItem>
                                        <Rating value={product.rating} text={`${product.num_reviews} reviews`}/>
                                    </ListGroupItem>
                                    <p className='mt-2'><strong>Description:</strong> {product.description}</p>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>
                                                Price:
                                            </Col>
                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col><strong>{product.count_in_stock ? 'In Stock' : 'Out of Stock'}</strong></Col>
                                        </Row>
                                    </ListGroupItem>
                                    {
                                        product.count_in_stock > 0 && (
                                            <ListGroupItem>
                                                <Row>
                                                    <Col>Qty:</Col>
                                                    <Col>
                                                        <Form.Control
                                                            as='select'
                                                            value={qty}
                                                            onChange={({target: {value}}) => setQty(value)}>
                                                            {
                                                                [...Array(product.count_in_stock).keys()].map(x => (
                                                                    <option value={x + 1} key={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        )
                                    }
                                    <ListGroupItem>
                                        <button
                                            className='btn btn-block btn-dark'
                                            disabled={product.count_in_stock === 0}
                                            onClick={handleAddToCart}>
                                            Add To Cart
                                        </button>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                    </>
            }
        </Container>
    )
}

export default ProductDetails