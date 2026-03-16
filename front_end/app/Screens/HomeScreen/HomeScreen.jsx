import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import Slider from './Slider';
import Menu from './Menu';
import News from './News';
import { Ionicons } from '@expo/vector-icons';
import config from '../../Utils/config';
import LoginScreen from '../LoginScreen/LoginScreen'; // Import halaman login
import Welcome from '../LoginScreen/Welcome';
import COLORS from '../../Utils/COLORS';

export default function HomeScreen() {
  const [user, setUser] = useState(null);
  const [santri, setSantri] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [menu, setMenu] = useState(null);
  const [kehadiran, setKehadiran] = useState(null);
  const [pengumuman, setPengumuman] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null); // State untuk menyimpan token
  const [refreshing, setRefreshing] = useState(false); // State untuk menyimpan status refresh

  const fetchData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('authToken');
      if (!storedToken) {
        // Jika token tidak tersedia, arahkan kembali ke halaman login
        
        return;
      }

      const userData = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData);
      setUser(user);
      setToken(storedToken); // Simpan token ke state

      const getSantri = await fetch(`${config.BASE_URL}/api/santri/${user.santri_id}`, {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        },
      });
      const santriData = await getSantri.json();
      setSantri(santriData);

      const getKehadiran = await fetch(`${config.BASE_URL}/api/santri/${user.santri_id}/kehadiran`, {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        },
      });
      const kehadiranData = await getKehadiran.json();
      setKehadiran(kehadiranData);

      const adaMenu = await fetch(`${config.BASE_URL}/api/menu`, {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        },
      });
      const adaData = await adaMenu.json();
      setMenu(adaData);

      const getNews = await fetch(`${config.BASE_URL}/api/news`, {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        },
      });
      const newsData = await getNews.json();
      setNewsList(newsData);

      const getPengumuman = await fetch(`${config.BASE_URL}/api/pengumumen`, {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        },
      });
      const pengumumanData = await getPengumuman.json();
      setPengumuman(pengumumanData);

      // const getKehadiran = await fetch(`${config.BASE_URL}/api/santri/${user.santri_id}/kehadiran`, {
      //   headers: {
      //     'Authorization': `Bearer ${storedToken}`,
      //   },
      // });
      // const dataKehadiran = await getKehadiran.json();
      // setKehadiran(dataKehadiran);

      // const getMenu = await fetch(`${config.BASE_URL}/api/menu`, {
      //   headers: {
      //     'Authorization': `Bearer ${storedToken}`,
      //   },
      // });
      // const dataMenu = await getMenu.json();
      // setMenu(dataMenu);

      setLoading(false);
      setRefreshing(false); // Selesai refresh
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      setRefreshing(false); // Selesai refresh
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    );
  }

  if (!token) {
    // Jika token tidak tersedia atau kosong, kembalikan ke halaman login
    return <Welcome />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Header />
      <View style={{ padding: 20 }}>
        {/* {console.log(newsList)} */}
        {user && (
          <View className="flex flex-row mt-[-60] bg-white rounded-2xl pt-2 pb-2 pl-4 shadow-md" style={styles.shadow}>
            <View className="flex-4 flex-col pl-2">
              <Text className="font-bold text-xl">{santri.name}</Text>
              <Text>Waktu Masuk {kehadiran?.masuk ?? "-- : -- : --"}</Text>
            </View>
            <View className="flex-1 m-auto pr-4">
              <Text className="text-right font-bold ">STATUS</Text>
              <Text className="text-right">{kehadiran?.status ?? ""}</Text>
            </View>
          </View>
        )}

        {/* Kirim properti token ke Menu */}
        <Menu featuredList={menu} user={user} token={token} />

        <View className="flex flex-col mt-4">
          <View className="bg-green-400 h-[110px] rounded-lg mt-4 p-4">
            <Text className="">Pengumuman</Text>
            <Text className="text-[14px] mt-2 font-bold">{pengumuman?.pengumuman ?? ""}</Text>
            <Text className="text-right text-[10px] mt-2">
              {pengumuman?.editor ?? ""}
            </Text>
          </View>
        </View>

        {/* <Slider /> */}
        <News newsList={newsList} user={user} token={token} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  }
});
