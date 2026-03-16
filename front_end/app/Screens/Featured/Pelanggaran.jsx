import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import config from '../../Utils/config';

const Pelanggaran = () => {
    const [pelanggaran, setPelanggaran] = useState([]);
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const { santriId, token } = route.params;

    useEffect(() => {
        fetchPelanggaran();
    }, []);

    const fetchPelanggaran = async () => {
        try {
            const response = await fetch(`${config.BASE_URL}/api/santri/${santriId}/pelanggaran`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPelanggaran(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching pelanggaran:', error);
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

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Riwayat Pelanggaran</Text>
            {pelanggaran.length === 0 ? (
                <Text>Tidak ada data pelanggaran.</Text>
            ) : (
                pelanggaran.map((item, index) => (
                    <View key={index} style={styles.pelanggaranItem}>
                        <Text style={styles.title}>Pelanggaran:</Text>
                        <Text>{item.pelanggaran}</Text>
                        <Text style={styles.title}>Tindakan:</Text>
                        <Text>{item.tindakan}</Text>
                        <Text style={styles.title}>Tanggal:</Text>
                        <Text>{item.tanggal}</Text>
                    </View>
                ))
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        padding: 16,
        backgroundColor: '#f5f5f5',
        flex: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    pelanggaranItem: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
    },
    title: {
        fontWeight: 'bold',
    },
});

export default Pelanggaran;
