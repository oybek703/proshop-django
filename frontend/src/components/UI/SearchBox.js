import React, {useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import {useLocation, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {fetchProductList} from '../../redux/actions'
import Spinner from './Spinner'

function SearchBox() {
    const dispatch = useDispatch()
    const {search, pathname} = useLocation()
    const {loading} = useSelector(state => state.productList)
    const existingKeyword = search ? search.split('keyword=')[1] : ''
    const [keyword, setKeyword] = useState(existingKeyword)
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        let queryParams = `/?page=1&keyword=${keyword}`
        if(!keyword) queryParams = '/?page=1'
        navigate(`${pathname.includes('admin') ? '/admin/products' : ''}${queryParams}`)
        dispatch(fetchProductList(queryParams))
    }
    return (
        <Form onSubmit={handleSubmit} className='d-flex'>
            <Form.Control
                type='text'
                name='q'
                disabled={loading}
                value={keyword || ''}
                onChange={(e) => setKeyword(e.target.value)}
                className='form-control mr-3'
                placeholder='Search product'
                style={{marginRight: 10}}
            />

            <Button
                type='submit'
                variant='outline-primary'
                className='btn d-flex justify-content-between align-items-center'
                disabled={loading}
            >
                Submit {loading && <Spinner small/>}
            </Button>
        </Form>
    )
}

export default SearchBox
