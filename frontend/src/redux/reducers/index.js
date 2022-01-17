import {combineReducers} from 'redux'
import {product, productList} from './productsReducer'
import cart from './cartReducer'
import {userInfo, userDetails} from './userReducer'
import {addOrder, orderDetails, orderPay} from './orderReducer'

const rootReducer = combineReducers({
    productList,
    product,
    cart,
    userInfo,
    userDetails,
    addOrder,
    orderDetails,
    orderPay
})

export default rootReducer