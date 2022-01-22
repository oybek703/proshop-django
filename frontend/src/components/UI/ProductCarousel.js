import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Carousel, Image} from 'react-bootstrap'
import {fetchTopProducts} from '../../redux/actions'
import Alert from './Alert'

function ProductCarousel() {
    const dispatch = useDispatch()

    const {products, error} = useSelector(state => state.topProducts)

    useEffect(() => {
        dispatch(fetchTopProducts())
    }, [dispatch])

    return (
        error
            ? <Alert type='danger'>{error}</Alert>
            : <Carousel pause='hover' className='bg-dark'>
                {products.map(product => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid/>
                            <Carousel.Caption className='carousel.caption'>
                                <h4>{product.name} (${product.price})</h4>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>

    )
}

export default ProductCarousel
