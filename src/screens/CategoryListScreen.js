import React from 'react'
import {View,Text,FlatList,Dimensions} from 'react-native'
import {Icon,ListItem,Header,Card, Divider, Tile,Image} from 'react-native-elements'
import Grid from 'react-native-grid-component';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CatList = [{
    id:1,
    name:'Sports',
    image:'https://mongooseagency.com/files/3415/9620/1413/Return_of_Sports.jpg'
    
},{
    id:2,
    name:'Politics',
    image:'https://cdnuploads.aa.com.tr/uploads/Contents/2020/03/26/thumbs_b_c_d86e267a58e9e588b133cb1dc8b7bf9e.jpg?v=035929'
    
},{
    id:3,
    name:'Technology',
    image:'https://industrywired.com/wp-content/uploads/2020/03/Here_are-Top-10-Emerging-Technologies-Worth-Investing-in-for-2020.jpeg'
    
},{
    id:4,
    name:'Entertainment',
    image:'https://assets-news-bcdn.dailyhunt.in/cmd/resize/wxh__DHQ_/fetchdata16/images/32/bb/4b/32bb4b8968f3cf679b88b9c1b10b9a8af19cf5e30a8249cbc4f7a91aadf43bfd.jpg'
    
},{
    id:5,
    name:'International',
    image:'https://www.insidehighered.com/sites/default/server_files/media/international-1751293_960_720.png'
},{ 
    id:6,
    name:'Others',
    image:'https://static.wikia.nocookie.net/bdccb5c5-d0ee-4a8c-9122-1d78d65cd656'
   
}]


const numColumns = 2;
const tileSize = windowWidth / numColumns - 10 ;


export default function CategoryListScreen({navigation}) {
   
    return (
        <View>           
                <FlatList 
            data={CatList}
            keyExtractor={(item)=>item.id}
            numColumns={2}
            renderItem={({item})=>{
                
                return(
                   

                            <Tile
                      
                      imageSrc={{uri:item.image}}
                      imageContainerStyle={{width: windowWidth/2, height:windowHeight/3-16 }}
                      
                      title={item.name}
                      titleStyle={{fontSize:16,fontWeight:'bold'}}
                      
                      
                      featured
                      onPress={()=>navigation.navigate('CategoryScreen',{category:item.name})}
                      activeOpacity={0.5}
                      overlayContainerStyle={{backgroundColor:'rgba(0,0,0,0.7)'}}
                      containerStyle={{
                        width:tileSize ,
                        height:windowHeight/3-16 ,
                        alignItems:'center',
                        flexDirection:'row',
                        justifyContent:'center',
                        // backgroundColor:`${backgroundColors[item.id]}`,
                        marginHorizontal:5,
                        // marginVertical:2,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.20,
                        shadowRadius: 1.41,

                        elevation: 2,

                      }}
                      

                  />
               
                        )
                    }}
                    
                    />


       
           

            
        </View>
    )
}
