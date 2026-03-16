import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import { Text } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import COLORS from '../Utils/COLORS';
import HomeNavigation from './HomeNavigation';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.PRIMARY,
      }}
    >
      <Tab.Screen 
        name='HomeTab' 
        component={HomeNavigation} 
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12, marginTop: -7 }}>Home</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name='ProfileTab' 
        component={ProfileScreen} 
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12, marginTop: -7 }}>Profile</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
