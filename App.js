import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './src/screens/Onboarding/Onboarding';
import SignUp from './src/screens/SignUp/SignUp';
import LogInScreen from './src/screens/LogInScreen/LogInScreen.screen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import Constants from 'expo-constants'
import { Provider } from 'react-redux';
import store from './redux/store';
import { ClerkProvider } from '@clerk/clerk-expo'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WarehouseScreen from './src/screens/WarehouseScreen/WarehouseScreen';
import { Feather } from '@expo/vector-icons'
import OrderScreen from './src/screens/Order/OrderScreen';
import NewOrderScreen from './src/screens/Order/NewOrder/NewOrderScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig.extra.clerkPublishableKey}
    >
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Onboarding'
              component={Onboarding}
              options={{
                title: '',
                headerTransparent: true
              }}
            />
            <Stack.Screen
              name='Main'
              component={MainNavigator}
              options={{ headerShown: false }} />
            <Stack.Screen name='NewOrderScreen'
              component={NewOrderScreen}
              options={{
                title: 'Order',
                headerTransparent: false
              }}
            />
            <Stack.Screen name='SignUp'
              component={SignUp}
              options={{
                title: 'Sign Up',
                headerTransparent: true,
                headerBackVisible: true,
                headerTitleStyle: {
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#0e7817'
                },
                headerBackTitleStyle: {
                  color: '#0e7817'
                },
                headerTintColor: '#0e7817'
              }}
            />
            <Stack.Screen
              name='LogIn'
              component={LogInScreen}
              options={{
                title: 'Sign In',
                headerTransparent: true,
                headerBackVisible: false,
                headerBackVisible: true,
                headerTitleStyle: {
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#0e7817'
                },
                headerBackTitleStyle: {
                  color: '#0e7817'
                },
                headerTintColor: '#0e7817'
              }}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ClerkProvider>

  );
}

const MainNavigator = () => {
  return (
    <Tab.Navigator tabBarOptions={{ activeTintColor: 'black', labelStyle: { fontWeight: 'bold' } }}>
      <Tab.Screen name='Profile' options={{
        tabBarIcon: ({ focused }) => (
          <Feather name={'user'} size={25} color={focused ? '#0e7817' : 'black'} />
        )
      }} component={ProfileScreen}
      />
      <Tab.Screen name='Warehouse' options={{
        tabBarIcon: ({ focused }) => (
          <Feather
            name={'box'}
            size={25}
            color={focused ? '#0e7817' : 'black'}
          />
        )
      }} component={WarehouseScreen} />
      <Tab.Screen name='Order' options={{
        tabBarIcon: ({ focused }) => (
          <Feather name={'shopping-cart'} size={25} color={focused ? '#0e7817' : 'black'} />
        )
      }} component={OrderScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
