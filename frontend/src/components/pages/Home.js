import React, {useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../UI/Product'
import {useDispatch, useSelector} from 'react-redux'
import {fetchProductList} from '../../redux/actions'
import Loader from '../UI/Loader'
import Alert from '../UI/Alert'

const Home = () => {
    const dispatch = useDispatch()
    const {products, loading, error} = useSelector(state => state.productList)
    useEffect(() => {
        dispatch(fetchProductList())
    }, [dispatch])
    return (
        <>
            <h1>Latest Products</h1>
            {loading
                ? <Loader/>
                : error
                    ? <Alert message={error}/>
                    : <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                            </Col>
                        ))}
                      </Row>}
        </>
    )
}

export default Home