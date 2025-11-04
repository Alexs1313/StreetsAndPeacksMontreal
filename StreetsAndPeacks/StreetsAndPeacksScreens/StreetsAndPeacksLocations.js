import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import StreetsAndPeacksBackground from '../StreetsAndPeacksComponents/StreetsAndPeacksBackground';
import { useStore } from '../StreetsAndPeacksStore/StreetsAndPeacksContext';
import StreetsAndPeacksCard from '../StreetsAndPeacksComponents/StreetsAndPeacksCard';

const { height } = Dimensions.get('window');

const CATEGORY_LIST = [
  'Landmarks',
  'Parks & Nature',
  'Culture & Districts',
  'Markets & Local Life',
];

export default function StreetsAndPeacksLocations() {
  const { places: streetsAndPeacksPlaces = [] } = useStore() || {};
  const [
    streetsAndPeacksFilteredCategory,
    setStreetsAndPeacksFilteredCategory,
  ] = useState('Landmarks');

  const streetsAndPeacksFiltered = useMemo(() => {
    if (streetsAndPeacksFilteredCategory === 'All') {
      return streetsAndPeacksPlaces;
    }
    return streetsAndPeacksPlaces.filter(
      item => item.category === streetsAndPeacksFilteredCategory,
    );
  }, [streetsAndPeacksFilteredCategory, streetsAndPeacksPlaces]);

  const streetsAndPeacksRenderCategory = cat => {
    const active = cat === streetsAndPeacksFilteredCategory;
    return (
      <TouchableOpacity
        key={cat}
        style={[
          styles.streetsAndPeacksCategoryBtn,
          active
            ? styles.streetsAndPeacksCategoryBtnActive
            : styles.streetsAndPeacksCategoryBtnInactive,
        ]}
        onPress={() => setStreetsAndPeacksFilteredCategory(cat)}
      >
        <Text
          style={
            active
              ? styles.streetsAndPeacksCategoryTextActive
              : styles.streetsAndPeacksCategoryTextInactive
          }
        >
          {cat}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <StreetsAndPeacksBackground>
      <View style={styles.streetsAndPeacksContainer}>
        <Text style={styles.streetsAndPeacksTitle}>LOCATIONS LIST</Text>

        <View style={styles.streetsAndPeacksCategories}>
          {CATEGORY_LIST.map(streetsAndPeacksRenderCategory)}
        </View>

        <FlatList
          data={streetsAndPeacksFiltered}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <StreetsAndPeacksCard place={item} />}
          contentContainerStyle={styles.streetsAndPeacksList}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    </StreetsAndPeacksBackground>
  );
}

const styles = StyleSheet.create({
  streetsAndPeacksContainer: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: height * 0.07,
    paddingBottom: 24,
  },
  streetsAndPeacksTitle: {
    color: '#9F3F00',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 18,
    fontStyle: 'italic',
  },
  streetsAndPeacksCategories: {
    flexDirection: 'row',
    marginBottom: 14,
    flexWrap: 'wrap',
    gap: 8,
  },
  streetsAndPeacksCategoryBtn: {
    height: 36,
    justifyContent: 'center',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
    minWidth: 170,
    flex: 1,
  },
  streetsAndPeacksCategoryBtnActive: {
    backgroundColor: '#A5340A',
  },
  streetsAndPeacksCategoryBtnInactive: {
    backgroundColor: '#75340C',
  },
  streetsAndPeacksCategoryTextActive: {
    color: '#FFE8B9',
    fontWeight: '700',
  },
  streetsAndPeacksCategoryTextInactive: {
    color: '#FFE8B9',
    fontWeight: '600',
  },
  streetsAndPeacksList: {
    paddingTop: 6,
    paddingBottom: 120,
  },
});
