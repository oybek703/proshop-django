import {
    USER_DELETE_FAIL,
    USER_DELETE_START, USER_DELETE_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_DETAILS_START,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_RESET,
    USER_LOGIN_START,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_RESET,
    USER_REGISTER_START,
    USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET, USER_UPDATE_START, USER_UPDATE_SUCCESS, USERS_LIST_FAIL,
    USERS_LIST_START,
    USERS_LIST_SUCCESS
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

const usersListInitialState = {
    users: [],
    loading: false,
    error: null
}

function usersList(state = usersListInitialState, action) {
    const {type, payload} = action
    switch (type) {
        case USERS_LIST_START:
            return {...state, loading: true, error: null}
        case USERS_LIST_SUCCESS:
            return {...state, loading: false, users: payload}
        case USERS_LIST_FAIL:
            return {...state, loading: false, error: payload}
        default:
            return state
    }
}

const userDeleteInitialState = {
    deleted: null,
    loading: false,
    error: null
}

function userDelete(state = userDeleteInitialState, action) {
    const {type, payload} = action
    switch (type) {
        case USER_DELETE_START:
            return {...state, loading: true, error: null}
        case USER_DELETE_SUCCESS:
            return {...state, loading: false, deleted: payload}
        case USER_DELETE_FAIL:
            return {...state, loading: false, error: payload}
        default:
            return state
    }
}

const userUpdateInitialState = {
    updated: null,
    loading: false,
    error: null
}

function userUpdate(state = userUpdateInitialState, action) {
    const {type, payload} = action
    switch (type) {
        case USER_UPDATE_START:
            return {...state, loading: true, error: null}
        case USER_UPDATE_SUCCESS:
            return {...state, loading: false, updated: payload}
        case USER_UPDATE_FAIL:
            return {...state, loading: false, error: payload}
        case USER_UPDATE_RESET:
            return {...state, loading: false, error: null, updated: null}
        default:
            return state
    }
}

export {
    userInfo,
    userDetails,
    usersList,
    userDelete,
    userUpdate
}