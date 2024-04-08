import { createSlice } from '@reduxjs/toolkit'
import db from '../../firbase.config'
import { addDoc, collection, doc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';

  export const addWarehouse = ({ itemName, quantity, createdBy }) => async (dispatch) => {
    try {
        dispatch(addWarehouseStart());
        
        const warehouseCollectionRef = collection(db, 'warehouse');
        const newDocRef = await addDoc(warehouseCollectionRef, {
            itemName,
            quantity,
            createdBy: createdBy,
        });

        dispatch(addWarehouseSuccess({ id: newDocRef.id, itemName, quantity, createdBy }));
    } catch (error) {
        dispatch(addWarehouseFailure(error.message));
    }
  };

  export const fetchWarehouse = () => async (dispatch) => {
    try {
      dispatch(fetchWarehouseStart());
  
      const warehouseList = [];
      const querySnapshot = await getDocs(collection(db, 'warehouse'));
      querySnapshot.forEach((doc) => {
        warehouseList.push({ id: doc.id, ...doc.data() });
      });
  
      dispatch(fetchWarehouseSuccess(warehouseList));
    } catch (error) {
      dispatch(fetchWarehouseFailure(error.message));
    }
  };

  export const deleteWarehouse = ({ id }) => async (dispatch) => {
    try {
      dispatch(deleteWarehouseStart());
  
      await deleteDoc(doc(db, 'warehouse', id));
  
      dispatch(deleteWarehouseSuccess(id));
    } catch (error) {
      dispatch(deleteWarehouseFailure(error.message));
      console.error("Error deleting warehouse:", error);

    }
  };

export const updateWarehouse = ({ id, itemName, quantity }) => async (dispatch) => {
  try {
    dispatch(updateWarehouseStart());

    await updateDoc(doc(db, 'warehouse', id), {
      itemName,
      quantity,
    });
    console.log('success')
    dispatch(updateWarehouseSuccess({ id, itemName, quantity }));
  } catch (error) {
    dispatch(updateWarehouseFailure(error.message));
    console.error("Error updating warehouse:", error);

  }
};
  
  const warehouseSlice = createSlice({
    name: 'warehouse',
    initialState: {
      warehouseList: [],
      loading: false,
      error: null,
    },
    reducers: {
      addWarehouseStart: (state) => {
        state.loading = true;
      },
      addWarehouseSuccess: (state, action) => {
        state.loading = false;
        state.warehouseList.push({ ...action.payload, [action.payload.id]: action.payload });
      },
      addWarehouseFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      fetchWarehouseStart: (state) => {
        state.loading = true;
      },
      fetchWarehouseSuccess: (state, action) => {
        state.loading = false;
        state.warehouseList = action.payload;
      },
      fetchWarehouseFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      deleteWarehouseStart: (state) => {
        state.loading = true;
      },
      deleteWarehouseSuccess: (state, action) => {
        state.loading = false;
        state.warehouseList = state.warehouseList.filter(item => item.id !== action.payload);
      },
      deleteWarehouseFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      updateWarehouseStart: (state) => {
        state.loading = true;
      },
      updateWarehouseSuccess: (state, action) => {
        state.loading = false;
        state.warehouseList = state.warehouseList.map(item => {
          if (item.id === action.payload.id) {
            return { ...action.payload };
          }
          return item;
        });
      },
      updateWarehouseFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    },
  });
  
  export const {
  addWarehouseStart,
  addWarehouseSuccess,
  addWarehouseFailure,
  fetchWarehouseStart,
  fetchWarehouseSuccess,
  fetchWarehouseFailure,
  deleteWarehouseStart,
  deleteWarehouseSuccess,
  deleteWarehouseFailure,
  updateWarehouseStart,
  updateWarehouseSuccess,
  updateWarehouseFailure,
} = warehouseSlice.actions;
export default warehouseSlice.reducer;