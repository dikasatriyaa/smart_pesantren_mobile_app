import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import config from '../../Utils/config';

const Kesehatan = () => {
    const [kesehatan, setKesehatan] = useState([]);
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const { santriId, token } = route.params;

    useEffect(() => {
        fetchKesehatan();
    }, []);

    const fetchKesehatan = async () => {
        try {
            const response = await fetch(`${config.BASE_URL}/api/santri/${santriId}/kesehatan`, {
                headers: {
                    'Authorization' : `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setKesehatan(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching kesehatan:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
          <View className="flex-1 justify-content-center align-middle">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
    }


  return (
    <View className="p-4">
    <Text className="font-bold text-lg">Riwayat Kesehatan</Text>

    {kesehatan.map((item, index) => (
        <View key={index} className="flex flex-col mt-4  bg-white p-4">
            <View className="flex flex-row rounded-lg mb-2">
                <View className="flex-1 text-center">
                    <Text className="">Dokter</Text>
                </View>
                <View className="flex-none text-center">
                    <Text className="text-center font-bold">{item.dokter}</Text>
                </View>
            </View>
            {/* <View className="flex flex-row rounded-lg mb-2">
                <View className="flex-1 text-center">
                    <Text className="">Ustadz Menjaga</Text>
                </View>
                <View className="flex-none text-center">
                    <Text className="text-center font-bold">Muhamad Andika</Text>
                </View>
            </View> */}
            <View className="flex flex-row rounded-lg">
                <View className="flex-1 text-center">
                    <Text className="">Tanggal Masuk Klinik</Text>
                </View>
                <View className="flex-none text-center">
                    <Text className="text-center font-bold">{item.tanggal_masuk}</Text>
                </View>
            </View>
            <View className="flex flex-row rounded-lg">
                <View className="flex-1 text-center">
                    <Text className="">Tanggal Keluar</Text>
                </View>
                <View className="flex-none text-center">
                    <Text className="text-center ">{item.tanggal_keluar}</Text>
                </View>
            </View>
            {/* <View className="flex flex-row rounded-lg">
                <View className="flex-1 text-center">
                    <Text className="">Rekomendasi Pulang</Text>
                </View>
                <View className="flex-none text-center">
                    <Text className="text-center">Tidak</Text>
                </View>
            </View> */}
            <Text className="mt-4 font-bold">Keluhan</Text>
            <Text className="text-justify text-[12px] mt-1">
            {item.keluhan}
            </Text>
      
            <View>
            <Text className="mt-4 font-bold">Obat Yang diberikan</Text>
            <Text className="text-justify text-[12px] mt-1">
            {item.obat_dokter}
            </Text>
            </View>
          </View>
    ))}



      

    </View>
  )
}

export default Kesehatan