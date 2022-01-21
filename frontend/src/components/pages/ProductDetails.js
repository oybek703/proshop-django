import React, {useEffect, useState} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {
    ListGroup,
    Form, Row,
    Col, Image,
    ListGroupItem, Container, Button
} from 'react-bootstrap'
import Rating from '../UI/Rating'
import moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import {addToCart, createReview, fetchProduct} from '../../redux/actions'
import Loader from '../UI/Loader'
import Alert from '../UI/Alert'
import Spinner from '../UI/Spinner'
import {CREATE_REVIEW_RESET} from '../../redux/actions/types'

const ProductDetails = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id: productId} = useParams()
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState('')
    const [updating, setUpdating] = useState(false)
    const [qty, setQty] = useState(1)
    const {product, loading, error} = useSelector(state => state.product)
    const {
        review,
        loading: createReviewLoading,
        error: createReviewError
    } = useSelector(state => state.createReview)
    const {user} = useSelector(state => state.userInfo)
    function handleAddToCart() {
        dispatch(addToCart(productId, qty))
        navigate(`/cart`)
    }

    function setUpdatingComment(rating, comment) {
        setUpdating(true)
        setRating(parseInt(rating))
        setComment(comment)
    }

    useEffect(() => {
        dispatch(fetchProduct(productId))
        return function () {
            dispatch({type: CREATE_REVIEW_RESET})
        }
    }, [productId, dispatch, review])

    function handleReviewSubmit(e) {
        e.preventDefault()
        dispatch(createReview({rating, comment, productId}))
        setComment('')
        setRating('')
        setUpdating(false)
    }

    return (
        <Container className='mt-3'>
            <Link to='/' className='btn btn-light'>Go Home</Link>
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
                        <hr/>
                        <Row>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h4 id='updateComment'>{updating ? 'Update' : 'Write'} a review</h4>
                                    {createReviewError && <Alert type='danger'>{createReviewError}</Alert>}

                                    {user ? (
                                        <Form onSubmit={handleReviewSubmit}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as='select'
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Review</Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    row='10'
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                />
                                            </Form.Group>
                                            <br/>
                                            <Button
                                                disabled={createReviewLoading}
                                                type='submit'
                                                variant='primary'
                                            >
                                                {updating ? 'Update' : 'Submit'} {createReviewLoading && <Spinner small/>}
                                            </Button>

                                        </Form>
                                    ) : (
                                        <Alert type='info'>Please <Link to='/login'>login </Link>
                                            and purchase this product to write a
                                            review.</Alert>
                                    )}
                                </ListGroup.Item>
                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} color='#f8e825'/>
                                        <p>{moment(review.created_at).format('LLL')}</p>
                                        <p>
                                            {review.comment} &nbsp;
                                            {user && user._id === review.user &&
                                            <a onClick={setUpdatingComment.bind(null, review.rating, review.comment)}
                                               href="#updateComment" title='Update your comment'>
                                                <i className='far fa-edit' style={{color: '#585858'}}/>
                                            </a>}
                                        </p>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Row>
                    </>
            }
        </Container>
    )
}

export default ProductDetails