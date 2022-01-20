import {
    ADD_ORDER_FAIL,
    ADD_ORDER_START,
    ADD_ORDER_SUCCESS,
    ADD_TO_CART, ALL_ORDERS_FAIL, ALL_ORDERS_START, ALL_ORDERS_SUCCESS,
    CLEAR_CART,
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_START,
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL, DELETE_PRODUCT_START,
    DELETE_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAIL,
    FETCH_PRODUCT_START,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_FAIL,
    FETCH_PRODUCTS_START,
    FETCH_PRODUCTS_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_START, ORDER_DELIVER_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_START,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_START,
    ORDER_PAY_SUCCESS,
    REMOVE_FROM_CART,
    SAVE_PAYMENT_METHOD,
    SAVE_SHIPPING_ADDRESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_START,
    UPDATE_PRODUCT_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_START,
    USER_DELETE_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_START,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_START,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_ORDERS_FAIL,
    USER_ORDERS_START,
    USER_ORDERS_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_START,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_START,
    USER_UPDATE_SUCCESS,
    USERS_LIST_FAIL,
    USERS_LIST_START,
    USERS_LIST_SUCCESS
} from './types'
import axiosInstance from '../../utils/axiosInstance'

function dispatchError(dispatch, type, e) {
    const {response = {}} = e
    const {data = {}} = response
    const {detail} = data
    const error = detail || e.message
    dispatch({type: type, payload: error})
}

// PRODUCT ACTIONS
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

export function updateProduct(formData) {
    return async function(dispatch, getState) {
        try{
            const {user} = getState().userInfo
            dispatch({type: UPDATE_PRODUCT_START})
            const {data} = await axiosInstance.put(`/api/products/update`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            dispatch({type: UPDATE_PRODUCT_SUCCESS, payload: data})
            dispatch({type: FETCH_PRODUCT_SUCCESS, payload: data})
        } catch (e) {
            dispatchError(dispatch, UPDATE_PRODUCT_FAIL, e)
        }
    }
}

export function createProduct(formData) {
    return async function(dispatch, getState) {
        try{
            const {user} = getState().userInfo
            dispatch({type: CREATE_PRODUCT_START})
            const {data} = await axiosInstance.post(`/api/products/create`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            dispatch({type: CREATE_PRODUCT_SUCCESS, payload: data})
        } catch (e) {
            dispatchError(dispatch, CREATE_PRODUCT_FAIL, e)
        }
    }
}

export function deleteProduct(productId) {
    return async function (dispatch, getState) {
        try {
            const {user: {token}} = getState().userInfo
            dispatch({type: DELETE_PRODUCT_START})
            const {data} = await axiosInstance.delete(`/api/products/delete/${productId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({type: DELETE_PRODUCT_SUCCESS, payload: data})
        } catch (e) {
            dispatchError(dispatch, DELETE_PRODUCT_FAIL, e)
        }
    }
}

// USER ACTIONS
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

export function deleteUser(userId) {
    return async function (dispatch, getState) {
        try {
            const {user: {token}} = getState().userInfo
            dispatch({type: USER_DELETE_START})
            const {data} = await axiosInstance.delete(`/api/users/delete/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({type: USER_DELETE_SUCCESS, payload: data})
        } catch (e) {
            dispatchError(dispatch, USER_DELETE_FAIL, e)
        }
    }
}

export function updateUserProfile(formData) {
    return async function (dispatch, getState) {
        try {
            const {user: {token}} = getState().userInfo
            dispatch({type: USER_DETAILS_START})
            const {data} = await axiosInstance.post(
                `/api/users/update/profile`,
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

export function fetchUsers() {
    return async function (dispatch, getState) {
        try {
            const {user: {token}} = getState().userInfo
            dispatch({type: USERS_LIST_START})
            const {data} = await axiosInstance.get(`/api/users`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({type: USERS_LIST_SUCCESS, payload: data})
        } catch (e) {
            dispatchError(dispatch, USERS_LIST_FAIL, e)
        }
    }
}

export function updateUser(formData) {
    return async function (dispatch, getState) {
        try {
            const {user: {token}} = getState().userInfo
            dispatch({type: USER_UPDATE_START})
            const {data} = await axiosInstance.put(
                `/api/users/update/${formData.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            dispatch({type: USER_UPDATE_SUCCESS, payload: data})
        } catch (e) {
            dispatchError(dispatch, USER_UPDATE_FAIL, e)
        }
    }
}

export function logout() {
    return function (dispatch) {
            localStorage.removeItem('user')
            dispatch({type: USER_LOGOUT})
    }
}

// PAYMENT ACTIONS
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

// ORDER ACTIONS
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
        } catch (e) {
            dispatchError(dispatch, ADD_ORDER_FAIL, e)
        }
    }
}

export function fetchOrder(orderId) {
    return async function (dispatch, getState) {
        try {
            const {user: {token}} = getState().userInfo
            dispatch({type: ORDER_DETAILS_START})
            const {data} = await axiosInstance.get(`/api/orders/${orderId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({type: ORDER_DETAILS_SUCCESS, payload: data})
        } catch (e) {
            dispatchError(dispatch, ORDER_DETAILS_FAIL, e)
        }
    }
}

export function fetchUserOrders() {
    return async function (dispatch, getState) {
        try {
            const {user: {token}} = getState().userInfo
            dispatch({type: USER_ORDERS_START})
            const {data} = await axiosInstance.get(`/api/orders/my`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({type: USER_ORDERS_SUCCESS, payload: data})
        } catch (e) {
            dispatchError(dispatch, USER_ORDERS_FAIL, e)
        }
    }
}

export function fetchAllOrders() {
    return async function (dispatch, getState) {
        try {
            const {user: {token}} = getState().userInfo
            dispatch({type: ALL_ORDERS_START})
            const {data} = await axiosInstance.get(`/api/orders/all`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({type: ALL_ORDERS_SUCCESS, payload: data})
        } catch (e) {
            dispatchError(dispatch, ALL_ORDERS_FAIL, e)
        }
    }
}

export function payOrder(orderId, paymentId) {
    return async function (dispatch, getState) {
        try {
            const {user: {token}} = getState().userInfo
            dispatch({type: ORDER_PAY_START})
            const {data} = await axiosInstance.put(`/api/orders/${orderId}/pay`, {
                paymentId
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({type: ORDER_PAY_SUCCESS, payload: data})
            dispatch({type: ORDER_DETAILS_SUCCESS, payload: data})
        } catch (e) {
            dispatchError(dispatch, ORDER_PAY_FAIL, e)
        }
    }
}

export function deliverOrder(orderId) {
    return async function (dispatch, getState) {
        try {
            const {user: {token}} = getState().userInfo
            dispatch({type: ORDER_DELIVER_START})
            const {data} = await axiosInstance.put(`/api/orders/${orderId}/deliver`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
            })
            dispatch({type: ORDER_DELIVER_SUCCESS, payload: data})
            dispatch({type: ORDER_DETAILS_SUCCESS, payload: data})
        } catch (e) {
            dispatchError(dispatch, ORDER_DELIVER_FAIL, e)
        }
    }
}