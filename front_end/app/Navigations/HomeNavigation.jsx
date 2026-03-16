import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import Hafalan from '../Screens/Featured/Hafalan';
import Kehadiran from '../Screens/Featured/Kehadiran';
import Kesehatan from '../Screens/Featured/Kesehatan';
import Kitab from '../Screens/Featured/Kitab';
import Nilai from '../Screens/Featured/Nilai';
import Pelanggaran from '../Screens/Featured/Pelanggaran';
import NewsDetail from '../Screens/Featured/NewsDetail';
import LoginScreen from '../Screens/LoginScreen/LoginScreen';
import Welcome from '../Screens/LoginScreen/Welcome';

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Welcome' component={Welcome} />
      <Stack.Screen name='hafalan' component={Hafalan} />
      <Stack.Screen name='kehadiran' component={Kehadiran} />
      <Stack.Screen name='kesehatan' component={Kesehatan} />
      <Stack.Screen name='kitab' component={Kitab} />
      <Stack.Screen name='nilai' component={Nilai} />
      <Stack.Screen name='pelanggaran' component={Pelanggaran} />
      <Stack.Screen name='NewsDetail' component={NewsDetail} />
      <Stack.Screen name='Login' component={LoginScreen} />
    </Stack.Navigator>
  );
}
