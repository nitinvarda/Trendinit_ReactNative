import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator,TouchableWithoutFeedback } from 'react-native'
import { Card, Divider,Image } from 'react-native-elements'
import server from '../api/Trendinit';

import firebase from '../trendinitServices/index'

const CategoryScreen = ({ route,navigation }) => {
    const category = route.params.category
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getCategory()
    }, [category])


    const getCategory = async()=>{
        try {
            const categoryArticles = await firebase.articles.search({keyword:[['category','==',`${category}`]]})
            setPosts(categoryArticles)
            setLoading(false)
        } catch (error) {
            
        }
    }
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 200 }} />

    }
    else {
        return (
          

                <FlatList
                   
                    style={{marginBottom:20}}
                    data={posts}
                    keyExtractor={(post) => post._id}
                    renderItem={({ item }) => {
                        return (
                          
                                <TouchableWithoutFeedback onPress={() => navigation.navigate('Post', { id: item.id })}>
                                    <Card containerStyle={{borderRadius:20}}>
                                        {/* <Card.Title>HELLO WORLD</Card.Title>
                                                    <Card.Divider /> */}
                                                    <Image PlaceholderContent={<ActivityIndicator />} source={{ uri: `${item.image}` }} style={{borderRadius:20, width: '100%', height: 200 }} />
                                        {/* <Card.Image source={{ uri: `https://trendinit.herokuapp.com/image/${item.imagename}` }} height={'100%'} /> */}
                                        <Text style={{padding:15,fontSize:16}}>
                                            {item.title}
                                        </Text>
                                    </Card>
                                    {/* <Image style={styles.oldImage} source={{ uri: `https://trendinit.herokuapp.com/image/${item.imagename}` }} />
                                                <Text style={styles.oldTitle}>{item.title}</Text> */}
                                </TouchableWithoutFeedback>
                       
                        )
                    }}
                />
           
        )
    }
}

// CategoryScreen.navigationOptions = ({ navigation }) => {
//     console.log(navigation)
//     return {
//         title: 'Category: ' + navigation.getParam('category')
//     }
// }

export default CategoryScreen

const styles = StyleSheet.create({
    catHeader: {
        textAlign: 'center',
        fontSize: 18,
        margin: 10
    }
})
