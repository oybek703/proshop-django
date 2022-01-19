import React, {useEffect, useState} from 'react'
import {Link, useNavigate, Navigate} from 'react-router-dom'
import {Form, Button, Col, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Alert from '../UI/Alert'
import {createProduct} from '../../redux/actions'
import Spinner from '../UI/Spinner'
import {CREATE_PRODUCT_RESET} from '../../redux/actions/types'


function CreateProduct() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [imageFile, setImageFile] = useState()

    const dispatch = useDispatch()
    const {loading, error} = useSelector(state => state.createProduct)
    const {user} = useSelector(state => state.userInfo)
    useEffect(() => {
        dispatch({type: CREATE_PRODUCT_RESET})
    }, [dispatch])
    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('brand', brand)
        formData.append('category', category)
        formData.append('countInStock', countInStock)
        formData.append('description', description)
        if(imageFile) formData.append('image', imageFile)
        await dispatch(createProduct(formData))
        navigate('/admin/products')
    }
    if (!user.is_admin) return <Navigate to='/'/>
    return (
        <div>
            <Link to='/admin/products' className='btn btn-light'>Go Back</Link>
            <br/><br/>
            <h1>Create Product</h1>
            {error && <Alert type='danger'>{error}</Alert>}
            <Form onSubmit={submitHandler}>

                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control

                                type='text'
                                placeholder='Enter name'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                min={0}
                                step='0.01'
                                type='number'
                                placeholder='Enter price'
                                required
                                value={price}
                                onChange={(e) => setPrice(+e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control

                                type='text'
                                required
                                placeholder='Enter brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group controlId='countinstock'>
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                min={0}
                                type='number'
                                required
                                placeholder='Enter stock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <br/>
                <Row className='d-flex align-items-center'>
                    <Col xs={12} md={6}>
                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control

                                type='text'
                                required
                                placeholder='Enter category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group controlId="formFile">
                            <Form.Label>Image:</Form.Label>
                            <Row>
                                <Col xs={loading ? 10 : 12}>
                                    <Form.Control
                                        disabled={loading}
                                        onChange={({target: {files: [imageFile]}}) => setImageFile(imageFile)}
                                        type='file'/>
                                </Col>
                                {loading && <Col xs={2}>
                                    <Spinner/>
                                </Col>}
                            </Row>
                        </Form.Group>
                    </Col>
                </Row>
                <br/>
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control

                        as='textarea'
                        placeholder='Enter description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br/>
                <Button disabled={loading}
                        type='submit' variant='primary'>
                    Update &nbsp;
                    {(loading) && <Spinner small/>}
                </Button>

            </Form>
        </div>

    )
}

export default CreateProduct