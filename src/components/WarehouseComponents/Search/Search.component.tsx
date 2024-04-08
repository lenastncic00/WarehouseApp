import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const SearchComponent = ({ searchText, setSearchText }) => {
  return (
    <TextInput
      style={styles.searchInput}
      placeholder="Search by item name..."
      onChangeText={text => setSearchText(text)}
      value={searchText}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    width: '90%',
    height: 40,
    borderColor: '#0e7817',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});

export default SearchComponent;