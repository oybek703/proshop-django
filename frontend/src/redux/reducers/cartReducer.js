import {ADD_TO_CART, REMOVE_FROM_CART, SAVE_PAYMENT_METHOD, SAVE_SHIPPING_ADDRESS} from '../actions/types'

const cartInStorage = JSON.parse(localStorage.getItem('cart') || null)
const initialState = {
    items: [],
    shippingAddress: null,
    paymentMethod: null,
    ...cartInStorage
}

function cart(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case ADD_TO_CART:
            return {...state, items: payload}
        case REMOVE_FROM_CART:
            return {...state, items: payload}
        case SAVE_SHIPPING_ADDRESS:
            return {...state, shippingAddress: payload}
        case SAVE_PAYMENT_METHOD:
            return {...state, paymentMethod: payload}
        default:
            return state
    }
}

export default cart