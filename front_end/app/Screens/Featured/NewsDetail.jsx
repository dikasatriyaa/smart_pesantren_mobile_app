import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import config from '../../Utils/config';
import { WebView } from 'react-native-webview';
import COLORS from '../../Utils/COLORS';

const NewsDetail = () => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { newsId, token } = route.params;

  useEffect(() => {
    fetchNewsDetail();
  }, []);

  const fetchNewsDetail = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/api/news/${newsId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNews(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news detail:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    );
  }

  if (!news) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load news detail.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: `${config.BASE_URL}/storage/${news.images}` }} style={styles.newsImage} />
      <Text style={styles.newsTitle}>{news.title}</Text>
      <Text style={styles.newsAuthor}>by {news.author}</Text>
      <WebView
      originWhitelist={['*']}
      source={{ html: news.body }}
      style={styles.newsBody}
       />
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
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  newsImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  newsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  newsAuthor: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  newsBody: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default NewsDetail;
