import {
    ADD_TO_CART,
    FETCH_PRODUCT_FAIL,
    FETCH_PRODUCT_START,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_FAIL,
    FETCH_PRODUCTS_START,
    FETCH_PRODUCTS_SUCCESS, REMOVE_FROM_CART
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
                if(existingProduct) items = items
                    .map(item => item._id === product._id ? ({...item, qty: +item['qty']+(+qty)}) : item)
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
        console.log(productId)
        let {cartItems: {items}} = getState()
        items = items.filter(item => item._id !== productId)
        localStorage.setItem('cartItems', JSON.stringify(items))
        dispatch({type: REMOVE_FROM_CART, payload: items})
    }
}