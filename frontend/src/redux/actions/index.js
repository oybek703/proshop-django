import {
    ADD_ORDER_FAIL, ADD_ORDER_RESET,
    ADD_ORDER_START, ADD_ORDER_SUCCESS,
    ADD_TO_CART, CLEAR_CART,
    FETCH_PRODUCT_FAIL,
    FETCH_PRODUCT_START,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_FAIL,
    FETCH_PRODUCTS_START,
    FETCH_PRODUCTS_SUCCESS,
    REMOVE_FROM_CART,
    SAVE_PAYMENT_METHOD,
    SAVE_SHIPPING_ADDRESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_START,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_START,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_START,
    USER_REGISTER_SUCCESS
} from './types'
import axiosInstance from '../../utils/axiosInstance'

function dispatchError(dispatch, type, e) {
    const {response = {}} = e
    const {data = {}} = response
    const {detail} = data
    const error = detail || e.message
    dispatch({type: type, payload: error})
}

export function fetchProductList() {
    return async function (dispatch) {
        try {
            dispatch({type: FETCH_PRODUCTS_START})
            const {data} = await axiosInstance.get(`/api/products`)
            dispatch({type: FETCH_PRODUCTS_SUCCESS, payload: data})
        } catch (e) {
            dispatchError(dispatch, FETCH_PRODUCTS_FAIL, e)
        }
    }
}

export function fetchProduct(id) {
    return async function (dispatch) {
        try {
            dispatch({type: FETCH_PRODUCT_START})
            const {data} = await axiosInstance.get(`/api/products/${id}`)
            dispatch({type: FETCH_PRODUCT_SUCCESS, payload: data})
        } catch (e) {
            dispatchError(dispatch, FETCH_PRODUCT_FAIL, e)
        }
    }
}

export function addToCart(productId, qty, fromCart = false) {
    return async function (dispatch, getState) {
        try {
            const {data: products} = await axiosInstance('/api/products')
            const product = products.find(p => p._id === +productId)
            let {cart} = getState()
            let {items} = cart
            let existingProduct = items.find(item => item._id === product._id)
            if(fromCart) {
                items = items
                    .map(item => item._id === product._id ? ({...item, qty: +qty}) : item)
            } else {
                if(!existingProduct) items.push({...product, qty: +qty})
                if(existingProduct) {
                    const newQty = +existingProduct.qty+(+qty)
                    items = items
                        .map(item => item._id === product._id ? ({
                            ...item,
                            qty: newQty > item.count_in_stock ? +item.count_in_stock : newQty
                        }) : item)
                }
            }
            cart = {...cart, items}
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({type: ADD_TO_CART, payload: items})
        } catch (e) {
            console.log(e)
        }
    }
}

export function removeFromCart(productId) {
    return function (dispatch, getState) {
        let {cart} = getState()
        let {items} = cart
        items = items.filter(item => item._id !== productId)
        cart = {...cart, items}
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({type: REMOVE_FROM_CART, payload: items})
    }
}

export function login(formData) {
    return async function (dispatch) {
        try {
            dispatch({type: USER_LOGIN_START})
            const {data} = await axiosInstance.post(
                `/api/users/login`,
                {...formData, username: formData['email']}
            )
            localStorage.setItem('user', JSON.stringify(data))
            dispatch({type: USER_LOGIN_SUCCESS, payload: data})
        } catch (e) {
            dispatchError(dispatch, USER_LOGIN_FAIL, e)
        }
    }
}

export function registerUser(formData) {
    return async function (dispatch) {
        try {
            dispatch({type: USER_REGISTER_START})
            const {data} = await axiosInstance.post(
                `/api/users/register`,
                formData
            )
            localStorage.setItem('user', JSON.stringify(data))
            dispatch({type: USER_REGISTER_SUCCESS, payload: data})
        } catch (e) {
            dispatchError(dispatch, USER_REGISTER_FAIL, e)
        }
    }
}

export function fetchUser(id = 'profile') {
    return async function (dispatch, getState) {
        try {
            const {user: {token}} = getState().userInfo
            dispatch({type: USER_DETAILS_START})
            const {data} = await axiosInstance.get(`/api/users/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({type: USER_DETAILS_SUCCESS, payload: data})
        } catch (e) {
            dispatchError(dispatch, USER_DETAILS_FAIL, e)
        }
    }
}

export function updateUser(formData) {
    return async function (dispatch, getState) {
        try {
            const {user: {token}} = getState().userInfo
            dispatch({type: USER_DETAILS_START})
            const {data} = await axiosInstance.post(
                `/api/users/update`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            localStorage.setItem('user', JSON.stringify(data))
            dispatch({type: USER_DETAILS_SUCCESS, payload: data})
            dispatch({type: USER_LOGIN_SUCCESS, payload: data})
        } catch (e) {
            dispatchError(dispatch, USER_DETAILS_FAIL, e)
        }
    }
}

export function logout() {
    return function (dispatch) {
            localStorage.removeItem('user')
            dispatch({type: USER_LOGOUT})
    }
}

export function saveShippingAddress(shippingAddress) {
    return function (dispatch, getState) {
            const cart = {...getState().cart, shippingAddress}
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({type: SAVE_SHIPPING_ADDRESS, payload: shippingAddress})
    }
}

export function savePaymentMethod(paymentMethod) {
    return function (dispatch, getState) {
            const cart = {...getState().cart, paymentMethod}
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({type: SAVE_PAYMENT_METHOD, payload: paymentMethod})
    }
}

export function createOrder(orderData) {
    return async function (dispatch, getState) {
        try {
            const {user: {token}} = getState().userInfo
            dispatch({type: ADD_ORDER_START})
            const {data} = await axiosInstance.post(
                `/api/orders/add`,
                orderData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            localStorage.removeItem('cart')
            dispatch({type: ADD_ORDER_SUCCESS, payload: data})
            dispatch({type: CLEAR_CART})
            dispatch({type: ADD_ORDER_RESET})
        } catch (e) {
            dispatchError(dispatch, ADD_ORDER_FAIL, e)
        }
    }
}