import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../reducers/Auth'
import warehouseReducer from './Warehouse'
import orderReducer from './Order'

const rootReducer= combineReducers({
    auth: authReducer,
    warehouse: warehouseReducer,
    order: orderReducer
})

export default rootReducer