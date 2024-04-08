import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import FlatListComponent from '../../WarehouseComponents/FlatList/FlatList.component';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { fetchWarehouse } from '../../../../redux/reducers/Warehouse';

const ItemListDialog = ({ modalVisible, setModalVisible, onSaveClicked }) => {
    const warehouseList = useSelector((state: RootState) => state.warehouse.warehouseList);
    const dispatch = useDispatch();
    const [selectedItemName, setSelectedItemName] = useState('');
    const [selectedItemId, setSelectedItemId] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        dispatch(fetchWarehouse());
    }, []);

    const onItemSelected = (itemId, itemName) => {
        setSelectedItemId(itemId);
        setSelectedItemName(itemName);
    };

    const save = (itemId: string, itemNaziv: string) => {
        onSaveClicked(itemId, itemNaziv)
        setModalVisible(false);
    }

    const handleUpdate = (id, itemName, quantity) => {
        setModalVisible(true);
        setSelectedItemId(id);
        setSelectedItemName(itemName);
        setQuantity(quantity);
    };

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
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'grey', marginBottom: 12 }}>Choose item:</Text>
                    <FlatListComponent
                        isPreview={false}
                        warehouseList={warehouseList}
                        handleUpdate={handleUpdate}
                        handleDelete={() => console.log("delete")}
                        searchText={""}
                        onItemSelected={onItemSelected}
                        initialSelectedItemId={selectedItemId}
                        initialSelectedItemName={selectedItemName}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={{ width: '84%', alignItems: 'center' }} onPress={() => {
                            setModalVisible(!modalVisible);
                        }}>
                            <Text style={styles.negativeButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '84%', alignItems: 'center' }} onPress={() => save(selectedItemId, selectedItemName)}>
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
        height: '80%',
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
        fontWeight: 'bold'
    },
    positiveButtonText: {
        color: 'green',
        fontSize: 16,
        fontWeight: 'bold'
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
        flexDirection: 'row',
        justifyContent: 'space-around',
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

export default ItemListDialog;