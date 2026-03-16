import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import config from '../../Utils/config'; // Pastikan konfigurasi BASE_URL di sini
import { useRoute } from '@react-navigation/native';

export default function Hafalan() {
  const [hafalanList, setHafalanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { santriId, token } = route.params;

  useEffect(() => {
    fetchHafalan(); // Memuat data hafalan saat komponen dimuat
  }, []);

  const fetchHafalan = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/api/santri/${santriId}/hafalan`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setHafalanList(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching hafalan:', error);
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
      <Text style={styles.title}>Daftar Hafalan Santri</Text>

      <FlatList
        data={hafalanList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.juzTitle}>Juz {item.juz}</Text>
              <Text style={styles.completion}>{item.progres}</Text>
            </View>
            <Text >{item.status}</Text>
            <View >
              <Text>Catatan: </Text>
              <Text>{item.catatan}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  juzTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  completion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E90FF', // Blue color for completion percentage
  },
  status: {
    fontSize: 14,
    marginBottom: 12,
  },
  teacherInfo: {
    marginTop: 12,
  },
});
