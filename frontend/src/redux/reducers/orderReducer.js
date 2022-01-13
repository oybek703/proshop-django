import {
    ADD_ORDER_FAIL, ADD_ORDER_RESET, ADD_ORDER_START,
    ADD_ORDER_SUCCESS,
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

export default addOrder