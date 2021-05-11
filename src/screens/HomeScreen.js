import React, { useState, useEffect } from 'react'
import { SafeAreaView,StatusBar, StyleSheet, Text,Dimensions, View, FlatList, Image, ScrollView, TouchableOpacity, ActivityIndicator,TouchableWithoutFeedback } from 'react-native'
import server from '../api/Trendinit'
import {Divider,Tile,ListItem} from 'react-native-elements'
import firebase from '../trendinitServices/index'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getArticles()
        // server.get('/home').then(res => {
        //     setPosts(res.data.articles)
        //     setLoading(false)

        // }).catch(err => {
        //     console.log(err)
        // })


    }, [])
    const getArticles = async()=>{
        try {
            const articles = await firebase.articles.read()
           
            setPosts(articles)
            setLoading(false)
        } catch (error) {
            console.log(err)
        }
    }
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

                    keyExtractor={(post) => post.id}
                    data={top}
                    renderItem={({ item }) => {

                        return (

                            
                                <Tile
                        activeOpacity={0.5}
                        imageSrc={{ uri: `${item.image}` }}
                        title={item.title}
                        titleStyle={{marginTop:170,fontSize:18}}
                        height={(windowHeight/3)-16}
                        featured
                        overlayContainerStyle={{backgroundColor:'rgba(0,0,0,0.5)'}}
                        onPress={() => navigation.navigate('Post', { id: item.id })}
                        

                    />
                               
                           


                        )
                    }}
                    ListFooterComponent={
                        <>

                            <FlatList
                                ListHeaderComponent={
                                    <View style={{flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
                                    <Text h4>Recent Posts</Text>
                                    
                                    <Divider style={{height:2}} />
                                    </View>
                                }
                                
                                data={old}
                                keyExtractor={(post) => post._id}
                                renderItem={({ item }) => {
                                    return (
                                        <View >
                                            <TouchableWithoutFeedback onPress={() => navigation.navigate('Post', { id: item.id })}>

                                                <ListItem bottomDivider >
                                                    <ListItem.Content >
                                                        <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:0}}>

                                                       
                                                        <Image style={{width:100,height:100,borderRadius:10}} source={{ uri: `${item.image}` }} />
                                                        <Text style={{marginRight:90,marginLeft:20}}>{item.title}</Text>
                                                        {/* <ListItem.Subtitle   >{item.title}</ListItem.Subtitle> */}
                                                        </View>

                                                      
                                                    </ListItem.Content>

                                                </ListItem>
                                               
                                                {/* <Card containerStyle={{borderWidth:3,borderRadius:30}}>

                                                    <Card.Image source={{ uri: `https://trendinit.herokuapp.com/image/${item.imagename}` }} />
                                                    <Text style={styles.oldTitle}>
                                                        {item.title}
                                                    </Text>
                                                </Card> */}

                                            </TouchableWithoutFeedback>
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
