import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './src/screens/HomeScreen';
import PostScreen from './src/screens/PostScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import ByAuthorScreen from './src/screens/ByAuthorScreen';
import CategoryListScreen from './src/screens/CategoryListScreen'
import Admin from './src/screens/Admin'
import {Icon} from 'react-native-elements'

// const navigator = createStackNavigator({
//   Home: HomeScreen,
//   Post: PostScreen,
//   Category: CategoryScreen,
//   ByAuthor: ByAuthorScreen
// }, {
//   initialRouteName: 'Home',
//   defaultNavigationOptions: {
//     title: 'Trendinit'
//   }
// })

// export default createAppContainer(navigator)

const Tab = createBottomTabNavigator();

export default function App(){
  return(
    
    <NavigationContainer>
       
      <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#621FF7',
          },
          headerTintColor: '#fff',
          headerTitleStyle :{
            fontWeight: 'bold',
          },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          // switch(route.name){
          //   case 'Home':
          //       iconName = 'home'
          //   case 'Category':
          //      iconName = 'list'
          //   case 'Admin' : 
          //      iconName='login'
          // }
          // console.log(route.name)
          if (route.name === 'Home') {
            iconName = 'home'
          } else if (route.name === 'Category') {
            iconName = 'list';
          }
          else if(route.name==='Admin'){
         
            iconName = 'face'
          }

          // You can return any component that you like here!
          return <Icon type='material' name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
        <Tab.Screen name='Home'  component={HomeScreen}  options={{
          tabBarLabel: ({ focused, color }) => {
            return (
              <Text style={{color:'black'}} >Home</Text>
            )
          }
        }}  />
        <Tab.Screen name='Category' component={CategoryListScreen} 
         options={{
          tabBarLabel: ({ focused, color }) => {
            return (
              <Text style={{color:'black'}} >Categories</Text>
            )
          }
        }} />
        <Tab.Screen name='Admin' component={Admin}
         options={{
          tabBarLabel: ({ focused, color }) => {
            return (
              <Text style={{color:'black'}} >Admin</Text>
            )
          }
        }}
        />
      </Tab.Navigator>
     
    </NavigationContainer>
   
  )
}

