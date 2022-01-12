import {combineReducers} from 'redux'
import {product, productList} from './productsReducer'
import cartItems from './cartReducer'
import userInfo from './userReducer'

const rootReducer = combineReducers({
    productList,
    product,
    cartItems,
    userInfo
})

export default rootReducer