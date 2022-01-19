import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {Form, Button, Col, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../UI/Loader'
import Alert from '../UI/Alert'
import {fetchProduct, updateProduct} from '../../redux/actions'
import axiosInstance from '../../utils/axiosInstance'
import Spinner from '../UI/Spinner'
import {Navigate} from 'react-router'


function EditProduct() {
    const navigate = useNavigate()
    const {id: productId} = useParams()
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    const [imageFile, setImageFile] = useState()

    const dispatch = useDispatch()

    const {product, error, loading} = useSelector(state => state.product)
    const {user} = useSelector(state => state.userInfo)
    const {
        updated,
        loading: updateLoading,
        error: updateError
    } = useSelector(state => state.updateProduct)
    useEffect(() => {
        if (!product.name || product._id !== Number(productId)) {
            dispatch(fetchProduct(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.count_in_stock)
            setDescription(product.description)
        }

    }, [dispatch, product, productId, navigate, updated])

    const submitHandler = async (e) => {
        e.preventDefault()
        async function uploadImage() {
            const formData = new FormData()
            formData.append('image', imageFile)
            setUploading(true)
            try {
                const {data: {image}} = await axiosInstance.put(`/api/products/upload/${productId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                setImage(image)
                setUploading(false)
            } catch (error) {
                console.log(error)
                setUploading(false)
            }
        }
        if(imageFile) await uploadImage()
        dispatch(updateProduct({
            productId,
            name,
            price,
            brand,
            category,
            countInStock,
            description
        }))
        navigate('/admin/products')
    }
    if(!user.is_admin) return <Navigate to='/'/>
    return (
        <div>
            <Link to='/admin/products' className='btn btn-light'>Go Back</Link>
            <br/><br/>
            <h1>Edit Product</h1>
            {updateError && <Alert type='danger'>{updateError}</Alert>}
            {loading
                ? <Loader/>
                : error
                    ? <Alert type='danger'>{error}</Alert>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId='name'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control

                                            type='text'
                                            placeholder='Enter name'
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

                                            type='number'
                                            placeholder='Enter price'
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

                                            type='number'
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
                                        <Form.Label>Image: <b>&nbsp;{image}</b></Form.Label>
                                        <Row>
                                            <Col xs={uploading ? 10 : 12}>
                                                <Form.Control
                                                    disabled={uploading}
                                                    onChange={({target: {files: [imageFile]}}) => setImageFile(imageFile)}
                                                    type='file'/>
                                            </Col>
                                            {uploading && <Col xs={2}>
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
                            <Button disabled={loading || uploading || updateLoading}
                                    type='submit' variant='primary'>
                                Update &nbsp;
                                {(loading || uploading || updateLoading) && <Spinner small/>}
                            </Button>

                        </Form>
                    )}

        </div>

    )
}

export default EditProduct