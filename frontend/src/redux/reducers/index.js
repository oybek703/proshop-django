import {combineReducers} from 'redux'
import {product, productList} from './productsReducer'
import cart from './cartReducer'
import {userInfo, userDetails} from './userReducer'

const rootReducer = combineReducers({
    productList,
    product,
    cart,
    userInfo,
    userDetails
})

export default rootReducer