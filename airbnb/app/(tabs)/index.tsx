import { View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import Listings from '@/components/Listings'
import lisingData from '@/assets/data/airbnb-listings.json'

const Page = () => {
  const [category, setCategory] = useState('Tiny homes');
  const items = useMemo(() => lisingData as any, []);

  const onDataChanged = (category: string) =>{
    setCategory(category);
  };
  return (
    <View style={{flex: 1, marginTop: 130}}>
      <Stack.Screen options={{
        header: () => <ExploreHeader onCategoryChnaged={onDataChanged}/>
      }}/>
      <Listings listings={items} category={category} />
    </View>
  )
}

export default Page