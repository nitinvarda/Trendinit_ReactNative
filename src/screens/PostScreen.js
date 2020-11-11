import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import server from '../api/Trendinit'

import HTML from 'react-native-render-html';



const PostScreen = ({ navigation }) => {
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(false)
    const id = navigation.getParam('id')

    useEffect(() => {
        setLoading(true)
        server.get(`/article/${id}`).then(res => {
            setPost(res.data)
            setLoading(false)
        })
            .catch(err => {
                console.log(err)
            })
    }, [id])

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 200 }} />
    }
    else {


        return (
            <ScrollView>
                <Image style={styles.postImage} source={{ uri: `https://trendinit.herokuapp.com/image/${post.imagename}` }} />
                <Text style={styles.postTitle}>{post.title}</Text>
                <View style={styles.info}>
                    <TouchableOpacity onPress={() => navigation.navigate('ByAuthor', { name: post.by })}>
                        <Text style={{ color: 'blue' }} >By: {post.by}</Text>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Category', { category: post.category })}>
                        <Text style={{ color: 'blue' }}>Category: {post.category}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.desc}><HTML html={"<div>" + post.desc + "</div>"} /></View>

            </ScrollView>
        )
    }
}

export default PostScreen

const styles = StyleSheet.create({
    postImage: {
        width: '100%',
        height: 250
    },
    postTitle: {
        textAlign: 'center',
        fontSize: 22,
        marginBottom: 10
    },
    desc: {
        borderTopWidth: 1,
        borderColor: 'black',
        marginHorizontal: 10,
        fontSize: 18
    },
    info: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginHorizontal: 10
    }
})
