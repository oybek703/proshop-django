import React, {useEffect, useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import FormContainer from '../UI/FormContainer'
import CheckoutSteps from '../UI/CheckoutSteps'
import {saveShippingAddress} from '../../redux/actions'

function ShippingAddress() {
    const navigate = useNavigate()

    const {shippingAddress} = useSelector(state => state.cart)
    const {user} = useSelector(state => state.userInfo)

    const dispatch = useDispatch()

    const [address, setAddress] = useState()
    const [city, setCity] = useState()
    const [postalCode, setPostalCode] = useState()
    const [country, setCountry] = useState()

    useEffect(() => {
        if (shippingAddress) {
            setAddress(shippingAddress.address)
            setCity(shippingAddress.city)
            setPostalCode(shippingAddress.postalCode)
            setCountry(shippingAddress.country)
        }
        if(!user) navigate('/login?redirect=shipping')
    }, [shippingAddress, navigate, user])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <br/>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter address'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter city'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter postal code'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter country'
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br/>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingAddress
