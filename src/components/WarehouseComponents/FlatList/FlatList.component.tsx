import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { useState } from 'react';

const FlatListComponent = ({ warehouseList, handleUpdate, handleDelete, searchText, isPreview, onItemSelected = undefined, initialSelectedItemId = null, initialSelectedItemName = null }) => {

  const filteredList = warehouseList.filter(
    item => item.itemName.toLowerCase().includes(searchText.toLowerCase())
  );

  const [selectedItemId, setSelectedItemId] = useState(initialSelectedItemId);
  const [selectedItemName, setSelectedItemName] = useState(initialSelectedItemName);

  const handleRadioButtonPress = (itemId: string, itemName: string) => {
    setSelectedItemId(itemId === selectedItemId ? null : itemId);
    setSelectedItemName(itemName === selectedItemName ? null : itemName);
    onItemSelected(itemId, itemName);
  };

  return (
    <FlatList
      style={styles.flatList}
      data={filteredList}

      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.itemInfo}>
            <Text style={styles.label}>Item: <Text style={styles.itemText}>{item.itemName}</Text> </Text>
            <Text style={styles.label}>Quantity: <Text style={styles.itemText}>{item.quantity}</Text></Text>
          </View>
          {isPreview ?
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => handleUpdate(item.id, item.itemName, item.quantity)}>
                <Ionicons name="create" size={20} color="green" style={{ padding: 4 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ padding: 4 }}>
                <Ionicons name="trash-outline" size={20} color="red" />
              </TouchableOpacity>
            </View> :
            <View style={styles.iconContainer}>
              <RadioButton.Android 
                value={item.id}
                status={selectedItemId === item.id ? 'checked' : 'unchecked'}
                onPress={() => handleRadioButtonPress(item.id, item.itemName)}
                color='green'
                uncheckedColor='green'
              />
            </View>}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  itemInfo: {
    flexDirection: 'column',
  },
  label: {
    marginBottom: 5,
    color: '#666666'
  },
  itemText: {
    flex: 1,
    fontSize: 14,
    color: '#666666',
    fontWeight: 'bold'
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default FlatListComponent;