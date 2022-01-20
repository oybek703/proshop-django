import React, {useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../UI/Product'
import {useDispatch, useSelector} from 'react-redux'
import {fetchProductList} from '../../redux/actions'
import Loader from '../UI/Loader'
import Alert from '../UI/Alert'
import {useLocation} from 'react-router-dom'
import Paginate from '../UI/Paginate'

const Home = () => {
    const dispatch = useDispatch()
    const {search} = useLocation()
    const {products, page, pages, loading, error} = useSelector(state => state.productList)
    useEffect(() => {
        dispatch(fetchProductList(search))
    }, [dispatch, search])
    return (
        <>
            <h1>Latest Products</h1>
            {loading
                ? <Loader/>
                : error
                    ? <Alert message={error}/>
                    : <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4}>
                                <Product product={product}/>
                            </Col>
                        ))}
                        <Paginate pages={pages} page={page} />
                      </Row>}
        </>
    )
}

export default Home