import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getSlider } from '../../Utils/GlobalsApi'; // Correct import statement
import Heading from '../../Components/Heading';

export default function Slider() {
  const [sliderData, setSliderData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSlider(); // Call the function directly
        console.log('Slider Data:', data);
        setSliderData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Render your component as before
  return (
    <View>
      <Heading text={'Kegiatan Pesantren'} />
      <FlatList
        data={sliderData ? sliderData.sliders_Connection.edges : []}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.node.id}
        renderItem={({ item }) => (
          <View className="mr-3">
            <Image source={{ uri: item.node.image.url }} style={styles.sliderImage} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderImage: {
    width:270,
    height:150,
    borderRadius:20,
    objectFit:'contain'
  }
})
