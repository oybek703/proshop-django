import {combineReducers} from 'redux'
import {product, productList} from './productsReducer'
import cart from './cartReducer'
import {userInfo, userDetails, usersList, userDelete, userUpdate} from './userReducer'
import {addOrder, orderDetails, orderPay, userOrders} from './orderReducer'

const rootReducer = combineReducers({
    productList,
    product,
    cart,
    userInfo,
    userDetails,
    addOrder,
    orderDetails,
    userOrders,
    orderPay,
    usersList,
    userDelete,
    userUpdate
})

export default rootReducer