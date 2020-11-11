import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Card, Divider } from 'react-native-elements'
import server from '../api/Trendinit';

const CategoryScreen = ({ navigation }) => {
    const Category = navigation.getParam('category')
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        server.get('/cat/' + Category)
            .then(res => {
                setPosts(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }, [Category])
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 200 }} />

    }
    else {
        return (
            <View>

                <FlatList
                    ListHeaderComponent={
                        <View>

                            {/* <Text style={styles.catHeader}>Category : {Category}</Text>
                            <Divider /> */}
                        </View>
                    }
                    data={posts}
                    keyExtractor={(post) => post._id}
                    renderItem={({ item }) => {
                        return (
                            <View >
                                <TouchableOpacity onPress={() => navigation.navigate('Post', { id: item._id })}>
                                    <Card>
                                        {/* <Card.Title>HELLO WORLD</Card.Title>
                                                    <Card.Divider /> */}
                                        <Card.Image source={{ uri: `https://trendinit.herokuapp.com/image/${item.imagename}` }} />
                                        <Text style={styles.oldTitle}>
                                            {item.title}
                                        </Text>
                                    </Card>
                                    {/* <Image style={styles.oldImage} source={{ uri: `https://trendinit.herokuapp.com/image/${item.imagename}` }} />
                                                <Text style={styles.oldTitle}>{item.title}</Text> */}
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }
}

CategoryScreen.navigationOptions = ({ navigation }) => {
    return {
        title: 'Category: ' + navigation.getParam('category')
    }
}

export default CategoryScreen

const styles = StyleSheet.create({
    catHeader: {
        textAlign: 'center',
        fontSize: 18,
        margin: 10
    }
})
