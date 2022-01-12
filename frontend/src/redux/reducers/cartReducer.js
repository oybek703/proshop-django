import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/types'

const cartItemsInStorage = JSON.parse(localStorage.getItem('cartItems') || '[]')
const initialState = {
    items: cartItemsInStorage
}

function cartItems(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case ADD_TO_CART:
            return {items: payload}
        case REMOVE_FROM_CART:
            return {items: payload}
        default:
            return state
    }
}

export default cartItems