import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import config from '../../Utils/config'; // Pastikan konfigurasi BASE_URL di sini
import { useRoute } from '@react-navigation/native';

export default function Kehadiran() {
  const [kehadiran, setKehadiran] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { santriId, token } = route.params;

  useEffect(() => {
    fetchKehadiran(); // Memuat data kehadiran saat komponen dimuat
  }, []);

  const fetchKehadiran = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/api/santri/${santriId}/kehadiran/semua`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setKehadiran(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching kehadiran:', error);
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
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Riwayat Kehadiran</Text>
      </View>

      {kehadiran.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <View style={[styles.statusContainer, { backgroundColor: getStatusColor(item.status) }]}>
            <View style={styles.textContainer}>
              <Text className="font-bold m-auto">{item.tanggal}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.timeText}>{item.masuk} WIB</Text>
              <Text style={styles.statusText}>Status : {item.status}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const getStatusColor = (status) => {
  switch (status) {
    case 'Hadir':
      return '#68D391'; // Hijau
    case 'Sakit':
      return '#F6E05E'; // Kuning
    default:
      return '#6B7280'; // Abu-abu
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  itemContainer: {
    marginTop: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    backgroundColor: '#6B7280', // Default: abu-abu
    padding: 16,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 16,
  },
  statusText: {
    fontSize: 12,
    marginTop: 4,
  },
});
