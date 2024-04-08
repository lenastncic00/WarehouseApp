import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Platform, StatusBar, Button, KeyboardAvoidingView, ScrollView, Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import ItemListDialog from '../../../components/OrderComponents/ItemList/ItemListDialog';
import { RootState } from '../../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder, updateOrder } from '../../../../redux/reducers/Order';
import { useRoute, useNavigation } from '@react-navigation/native';

const NewOrderScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id: orderId, preFilledData } = route.params || {};


  const [itemsDialogVisible, setItemsDialogVisible] = useState(false);
  const [receiveDateString, setrReceiveDateString] = useState('');
  const [show, setShow] = useState(false);
  const [orderDate, setOrderDate] = useState(new Date())
  const [supplier, setSupplier] = useState('');
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isRecieved, setIsRecieved] = useState(false)
  const [receiveDate, setReceiveDate] = useState(new Date());
  const [selectedItemName, setSelectedItemName] = useState('');
  const warehouseList = useSelector((state: RootState) => state.warehouse.warehouseList);
  const userInfo = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setReceiveDate(selectedDate);
    setrReceiveDateString(parseDateToString(currentDate));
  };

  const parseDateToString = (date: Date) => {
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  }

  const showDatepicker = () => {
    setShow(true);
  };

  const handleItemSelection = (itemId, itemName) => {
    setSelectedItemId(itemId);
    setSelectedItemName(itemName);
    const selectedItem = warehouseList.find(item => item.id === itemId);
    setItem(selectedItem);
  }

  useEffect(() => {
    if (preFilledData) {
      setOrderDate(orderDate);
      setSupplier(preFilledData.supplier);
      setItem(preFilledData.item)
      setSelectedItemId(preFilledData.item.id ?? '');
      setSelectedItemName(preFilledData.item.itemName);
      setQuantity(preFilledData.quantity);
      setChecked(preFilledData.isReceived);
      if (preFilledData.receiveDate) {
        const dateParts = preFilledData.receiveDate.split('/');
        if (dateParts.length === 3) {
          const parsedDate = new Date(parseInt(dateParts[2]), parseInt(dateParts[1]) - 1, parseInt(dateParts[0]));
          setReceiveDate(parsedDate);
          setrReceiveDateString(parseDateToString(parsedDate));
        }
      }
    }
  }, [preFilledData]);


  const handleSave = () => {
    const data = {
      orderDate: parseDateToString(orderDate),
      supplier,
      item,
      quantity,
      isReceived: isChecked,
      receiveDate: parseDateToString(receiveDate),
      createdBy: userInfo.emailAddress
    };

    if (orderId) {
      dispatch(updateOrder({ id: orderId, ...data }));
    } else {
      dispatch(addOrder(data));
    }

    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <ItemListDialog
          modalVisible={itemsDialogVisible}
          setModalVisible={setItemsDialogVisible}
          onSaveClicked={handleItemSelection}
        />
        <View style={styles.rowContainer}>
          <Text style={styles.modalText}>Order date</Text>
          <TextInput
            style={styles.disabledInput}
            value={parseDateToString(orderDate)}
            editable={false}
            selectTextOnFocus={false}
            cursorColor={'green'}
            onChangeText={(text) => setOrderDate(orderDate)}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.modalText}>Suppplier</Text>
          <TextInput
            value={supplier}
            cursorColor={'green'}
            style={styles.input}
            onChangeText={(text) => setSupplier(text)}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.modalText}>Item</Text>
          <TouchableOpacity onPress={() => setItemsDialogVisible(true)} style={{ flex: 1 }}>
            <Text style={styles.input}>{selectedItemName || 'Tap to choose...'}</Text>
          </TouchableOpacity>
          <Ionicons
            style={{ position: 'absolute', alignSelf: 'center', right: 0, marginEnd: 8 }}
            name='chevron-down'
            color='grey'
            size={14}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.modalText}>Quantity</Text>
          <TextInput
            value={quantity}
            style={styles.input}
            onChangeText={(qunatity) => setQuantity(qunatity)}
            keyboardType="numeric"
            cursorColor={'green'}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.modalText}>Received</Text>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={'green'}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.modalText}>Receive date</Text>
          <TouchableOpacity onPress={isChecked ? showDatepicker : undefined} style={{ flex: 1 }}>
            <TextInput
              pointerEvents="none"
              placeholder='Tap to choose...'
              style={isChecked ? styles.input : styles.disabledInput}
              value={isChecked ? receiveDateString : "Not received"}
              editable={false}
            />
          </TouchableOpacity>

        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={receiveDate}
            mode='date'
            is24Hour={true}
            onChange={onChange}
            timeZoneOffsetInMinutes={new Date().getTimezoneOffset()}
          />)}

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
    marginBottom: 32,
    minHeight: '100%',
    flex: 1,
    flexDirection: 'column'
  },
  rowContainer: {
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    marginTop: 24,
    alignSelf: 'center',
    backgroundColor: 'green',
    height: 40,
    alignItems: 'center',
    width: '50%',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  input: {
    flex: 1,
    borderColor: 'grey',
    borderWidth: 0.8,
    paddingHorizontal: 10,
    paddingVertical: 2,
    color: 'black'
  },
  disabledInput: {
    flex: 1,
    borderWidth: 0.8,
    paddingHorizontal: 10,
    paddingVertical: 2,
    color: 'grey',
    borderColor: '#E0E0E0'
  },
  modalText: {
    marginEnd: 8,
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'grey',
    width: '25%'
  },
  checkBoxStyle: {
    width: 'auto'
  },
  bottomSheetContainer: {
    height: 110,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
});

export default NewOrderScreen;