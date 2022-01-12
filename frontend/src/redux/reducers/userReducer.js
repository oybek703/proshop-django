import {
    USER_DETAILS_FAIL, USER_DETAILS_RESET,
    USER_DETAILS_START, USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_RESET,
    USER_LOGIN_START,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL, USER_REGISTER_RESET, USER_REGISTER_START, USER_REGISTER_SUCCESS
} from '../actions/types'

const userInStorage = JSON.parse(localStorage.getItem('user') || null)
const initialState = {
    user: userInStorage,
    loading: false,
    error: null
}

function userInfo(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case USER_LOGIN_START:
        case USER_REGISTER_START:
            return {...state, loading: true, error: null}
        case USER_LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
            return {...state, loading: false, user: payload}
        case USER_LOGIN_FAIL:
        case USER_REGISTER_FAIL:
            return {...state, loading: false, error: payload}
        case USER_LOGIN_RESET:
        case USER_REGISTER_RESET:
            return {...state, error: null}
        case USER_LOGOUT:
            return {user: null, error: null, loading: null}
        default:
            return state
    }
}

const userDetailsInitialState = {
    userDetails: {},
    loading: false,
    error: null
}

function userDetails(state = userDetailsInitialState, action) {
    const {type, payload} = action
    switch (type) {
        case USER_DETAILS_START:
            return {...state, loading: true, error: null}
        case USER_DETAILS_SUCCESS:
            return {...state, loading: false, userDetails: payload}
        case USER_DETAILS_FAIL:
            return {...state, loading: false, error: payload}
        case USER_DETAILS_RESET:
            return {...state, error: null}
        default:
            return state
    }
}

export {
    userInfo,
    userDetails
}