import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack'
import {HomeScreenNavigator,CategoryScreenNavigator} from './src/CustomNavigator/CustomNavigator'
import {Icon} from 'react-native-elements'

import {REACT_APP_API_KEY} from 'dotenv'
console.log(REACT_APP_API_KEY)

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
    
      screenOptions={({ route}) => ({
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
          if (route.name === 'HomeTab') {
            iconName = 'home'
          } else if (route.name === 'CategoryTab') {
            iconName = 'list';
          }
          else if(route.name==='AdminTab'){
         
            iconName = 'face'
          }

          // You can return any component that you like here!
          return <Icon type='material' name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        style:{
        
          backgroundColor:'#282c34',

        },
        activeTintColor: '#ff6600',
        inactiveTintColor: 'white',
      }}
      
      
      >
        <Tab.Screen name='HomeTab'  component={HomeScreenNavigator}  options={{
          tabBarLabel: ({ focused, color }) => {
            return (
              <Text style={{color:focused? '#ff6600' : 'white'}} >Home</Text>
            )
          }
        }}  />
        <Tab.Screen name='CategoryTab' component={CategoryScreenNavigator} 
         options={{
          tabBarLabel: ({ focused, color }) => {
            return (
              <Text style={{color:focused? '#ff6600' : 'white'}} >Categories</Text>
            )
          }
        }} />
        
      </Tab.Navigator>
     
    </NavigationContainer>
   
  )
}

