import {combineReducers} from 'redux'
import {product, productList} from './productsReducer'
import cartItems from './cartReducer'

const rootReducer = combineReducers({
    productList,
    product,
    cartItems
})

export default rootReducer