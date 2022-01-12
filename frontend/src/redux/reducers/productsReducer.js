import {
    FETCH_PRODUCT_FAIL,
    FETCH_PRODUCT_START,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_FAIL,
    FETCH_PRODUCTS_START,
    FETCH_PRODUCTS_SUCCESS
} from '../actions/types'

const initialState = {
    products: [],
    loading: false,
    error: null
}

function productList(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case FETCH_PRODUCTS_START:
            return {...state, loading: true, error: null}
        case FETCH_PRODUCTS_SUCCESS:
            return {...state, loading: false, products: payload}
        case FETCH_PRODUCTS_FAIL:
            return {...state, loading: false, error: payload}
        default:
            return state
    }
}

const productInitialState = {
    product: {},
    loading: false,
    error: null
}

function product(state = productInitialState, action) {
    const {type, payload} = action
    switch (type) {
        case FETCH_PRODUCT_START:
            return {...state, loading: true, error: null}
        case FETCH_PRODUCT_SUCCESS:
            return {...state, loading: false, product: payload}
        case FETCH_PRODUCT_FAIL:
            return {...state, loading: false, error: payload}
        default:
            return state
    }
}

export {
    productList,
    product
}