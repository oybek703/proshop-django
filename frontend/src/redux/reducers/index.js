import {combineReducers} from 'redux'
import {product, productList} from './productsReducer'
import cart from './cartReducer'
import {userInfo, userDetails} from './userReducer'
import addOrder from './orderReducer'

const rootReducer = combineReducers({
    productList,
    product,
    cart,
    userInfo,
    userDetails,
    addOrder
})

export default rootReducer