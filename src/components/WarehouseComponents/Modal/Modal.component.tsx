import React from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const ModalComponent = ({ modalVisible, setModalVisible, itemName, setItemName, quantity, setQuantity, handleSave, setSelectedItemId }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Item Name:</Text>
          <TextInput
            style={styles.input}
            value={itemName}
            onChangeText={(text) => setItemName(text)}
          />
          <Text style={styles.modalText}>Quantity:</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
            keyboardType="numeric"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={{ width: '84%', alignItems: 'center' }} onPress={() => {
              setModalVisible(!modalVisible);
              setSelectedItemId(null);
            }}>
              <Text style={styles.negativeButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: '84%', alignItems: 'center' }} onPress={handleSave}>
              <Text style={styles.positiveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  modalView: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#0000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
    marginTop: 20,
    marginBottom: 20
  },
  button: {
    marginTop: 20,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
    width: '84%',
    alignItems: 'center'
  },
  negativeButtonText: {
    color: 'grey',
    fontSize: 16,
  },
  positiveButtonText: {
    color: 'green',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    color: 'black'
  },
  buttonContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    width: '100%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'grey'
  },
  startModalText: {
    marginBottom: 15,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: 'grey'
  },
});

export default ModalComponent;