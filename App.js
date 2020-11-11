import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './src/screens/HomeScreen';
import PostScreen from './src/screens/PostScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import ByAuthorScreen from './src/screens/ByAuthorScreen';

const navigator = createStackNavigator({
  Home: HomeScreen,
  Post: PostScreen,
  Category: CategoryScreen,
  ByAuthor: ByAuthorScreen
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    title: 'Trendinit'
  }
})

export default createAppContainer(navigator)
