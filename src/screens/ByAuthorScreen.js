import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import { Card, Divider } from 'react-native-elements'
import server from '../api/Trendinit';

import firebase from '../trendinitServices/index'

const ByAuthorScreen = ({ route,navigation }) => {
    const name = route.params.name
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getArticlesByAuthor()

    }, [name])

    const getArticlesByAuthor = async()=>{
        try {
            const authorArticles = await firebase.articles.search({keyword:[["by","==",`${name}`]]})
            setPosts(authorArticles)
            setLoading(false)
            
        } catch (error) {
            
        }
    }

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 200 }} />
    }
    else {

        return (
            <View>
                <FlatList
                    ListHeaderComponent={
                        <View>

                            <Text style={styles.nameHeader}>By : {name}</Text>
                            <Divider />
                        </View>
                    }
                    data={posts}
                    keyExtractor={(post) => post.id}
                    renderItem={({ item }) => {
                        return (
                            <View >
                                <TouchableOpacity onPress={() => navigation.navigate('Post', { id: item.id })}>
                                    <Card>

                                        <Card.Image source={{ uri: `${item.image}` }} />
                                        <Text style={styles.oldTitle}>
                                            {item.title}
                                        </Text>
                                    </Card>

                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }
}

export default ByAuthorScreen

const styles = StyleSheet.create({
    nameHeader: {
        textAlign: 'center',
        fontSize: 18,
        margin: 10
    }
})
