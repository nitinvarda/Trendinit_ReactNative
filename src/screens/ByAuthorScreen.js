import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import { Card, Divider } from 'react-native-elements'
import server from '../api/Trendinit';

const ByAuthorScreen = ({ navigation }) => {
    const Name = navigation.getParam('name')
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        server.get('/by/' + Name)
            .then(res => {
                setPosts(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })

    }, [Name])

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 200 }} />
    }
    else {

        return (
            <View>
                <FlatList
                    ListHeaderComponent={
                        <View>

                            <Text style={styles.nameHeader}>By : {Name}</Text>
                            <Divider />
                        </View>
                    }
                    data={posts}
                    keyExtractor={(post) => post._id}
                    renderItem={({ item }) => {
                        return (
                            <View >
                                <TouchableOpacity onPress={() => navigation.navigate('Post', { id: item._id })}>
                                    <Card>

                                        <Card.Image source={{ uri: `https://trendinit.herokuapp.com/image/${item.imagename}` }} />
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
