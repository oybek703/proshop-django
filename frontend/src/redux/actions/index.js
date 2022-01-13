import {
    ADD_TO_CART,
    FETCH_PRODUCT_FAIL,
    FETCH_PRODUCT_START,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_FAIL,
    FETCH_PRODUCTS_START,
    FETCH_PRODUCTS_SUCCESS,
    REMOVE_FROM_CART, USER_DETAILS_FAIL, USER_DETAILS_START, USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_START,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT, USER_REGISTER_FAIL,
    USER_REGISTER_START, USER_REGISTER_SUCCESS
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
            let {cartItems: {items}} = getState()
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

            localStorage.setItem('cartItems', JSON.stringify(items))
            dispatch({type: ADD_TO_CART, payload: items})
        } catch (e) {
            console.log(e)
        }
    }
}

export function removeFromCart(productId) {
    return function (dispatch, getState) {
        let {cartItems: {items}} = getState()
        items = items.filter(item => item._id !== productId)
        localStorage.setItem('cartItems', JSON.stringify(items))
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