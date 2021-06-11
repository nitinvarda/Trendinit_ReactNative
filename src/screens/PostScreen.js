import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity,Share } from 'react-native'
import server from '../api/Trendinit'
import {Icon} from 'react-native-elements'

import HTML from 'react-native-render-html';
import firebase from '../trendinitServices/index'


const PostScreen = ({ route,navigation }) => {
    const [post, setPost] = useState({})
    const [date,setDate] = useState('')
    const [time,setTime] = useState('')
    const [loading, setLoading] = useState(false)
    const id = route.params.id
    // console.log(navigation.navigate)
    useEffect(() => {
        setLoading(true)
        getArticle()
    }, [id])

    const getArticle = async()=>{
        try{
            const article = await firebase.articles.getById(id)
            const date = new Date(article.createdAt?.toDate())
            setDate(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`)
            setTime(`${date.getHours()}:${date.getMinutes()}`)
            setPost(article)
            setLoading(false)

        }
        catch(err){


        }
    }



    const share = ()=>{
        Share.share({
            title: post.title,
            message: `${post.title}  https://trendinit.netlify.app/post/${post.id}`,
        }, {
            dialogTitle: 'Share ' + post.title
        })
    }

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 200 }} />
    }
    else {
        console.log(date)


        return (
            <View style={{flexDirection:'column'}}>
              

            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{flexDirection:'column'}}>
                    <View style={{position:'relative'}}>
                        <Image style={styles.postImage} source={{ uri: `${post.image}` }} />
                        {/* <View style={{
                            position:'absolute',
                            bottom:-60,
                            backgroundColor:'white',
                            right:50,
                            left:50,
                            padding:10,
                            borderRadius:15,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            }}>

                        <Text style={styles.postTitle}>{post.title}</Text>
                        </View> */}
                        <View style={{position:'absolute',top:20,left:10}}>
                            <Icon onPress={()=>navigation.goBack()} name='arrow-left' type='font-awesome-5' iconStyle={{color:'white'}} />
                        </View>
                    </View>
                    <View style={{flex:1}}>
                        <View style={{
                            backgroundColor:'white',
                            marginHorizontal:20,
                            marginVertical:10,
                            marginTop:-35,
                            padding:10,
                            borderRadius:15,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }}>
                            <Text style={styles.postTitle}>{post.title}</Text>
                        </View>
                        {/* <View style={{flexDirection:'row',}}>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>

                            <Text>Category</Text>
                            </View>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                            <Text>Author</Text>

                            </View>
                        </View> */}
                        <View style={styles.info}>
                            
                            <TouchableOpacity activeOpacity={0.8} style={{flex:1}} onPress={() => navigation.navigate('CategoryTab',{screen:'CategoryScreen',params:{ category: post.category} })}>
                            <View style={{
                                flex:1,
                                borderWidth:0.05,
                                borderColor:'black',
                                margin:5,
                                padding:10,
                                flexDirection:'column',
                                alignItems:'center',
                                borderRadius:10,
                                backgroundColor:'#282c34',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.22,
                                shadowRadius: 2.22,

                                elevation: 1,
                                }}>
                            
                                <Text style={{ color: 'white',fontWeight:'bold' }}>{post.category && (post.category).toUpperCase()}</Text>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={{flex:1}}  onPress={() => navigation.navigate('ByAuthor', { name: post.by })}>
                            <View style={{
                                flex:1,
                                borderWidth:0.05,
                                borderColor:'black',
                                margin:5,
                                padding:10,
                                flexDirection:'column',
                                backgroundColor:'#282c34',
                                borderRadius:10,
                                alignItems:'center',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.22,
                                shadowRadius: 2.22,

                                elevation: 1,
                                }}>
                            
                                <Text style={{ color: 'white',fontWeight:'bold' }} >{post.by && (post.by).toUpperCase()}</Text>

                            </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.desc}>
                        <View style={styles.date}>
                            <Text>Date :{date}</Text>
                            <Text>Time: {time}</Text>
                        </View>
                            <HTML html={"<div>" + post.desc + "</div>"} />
                            </View>
                    </View>
                </View>
                

            </ScrollView>
            
            <TouchableOpacity
            // onPress={()=>setActive(!active)}
            style={{
                
                borderWidth:1,
                borderColor:'rgba(0,0,0,0.2)',
                alignItems:'center',
                justifyContent:'center',
                width:60,
                position: 'absolute',                                          
                bottom: 10,                                                    
                right: 20,
                height:60,
                backgroundColor:'#282c34',
                borderRadius:100,
                }}
            >
                <Icon name='share' onPress={share} color={'white'} />
            </TouchableOpacity>
            
            
            </View>
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
        fontSize: 18,
        marginBottom: 10,
        color:'#282c34',
        fontWeight:'bold'
    },
    desc: {
        borderTopWidth: 1,
        borderColor: 'black',
        marginHorizontal: 10,
        fontSize: 20
    },
    info: {
       
        flexDirection: "row",
        justifyContent: 'space-between',
        marginHorizontal: 10,
        
    },
    date:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        // marginHorizontal:10
    }
})
