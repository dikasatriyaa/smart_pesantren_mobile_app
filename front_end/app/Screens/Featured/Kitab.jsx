import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import config from '../../Utils/config';

const Kitab = () => {
    const [kitabs, setKitabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const { token } = route.params;

    useEffect(() => {
        fetchKitabs();
    }, []);

    const fetchKitabs = async () => {
        try {
            const response = await fetch(`${config.BASE_URL}/api/kitabs`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setKitabs(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching kitabs:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const renderKitabItem = ({ item }) => (
      <View className="p-4">
      <Text className="font-bold text-lg">Daftar Kitab yang telah dipelajari</Text>

        <View className="flex flex-col mt-4 bg-white p-4">
          <View className="flex flex-row rounded-lg">
            <View className="flex-1 items-center mt-2">
                <Text className="font-bold text-lg">{item.mata_pelajaran}</Text>
            </View>
            <View className="flex-none text-center">
                <Text className="font-bold text-center">Kitab digunakan</Text>
                <Text className="text-[12px]">{item.nama_kitab}</Text>
            </View>

          </View>
            <Text className="text-justify text-[12px] mt-4">
            {item.keterangan}
            </Text>
        </View>
    </View>
    );

    return (

            <FlatList
                data={kitabs}
                renderItem={renderKitabItem}
                keyExtractor={(item) => item.id.toString()}
            />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    kitabItem: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 8,
        borderRadius: 4,
    },
    kitabText: {
        fontSize: 16,
    },
});

export default Kitab;
