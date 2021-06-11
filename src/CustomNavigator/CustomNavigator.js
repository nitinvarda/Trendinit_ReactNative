import React from 'react'

import {createStackNavigator} from '@react-navigation/stack'
import PostScreen from '../screens/PostScreen'
import HomeScreen from '../screens/HomeScreen'
import Admin from '../screens/Admin'
import CategoryListScreen from '../screens/CategoryListScreen'
import CategoryScreen from '../screens/CategoryScreen'
import ByAuthorScreen from '../screens/ByAuthorScreen'


const Stack = createStackNavigator()
const HomeScreenNavigator =()=> {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name='Home' component={HomeScreen}  />
            <Stack.Screen name='ByAuthor' component={ByAuthorScreen} />
            <Stack.Screen name='Post' component={PostScreen} />
            
        </Stack.Navigator>
    )
}


const CategoryScreenNavigator = ()=>{

    return(
        <Stack.Navigator initialRouteName='Categories'>
            <Stack.Screen name='Categories' component={CategoryListScreen} options={{headerShown:false}}  />
            <Stack.Screen name='CategoryScreen' options={({route})=>({title:route.params.category})} component={CategoryScreen} />

            <Stack.Screen name='Post' component={PostScreen} options={{headerShown:false}} />
            
        </Stack.Navigator>

    )
}


// const AdminScreenNavigator = ()=>{
//     return(
//         <Stack.Navigator
//         screenOptions={{
//             headerShown: false
//           }}>
//         <Stack.Screen name='Admin' component={Admin}   />

//         <Stack.Screen name='Post' component={PostScreen} />
        
//     </Stack.Navigator>

//     )
// }

export {HomeScreenNavigator,CategoryScreenNavigator}
