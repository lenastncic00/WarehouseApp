import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { fetchOrder, deleteOrder, updateOrder } from '../../../../redux/reducers/Order';
import { useNavigation } from '@react-navigation/native';

const FlatListComponent = ({searchText}) => {
  const dispatch = useDispatch();
  const orderList = useSelector((state: RootState) => state.order.orderList);
  const navigation = useNavigation();

  const filteredList = orderList.filter(
    item => item.item.itemName.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchOrder());
  }, []);

  const handleDelete = (id) => {
    console.log(id)
    dispatch(deleteOrder({ id }));
  };

  const handleEdit = (id, item) => {
    navigation.navigate('NewOrderScreen', { id, preFilledData: item});
  };

  return (
    <FlatList style={styles.flatList} data={filteredList} keyExtractor={(item) => item.id} renderItem={({ item }) => (
      <View style={styles.item}>
        <Ionicons style={{ position: 'relative', marginEnd: 12 }}
          name={item.isReceived ? "checkmark-circle" : "hourglass-outline"} size={20}
          color={item.isReceived ? "green" : "grey"} />

        <View style={styles.itemInfo}>
          <Text style={styles.label}>Order date: <Text style={{ fontWeight: 'bold' }}>{item.orderDate}</Text></Text>
          <Text style={styles.label}>Ordered: <Text style={{ fontWeight: 'bold' }}>{item.item.itemName} | {item.quantity}</Text></Text>
        </View>
        <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handleEdit(item.id, item)}>
            <Ionicons name="create" size={20} color="green" style={{ padding: 4 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={() => handleDelete(item.id)}>
            <Ionicons name="trash-outline" size={20} color="#cc0000" style={{ padding: 4 }} />
          </TouchableOpacity>
        </View>
      </View>
    )}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    width: '92%',
  },
  flatListContent: {
    paddingHorizontal: 16,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  itemInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666666',
  },
  endLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666666',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
});

export default FlatListComponent;