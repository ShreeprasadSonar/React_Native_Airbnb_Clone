import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

const categories = [
    {
      name: 'Tiny homes',
      icon: 'home',
    },
    {
      name: 'Cabins',
      icon: 'house-siding',
    },
    {
      name: 'Trending',
      icon: 'local-fire-department',
    },
    {
      name: 'Play',
      icon: 'videogame-asset',
    },
    {
      name: 'City',
      icon: 'apartment',
    },
    {
      name: 'Beachfront',
      icon: 'beach-access',
    },
    {
      name: 'Countryside',
      icon: 'nature-people',
    },
];

interface Props {
  onCategoryChnaged: (category: string) => void;
}

const ExploreHeader = ({onCategoryChnaged}: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);

    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y:0, animated: true });
    });

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChnaged(categories[index].name);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
          <View style={styles.actionRow}>
              <Link href={'/(modals)/booking'} asChild>
              <TouchableOpacity style={styles.searchBtn}>
                <Ionicons name='search' size={24}/>
                <View>
                  <Text style={{fontFamily: 'mon-sb'}}>Where To?</Text>
                  <Text style={{fontFamily: 'mon', color: Colors.grey}}>Anywhere · Any Week</Text>
                </View>
              </TouchableOpacity>
              </Link>

              <TouchableOpacity>
                <Ionicons name='options-outline' size={24}/>
              </TouchableOpacity>
          </View>

          <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
            alignItems: 'center',
            gap: 30,
            paddingHorizontal: 16,
          }}>
            {categories.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => selectCategory(index)}
                ref={(el) => itemsRef.current[index] = el} style={activeIndex == index ? styles.categoriesBtnActive : styles.categoriesBtn}>  
                <MaterialIcons size={24} name={item.icon as any} color={activeIndex == index ? '#000' : Colors.grey}></MaterialIcons>
                <Text style={activeIndex == index ? styles.categoryTextActive : styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            ) )}
          </ScrollView>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      height: 130,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: {
        width: 1,
        height: 10,
      },
    },
    actionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingBottom: 16,
    },
  
    searchBtn: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      gap: 10,
      padding: 14,
      alignItems: 'center',
      width: 280,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: '#c2c2c2',
      borderRadius: 30,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 8,
      shadowOffset: {
        width: 1,
        height: 1,
      },
    },
    filterBtn: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#A2A0A2',
      borderRadius: 24,
    },
    categoryText: {
      fontSize: 14,
      fontFamily: 'mon-sb',
      color: Colors.grey,
    },
    categoryTextActive: {
      fontSize: 14,
      fontFamily: 'mon-sb',
      color: '#000',
    },
    categoriesBtn: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 8,
    },
    categoriesBtnActive: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomColor: '#000',
      borderBottomWidth: 2,
      paddingBottom: 8,
    },
  });

export default ExploreHeader;