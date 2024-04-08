import { createSlice } from "@reduxjs/toolkit";
import db from '../../firbase.config'
import { addDoc, collection, doc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';


export const addOrder = ({ orderDate, supplier, item, quantity, isReceived, receiveDate, createdBy }) => async (dispatch) => {
    try {
        dispatch(addOrderStart())

        const orderCollectionRef = collection(db, 'order')
        const newDocRef = await addDoc(orderCollectionRef, {
            orderDate,
            supplier,
            item,
            quantity,
            isReceived,
            receiveDate,
            createdBy
        })

        dispatch(addOrderSuccess({ id: newDocRef.id, orderDate, supplier, item, quantity, isReceived, receiveDate, createdBy }))
        console.log('Success')
    } catch (error) {
        dispatch(addOrderError(error.message));
        console.log('Error')
    }
}

export const fetchOrder = () => async (dispatch) => {
    try {
        dispatch(fetchOrderStart());

        const orderList = [];
        const querySnapshot = await getDocs(collection(db, 'order'));
        querySnapshot.forEach((doc) => {
            orderList.push({ id: doc.id, ...doc.data() });
        });

        dispatch(fetchOrderSuccess(orderList));
    } catch (error) {
        dispatch(fetchOrderFailure(error.message));
    }
};

export const deleteOrder = ({ id }) => async (dispatch) => {
    try {
        dispatch(deleteOrderStart());

        await deleteDoc(doc(db, 'order', id));

        dispatch(deleteOrderSuccess(id));
    } catch (error) {
        dispatch(deleteOrderFailure(error.message));
        console.error("Error deleting order:", error);
    }
};

export const updateOrder = ({ id, orderDate,
    supplier,
    item,
    quantity,
    isReceived,
    receiveDate,
    createdBy }) => async (dispatch) => {
        try {
            dispatch(updateOrderStart());

            await updateDoc(doc(db, 'order', id), {
                orderDate,
                supplier,
                item,
                quantity,
                isReceived,
                receiveDate,
                createdBy
            });
            console.log('success')
            dispatch(updateOrderSuccess({
                id, orderDate,
                supplier,
                item,
                quantity,
                isReceived,
                receiveDate,
                createdBy
            }));
        } catch (error) {
            dispatch(updateOrderFailure(error.message));
            console.error("Error updating warehouse:", error);

        }
    };

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderList: [],
        loading: false,
        error: null
    },
    reducers: {
        addOrderStart: (state) => {
            state.loading = true
        },
        addOrderSuccess: (state, action) => {
            state.loading = false
            state.orderList.push({ ...action.payload, [action.payload.id]: action.payload })
        },
        addOrderError: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        fetchOrderStart: (state) => {
            state.loading = true;
        },
        fetchOrderSuccess: (state, action) => {
            state.loading = false;
            state.orderList = action.payload;
        },
        fetchOrderFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteOrderStart: (state) => {
            state.loading = true;
        },
        deleteOrderSuccess: (state, action) => {
            state.loading = false;
            state.orderList = state.orderList.filter(item => item.id !== action.payload);
        },
        deleteOrderFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateOrderStart: (state) => {
            state.loading = true;
        },
        updateOrderSuccess: (state, action) => {
            state.loading = false;
            state.orderList = state.orderList.map(item => {
                if (item.id === action.payload.id) {
                    return { ...action.payload };
                }
                return item;
            });
        },
        updateOrderFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const {
    addOrderStart,
    addOrderSuccess,
    addOrderError,
    fetchOrderStart,
    fetchOrderSuccess,
    fetchOrderFailure,
    deleteOrderStart,
    deleteOrderSuccess,
    deleteOrderFailure,
    updateOrderStart,
    updateOrderSuccess,
    updateOrderFailure,
} = orderSlice.actions
export default orderSlice.reducer