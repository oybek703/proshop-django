import {combineReducers} from 'redux'
import {
    createProduct,
    createReview,
    deleteProduct,
    product,
    productList,
    topProducts,
    updateProduct
} from './productsReducer'
import cart from './cartReducer'
import {userInfo, userDetails, usersList, userDelete, userUpdate} from './userReducer'
import {addOrder, allOrders, orderDeliver, orderDetails, orderPay, userOrders} from './orderReducer'

const rootReducer = combineReducers({
    productList,
    topProducts,
    product,
    cart,
    userInfo,
    userDetails,
    addOrder,
    orderDetails,
    userOrders,
    orderPay,
    orderDeliver,
    allOrders,
    usersList,
    userDelete,
    userUpdate,
    updateProduct,
    createProduct,
    deleteProduct,
    createReview
})

export default rootReducer