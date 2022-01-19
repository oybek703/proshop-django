import {combineReducers} from 'redux'
import {createProduct, deleteProduct, product, productList, updateProduct} from './productsReducer'
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
    userUpdate,
    updateProduct,
    createProduct,
    deleteProduct
})

export default rootReducer