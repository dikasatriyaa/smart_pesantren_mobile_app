import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useNavigation } from 'expo-router';
import COLORS from '../../Utils/COLORS';

const Header = () => {
    const navigation = useNavigation(); 
    const handleLogout = async () => {
    try {
      // Hapus token dari AsyncStorage (ganti 'token' dengan nama yang sesuai)
      await AsyncStorage.removeItem('authToken');
      navigation.navigate('Login');

      // Tambahan: Navigasikan pengguna ke halaman login atau halaman lain yang sesuai
      // Misalnya, Anda bisa menggunakan navigation.navigate('Login') jika menggunakan React Navigation
    } catch (error) {
      console.error('Error logging out:', error.message);
      // Handle error jika gagal melakukan logout
    }
  };

  return (
    <ImageBackground source={require('./../../../assets/images/bg-1.jpg')} style={styles.container}>
      <View style={styles.profileMainContainer}>
        {/* Konten lain di header jika ada */}
        <View style={styles.profileContainer}>
          {/* Konten profil pengguna jika ada */}
        </View>
        {/* Menu Logout di sudut kanan atas */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutContainer}>
          <FontAwesome name="sign-out" size={24} color={COLORS.WHITE} />
        </TouchableOpacity>
      </View>
      {/* Konten lain yang diperlukan di dalam header */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 10,
    paddingBottom: 100,
    // Pastikan styles lainnya diatur sesuai kebutuhan
  },
  profileMainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // Pastikan styles lainnya diatur sesuai kebutuhan
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    // Pastikan styles lainnya diatur sesuai kebutuhan
  },
  logoutContainer: {
    padding: 10,
    borderRadius: 8,
  },
  // Pastikan styles lainnya diatur sesuai kebutuhan
});

export default Header;
