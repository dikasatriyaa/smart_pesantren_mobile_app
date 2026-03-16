import React from 'react'
import { View, ImageBackground, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native'
import COLORS from '../../Utils/COLORS'
import { useNavigation } from '@react-navigation/native';


export default function Welcome() {

  const navigation=useNavigation();

  return (
    <SafeAreaView className="bg-white h-[100%]">
        <View>
        <Image source={require('./../../../assets/images/Kalender.png')} className="h-[350px] w-[300px] m-auto mt-[70px]"/>
        </View>

        <View className="px-6 pt-4 mt-6">
            <Text className="text-2xl font-bold text-center text-red-700">Terhubung Dengan Santri</Text>
            <Text className="text-xl font-bold mb-6 text-center">Hanya Satu Genggaman</Text>
            <Text className="text-center text-sm">Silahkan untuk menghubungi Operator Pesantren untuk Mendapat Akses Masuk Aplikasi</Text>
        </View>

        <View>
            <TouchableOpacity className="bg-red-700 w-[80%] p-4 m-auto mt-8 mb-[100px] rounded-xl" onPress={()=>navigation.navigate('Login')}>
                <Text className="text-center text-white font-bold text-4 ">Masuk Aplikasi Sekarang</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    loginImage:{



    },
    subContainer: {
        width: '100%',
        backgroundColor: COLORS.PRIMARY,
        height: '70%',
        marginTop:-20,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding:20
    }
})
