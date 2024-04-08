import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addWarehouse, fetchWarehouse, deleteWarehouse, updateWarehouse } from '../../../redux/reducers/Warehouse';
import { Ionicons } from '@expo/vector-icons';
import { RootState } from '../../../redux/store';
import SearchComponent from '../../components/WarehouseComponents/Search/Search.component';
import ModalComponent from '../../components/WarehouseComponents/Modal/Modal.component';
import FlatListComponent from '../../components/WarehouseComponents/FlatList/FlatList.component';

const WarehouseScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const warehouseList = useSelector((state: RootState) => state.warehouse.warehouseList);
  const userInfo = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchWarehouse());
  }, []);

  const handleSave = () => {
    if (selectedItemId) {
      dispatch(updateWarehouse({ id: selectedItemId, itemName, quantity }));
    } else {
      dispatch(addWarehouse({ itemName, quantity, createdBy: userInfo.emailAddress}));
    }
    setModalVisible(false);
    setSelectedItemId(null);
  };

  const handleDelete = (id) => {
    console.log(id)
    dispatch(deleteWarehouse({ id }));
  };

  const handleUpdate = (id, itemName, quantity) => {
    setModalVisible(true);
    setSelectedItemId(id);
    setItemName(itemName);
    setQuantity(quantity);
  };

  const openDialogInAddingMode = () => {
    setItemName('');
    setQuantity('');
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <SearchComponent searchText={searchText} setSearchText={setSearchText} />
      <ModalComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        itemName={itemName}
        setItemName={setItemName}
        quantity={quantity}
        setQuantity={setQuantity}
        handleSave={handleSave}
        setSelectedItemId={setSelectedItemId}
      />
      <FlatListComponent
        isPreview={true}
        warehouseList={warehouseList}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        searchText={searchText}
      />
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => openDialogInAddingMode()}
      >
        <Ionicons name="add-circle" size={50} color={'#0e7817'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButton: {
    position: 'absolute',
    bottom: 20,
    right: 20
  },
});

export default WarehouseScreen;