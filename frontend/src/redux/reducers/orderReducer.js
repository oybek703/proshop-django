import {
    ADD_ORDER_FAIL,
    ADD_ORDER_RESET,
    ADD_ORDER_START,
    ADD_ORDER_SUCCESS,
    ORDER_DETAILS_FAIL, ORDER_DETAILS_RESET,
    ORDER_DETAILS_START,
    ORDER_DETAILS_SUCCESS, ORDER_PAY_FAIL,
    ORDER_PAY_START,
    ORDER_PAY_SUCCESS, USER_ORDERS_FAIL, USER_ORDERS_START, USER_ORDERS_SUCCESS,
} from '../actions/types'

const initialState = {
    loading: false,
    order: null,
    error: null
}

function addOrder(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case ADD_ORDER_START:
            return {...state, loading: true}
        case ADD_ORDER_SUCCESS:
            return {...state, loading: false, order: payload}
        case ADD_ORDER_FAIL:
            return {...state, loading: false, error: payload}
        case ADD_ORDER_RESET:
            return {...state, error: null, order: null}
        default:
            return state
    }
}


const orderPayInitialState = {
    loading: false,
    paid: false,
    error: null
}

function orderPay(state = orderPayInitialState, action) {
    const {type, payload} = action
    switch (type) {
        case ORDER_PAY_START:
            return {...state, loading: true}
        case ORDER_PAY_SUCCESS:
            return {...state, loading: false, paid: payload}
        case ORDER_PAY_FAIL:
            return {...state, loading: false, error: payload}
        default:
            return state
    }
}

const orderDetailsInitialState = {
    loading: true,
    order: null,
    error: null
}

function orderDetails(state = orderDetailsInitialState, action) {
    const {type, payload} = action
    switch (type) {
        case ORDER_DETAILS_START:
            return {...state, loading: true, error: null}
        case ORDER_DETAILS_SUCCESS:
            return {...state, loading: false, order: payload}
        case ORDER_DETAILS_FAIL:
            return {...state, loading: false, error: payload}
        case ORDER_DETAILS_RESET:
            return {...state, loading: false, error: null, order: null}
        default:
            return state
    }
}

const userOrdersInitialState = {
    loading: true,
    orders: [],
    error: null
}

function userOrders(state = userOrdersInitialState, action) {
    const {type, payload} = action
    switch (type) {
        case USER_ORDERS_START:
            return {...state, loading: true, error: null}
        case USER_ORDERS_SUCCESS:
            return {...state, loading: false, orders: payload}
        case USER_ORDERS_FAIL:
            return {...state, loading: false, error: payload}
        default:
            return state
    }
}



export {
    addOrder,
    orderDetails,
    orderPay,
    userOrders
}