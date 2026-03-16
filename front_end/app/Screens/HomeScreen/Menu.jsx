import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import config from '../../Utils/config';

export default function Menu({ featuredList, user, token }) {
  const navigation = useNavigation();

  const handleMenuItemPress = (screenName) => {
    navigation.navigate(screenName, { santriId: user.santri_id, token });
  };

  return (

    <View className="mt-3">
      <FlatList
        data={featuredList}
        scrollEnabled={false} // Disable FlatList's own scrolling
        numColumns={4}
        renderItem={({ item }) => (
          <View style={styles.menuItemContainer} className="mb-2">
            <TouchableOpacity
              className="flex-1 justify-content-center p-2 border-[1px] border-gray-100 m-2 rounded-2xl"
              onPress={() => handleMenuItemPress(item.link)}
            >
              <Image
                source={{ uri: `${config.BASE_URL}/storage/${item.images}` }}
                style={styles.menuItemImage}
              />
            </TouchableOpacity>
            <Text className="text-[12px] text-center">{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  menuItemImage: {
    width: 45,
    height: 45,
  },

});
