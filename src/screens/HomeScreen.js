import React, { useState, useEffect } from 'react'
import { SafeAreaView,StatusBar, StyleSheet, Text,Dimensions, View, FlatList, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import server from '../api/Trendinit'
import { Card, Divider,Tile} from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        server.get('/home').then(res => {
            setPosts(res.data.articles)
            setLoading(false)

        }).catch(err => {
            console.log(err)
        })


    }, [])
    const top = posts.slice(0, 3)
    const old = posts.slice(3)


    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 200 }} />
    }
    else {
        return (
          
            <View >
                <StatusBar  />

                <FlatList

                    keyExtractor={(post) => post._id}
                    data={top}
                    renderItem={({ item }) => {

                        return (

                            <TouchableOpacity onPress={() => navigation.navigate('Post', { id: item._id })}>
                                <Tile
                        activeOpacity={0.5}
                        imageSrc={{ uri: `https://trendinit.herokuapp.com/image/${item.imagename}` }}
                        title={item.title}
                        titleStyle={{marginTop:170,fontSize:18}}
                        height={(windowHeight/3)-16}
                        featured
                        overlayContainerStyle={{backgroundColor:'rgba(0,0,0,0.5)'}}
                        

                    />
                                {/* <Image style={styles.image} source={{ uri: `https://trendinit.herokuapp.com/image/${item.imagename}` }} />

                                <View style={styles.tint}><Text style={styles.title} >{item.title}</Text></View> */}
                            </TouchableOpacity>


                        )
                    }}
                    ListFooterComponent={
                        <>

                            <FlatList
                                ListHeaderComponent={
                                    <>
                                        {/* <Text style={styles.oldHeading}>Old Posts</Text> */}
                                        <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 10 }}>Categories</Text>
                                        <Divider />
                                        <ScrollView horizontal style={{ marginTop: 10 }} showsHorizontalScrollIndicator={false}>
                                            <TouchableOpacity onPress={() => navigation.navigate('Category', { category: 'Sports' })} >
                                                <Text style={styles.cat}>Sports</Text>

                                            </TouchableOpacity >
                                            <TouchableOpacity onPress={() => navigation.navigate('Category', { category: 'Politics' })}>
                                                <Text style={styles.cat}>Politics</Text>

                                            </TouchableOpacity >
                                            <TouchableOpacity onPress={() => navigation.navigate('Category', { category: 'Technology' })}>

                                                <Text style={styles.cat}>Technology</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => navigation.navigate('Category', { category: 'Entertainment' })}>

                                                <Text style={styles.cat}>Entertainment</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => navigation.navigate('Category', { category: 'International' })}>

                                                <Text style={styles.cat}>International</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => navigation.navigate('Category', { category: 'Others' })}>

                                                <Text style={styles.cat}>Others</Text>
                                            </TouchableOpacity>



                                        </ScrollView>

                                    </>
                                }
                                data={old}
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
                        </>
                    }
                />




            </View>
          
        )
    }
}
HomeScreen.navigationOptions = () => {
    return {
        title: 'TRENDINIT',


    }
}

export default HomeScreen

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 235
    },
    header: {
        height: 50,


    },
    cat: {
        padding: 10
    },
    tint: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: '100%',
        color: 'white',
        top: 0,
        bottom: 0,
    },
    title: {
        zIndex: 1,
        color: 'white',
        fontSize: 18,
        top: 160,
        bottom: 2,
        textAlign: 'center'
    },
    oldHeading: {
        fontSize: 24,
        marginTop: 10,
        textAlign: 'center',
        // borderBottomWidth: 1,
        // borderTopWidth: 1,
        // borderColor: 'black'
    },
    oldView: {
        borderBottomWidth: 1,
        borderColor: 'black',
        margin: 10
    },
    oldImage: {
        width: '93%',
        marginHorizontal: 15,
        height: 200
    },
    oldTitle: {
        // textAlign: 'center',
        margin: 10

    }
})
