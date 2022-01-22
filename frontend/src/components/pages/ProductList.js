import React, {useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'
import Loader from '../UI/Loader'
import Alert from '../UI/Alert'
import {deleteProduct, fetchProductList} from '../../redux/actions'
import Paginate from '../UI/Paginate'

function ProductList() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {search} = useLocation()
    const {products, page, pages, loading, error} = useSelector(state => state.productList)
    const {
        loading: loadingDelete,
        error: errorDelete,
        deleted
    } = useSelector(state => state.deleteProduct)

    const {user} = useSelector(state => state.userInfo)

    useEffect(() => {
        if (!user.is_admin) navigate('/login')
        dispatch(fetchProductList(search))
    }, [dispatch, navigate, deleted, user, search])


    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        navigate('/admin/products/create')
    }

    return (
        <div>
            <Row className='d-flex justify-content-between'>
                <Col>
                    <h1>Products</h1>
                </Col>

                <Col className='d-flex justify-content-end'>
                    <Button variant='outline-primary' className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'/> Create Product
                    </Button>
                </Col>
            </Row>

            {errorDelete && <Alert type='danger'>{errorDelete}</Alert>}

            {loading
                ? (<Loader/>)
                : error
                    ? (<Alert type='danger'>{error}</Alert>)
                    : (
                        <Table hover bordered responsive className='table'>
                            <thead>
                            <tr>
                                <th>№</th>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th className='text-center'>ACTION</th>
                            </tr>
                            </thead>

                            <tbody>
                            {products.map((product, i) => (
                                <tr key={product._id}>
                                    <td>{i+1}</td>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>

                                    <td className='d-flex justify-content-around'>
                                        <LinkContainer to={`/admin/products/${product._id}/edit`}>
                                            <Button
                                                disabled={loadingDelete}
                                                variant='outline-primary' className='btn-sm'>
                                                <i className='fas fa-edit'/>
                                            </Button>
                                        </LinkContainer>

                                        <Button
                                            disabled={loadingDelete}
                                            variant='outline-danger' className='btn-sm'
                                                onClick={deleteHandler.bind(null, product._id)}>
                                            <i className='fas fa-trash'/>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}
            <Paginate pages={pages} page={page} isAdmin={true} />
        </div>
    )
}

export default ProductList