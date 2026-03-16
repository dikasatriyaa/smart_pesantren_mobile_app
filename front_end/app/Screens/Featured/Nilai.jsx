import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import config from '../../Utils/config';

const Nilai = () => {
    const [akademik, setAkademik] = useState([]);
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const { santriId, token } = route.params;

    useEffect(() => {
        fetchAkademik();
    }, []);

    const fetchAkademik = async () => {
        try {
            const response = await fetch(`${config.BASE_URL}/api/santri/${santriId}/akademik`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAkademik(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching akademik:', error);
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

    const renderAkademikItem = ({ item }) => (
        <View style={styles.akademikItem}>
            <Text style={styles.akademikText}>Mata Pelajaran: {item.mapel.mata_pelajaran}</Text>
            <Text style={styles.akademikText}>Nilai: {item.nilai}</Text>
            <Text style={styles.akademikText}>Tahun Pelajaran: {item.tahun_pelajaran}</Text>
            <Text style={styles.akademikText}>Guru Pengajar: {item.mapel.guru.user.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
          
            <Text style={styles.header}>Data Akademik</Text>
            <FlatList
                data={akademik}
                renderItem={renderAkademikItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
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
    akademikItem: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 8,
        borderRadius: 4,
    },
    akademikText: {
        fontSize: 16,
    },
});

export default Nilai;
