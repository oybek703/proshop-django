import {
    CREATE_PRODUCT_FAIL, CREATE_PRODUCT_RESET,
    CREATE_PRODUCT_START,
    CREATE_PRODUCT_SUCCESS, CREATE_REVIEW_FAIL, CREATE_REVIEW_RESET, CREATE_REVIEW_START, CREATE_REVIEW_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_START,
    DELETE_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAIL,
    FETCH_PRODUCT_START,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_FAIL,
    FETCH_PRODUCTS_START,
    FETCH_PRODUCTS_SUCCESS, TOP_PRODUCTS_FAIL, TOP_PRODUCTS_START, TOP_PRODUCTS_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_START,
    UPDATE_PRODUCT_SUCCESS
} from '../actions/types'

const initialState = {
    products: [],
    loading: false,
    error: null,
    page: 1,
    pages: 1
}

export function productList(state = initialState, action) {
    const {type, payload = {}} = action
    const {products, page, pages} = payload
    switch (type) {
        case FETCH_PRODUCTS_START:
            return {...state, loading: true, error: null}
        case FETCH_PRODUCTS_SUCCESS:
            return {...state, loading: false, products, page, pages}
        case FETCH_PRODUCTS_FAIL:
            return {...state, loading: false, error: payload}
        default:
            return state
    }
}

const topProductsInitialState = {
    products: [],
    loading: false,
    error: null
}

export function topProducts(state = topProductsInitialState, action) {
    const {type, payload = {}} = action
    switch (type) {
        case TOP_PRODUCTS_START:
            return {...state, loading: true, error: null}
        case TOP_PRODUCTS_SUCCESS:
            return {...state, loading: false, products: payload}
        case TOP_PRODUCTS_FAIL:
            return {...state, loading: false, error: payload}
        default:
            return state
    }
}

const productInitialState = {
    product: {},
    loading: true,
    error: null
}

export function product(state = productInitialState, action) {
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

const updateProductInitialState = {
    updated: null,
    loading: false,
    error: null
}

export function updateProduct(state = updateProductInitialState, action) {
    const {type, payload} = action
    switch (type) {
        case UPDATE_PRODUCT_START:
            return {...state, loading: true, error: null}
        case UPDATE_PRODUCT_SUCCESS:
            return {...state, loading: false, updated: payload}
        case UPDATE_PRODUCT_FAIL:
            return {...state, loading: false, error: payload}
        default:
            return state
    }
}

const createProductInitialState = {
    created: null,
    loading: false,
    error: null
}


export function createProduct(state = createProductInitialState, action) {
    const {type, payload} = action
    switch (type) {
        case CREATE_PRODUCT_START:
            return {...state, loading: true, error: null}
        case CREATE_PRODUCT_SUCCESS:
            return {...state, loading: false, created: payload}
        case CREATE_PRODUCT_FAIL:
            return {...state, loading: false, error: payload}
        case CREATE_PRODUCT_RESET:
            return {...state, error: null, created: null}
        default:
            return state
    }
}

const createReviewInitialState = {
    review: null,
    loading: false,
    error: null
}


export function createReview(state = createReviewInitialState, action) {
    const {type, payload} = action
    switch (type) {
        case CREATE_REVIEW_START:
            return {...state, loading: true, error: null}
        case CREATE_REVIEW_SUCCESS:
            return {...state, loading: false, review: payload}
        case CREATE_REVIEW_FAIL:
            return {...state, loading: false, error: payload}
        case CREATE_REVIEW_RESET:
            return {...state, error: null, review: null}
        default:
            return state
    }
}

const deleteProductInitialState = {
    deleted: null,
    loading: false,
    error: null
}


export function deleteProduct(state = deleteProductInitialState, action) {
    const {type, payload} = action
    switch (type) {
        case DELETE_PRODUCT_START:
            return {...state, loading: true, error: null}
        case DELETE_PRODUCT_SUCCESS:
            return {...state, loading: false, deleted: payload}
        case DELETE_PRODUCT_FAIL:
            return {...state, loading: false, error: payload}
        default:
            return state
    }
}