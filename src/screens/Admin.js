import React from 'react'
import { Dimensions } from 'react-native'
import { View, Text } from 'react-native'
import {Input,Button,Text as NativeText,Divider} from 'react-native-elements'

const Admin = () => {
    return (
        <View style={{flex:1,flexDirection:'column',justifyContent:'center',marginBottom:155}}>
            
            <View style={{flexDirection:'row',justifyContent:'center'}}>

            <NativeText h4>Admin Login</NativeText>
            </View>
            
            {/* <Header backgroundColor='orange' centerComponent={{ text: 'Admin', style: { color: '#fff' } }} /> */}
            <View style={{margin:25,}} >
              

            <Input 
            placeholder='username'
            // containerStyle={{margin:20}}
            leftIcon={{ type: 'font-awesome', name: 'user' }}
            leftIconContainerStyle={{marginRight:15,}}
            />
   
            <Input 
            placeholder='password'
            // containerStyle={{margin:20}}
            leftIconContainerStyle={{marginRight:5,}}
            leftIcon={{ type: 'font-awesome', name: 'key' }}
            />
            <Button
            title="Login"
            />
            </View>
            
        </View>
    )
}

export default Admin
