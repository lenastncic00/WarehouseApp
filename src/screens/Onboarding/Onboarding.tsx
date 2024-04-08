import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'

const Onboarding = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        <Text style={{ color: '#000' }}>Compfy</Text>
        <Text style={{ color: '#28bd2a' }}>Resources</Text>
      </Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#28bd2a' }]}
      onPress={() => {
        navigation.navigate('LogIn' as never)
      }}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#67e04f' }]}
      onPress={() => {
        navigation.navigate('SignUp' as never)
      }}>
        <Text style={styles.buttonText}>Sign up</Text>
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
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 100,
  },
  button: {
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 4
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },
});

export default Onboarding;