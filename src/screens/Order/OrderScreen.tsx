import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchComponent from '../../components/WarehouseComponents/Search/Search.component'
import { Ionicons } from '@expo/vector-icons'
import ModalComponent from '../../components/WarehouseComponents/Modal/Modal.component'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import FlatListComponent from '../../components/OrderComponents/FlatList/FlatList.component';
import { useNavigation } from '@react-navigation/native'


const OrderScreen = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const warehouseList = useSelector((state: RootState) => state.warehouse.warehouseList);
	const navigation = useNavigation();

  return (
  <View style={styles.container}>
    <SearchComponent searchText={searchText} setSearchText={setSearchText} />
    <FlatListComponent
      searchText={searchText}
    />
    <TouchableOpacity style={styles.plusButton} onPress={() => navigation.navigate('NewOrderScreen' as never)}>
      <Ionicons name="add-circle" size={50} color={'#0e7817'} />
    </TouchableOpacity>
  </View>
  )
}

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

export default OrderScreen