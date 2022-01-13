import {combineReducers} from 'redux'
import {product, productList} from './productsReducer'
import cartItems from './cartReducer'
import {userInfo, userDetails} from './userReducer'

const rootReducer = combineReducers({
    productList,
    product,
    cartItems,
    userInfo,
    userDetails
})

export default rootReducer