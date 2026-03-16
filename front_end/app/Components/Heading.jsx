import { View, Text } from 'react-native'
import React from 'react'

export default function Heading({text, isViewAll=false}) {
  return (
    <View className="flex flex-row items-center justify-between">
     <Text style={{ padding: 12, fontSize: 18, fontWeight: 'bold' }}>{text}</Text>

     {isViewAll&& <Text>View all</Text>}
    </View>
  )
}