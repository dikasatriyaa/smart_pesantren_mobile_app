import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Heading from '../../Components/Heading'
import config from '../../Utils/config'
import { useNavigation } from 'expo-router'
import COLORS from '../../Utils/COLORS'

export default function News({newsList, user, token}) {
  const navigation = useNavigation();

  return (
    
    <View>
        {newsList.map((item, index) => (
        <View key={index} className="flex-col items-center mb-2 mt-4">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-black justify-center items-center p-0.5">
                    <Image source={{uri: `${config.BASE_URL}/storage/${item.images}`}} className="w-full h-full rounded-lg" resizeMode='cover'/>
                    </View>

                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-black font-psemibold text-sm">
                            {item.title}
                        </Text>
                        <Text className="text-xs text-gray-600 font-pregular">
                            {item.author}
                        </Text>
                    </View>

                </View>
            </View>
                    <TouchableOpacity
                    className="w-full h-60 rounded-xl relative justify-center items-center"
                    onPress={()=> navigation.navigate('newsDetail', {newsId : item.id, token: tokenZz})}
                    >
                    <Image source={{uri: `${config.BASE_URL}/storage/${item.images}`}} className="w-full h-full rounded-xl mt-3" resizeMode='cover'/>
                    </TouchableOpacity>
        </View>
      ))}



        {/* <FlatList
        data={newsList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index})=>(
            <View className="mr-[10px] p-3 bg-white rounded-lg">
                <Image source={{uri: `${config.BASE_URL}/storage/${item.images}`}} className="w-[160px] h-[100px] rounded-lg"/>
                <View>
                    <Text className="font-bold">{item?.title}</Text>
                    <Text className="text-[13px]">{item?.author}</Text>
                    <Text className="text-[10px] p-[3px] bg-[#35cfe4] rounded-sm" style={styles.infoContainer}>{item?.Category}</Text>
                </View>
            </View>
        )}
        /> */}
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgrounColor: COLORS.WHITE,
        borderRadius:10
    },
    infoContainer:{

        display: 'flex',
        gap:3,
        alignSelf: 'flex-start'
    },
    image: {
        width: 160,
        height: 100,
        borderRadius: 10
    }
})