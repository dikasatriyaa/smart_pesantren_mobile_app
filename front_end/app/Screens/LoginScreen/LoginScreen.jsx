import { View, Text, SafeAreaView, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../Utils/config';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('alviona@gmail.com');
    const [password, setPassword] = useState(12345678);

    const handleLogin = async () => {
        try {
            const response = await fetch(`${config.BASE_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Gagal masuk. Silakan coba lagi.');
            }

            // Simpan token dan data user di AsyncStorage
            await AsyncStorage.setItem('authToken', responseData.data.token);
            await AsyncStorage.setItem('user', JSON.stringify(responseData.data.user));

            // Navigasi ke halaman Home setelah berhasil login
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <SafeAreaView>
            <View>
                <ImageBackground className="p-4 bg-red-600 h-[150px]" source={require('./../../../assets/images/pondok-1.png')}>
                </ImageBackground>
                <View className="bg-white h-[1000px] mt-[-20] rounded-t-[20px]">
                    <Text className="text-center mt-8 font-bold text-2xl">Masuk Aplikasi</Text>
                    <Text className="text-center p-4">Gunakan Akun yang diberikan Operator Pesantren untuk Masuk Aplikasi</Text>

                    <View className="pl-4 pr-4">
                        <TextInput
                            placeholder='Masukkan Email'
                            className="bg-slate-100 p-3 mt-10 rounded-lg"
                            onChangeText={text => setEmail(text)}
                        />
                        <TextInput
                            placeholder='Masukkan Password'
                            className="bg-slate-100 p-3 mt-2 rounded-lg"
                            secureTextEntry
                            onChangeText={text => setPassword(text)}
                        />

                        <TouchableOpacity className="bg-red-700 w-[100%] p-4 m-auto mt-4 mb-[100px] rounded-xl" onPress={handleLogin}>
                            <Text className="text-center text-white font-bold text-4">Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
