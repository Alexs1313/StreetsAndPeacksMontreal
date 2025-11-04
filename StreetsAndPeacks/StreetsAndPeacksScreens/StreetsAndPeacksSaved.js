import React, { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import StreetsAndPeacksBackground from '../StreetsAndPeacksComponents/StreetsAndPeacksBackground';
import { useStore } from '../StreetsAndPeacksStore/StreetsAndPeacksContext';
import StreetsAndPeacksCard from '../StreetsAndPeacksComponents/StreetsAndPeacksCard';
import { useFocusEffect } from '@react-navigation/native';

const { height } = Dimensions.get('window');

export default function StreetsAndPeacksSaved() {
  const { getStreetsAndPeacksCards, streetsAndPeacksSavedList } = useStore();

  useFocusEffect(
    useCallback(() => {
      getStreetsAndPeacksCards();
    }, []),
  );

  return (
    <StreetsAndPeacksBackground>
      <View style={styles.streetsAndPeacksContainer}>
        <View style={styles.streetsAndPeackstitleCont}>
          <Text style={styles.streetsAndPeacksTitle}>Saved</Text>
        </View>

        <FlatList
          data={streetsAndPeacksSavedList}
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
    color: '#FFE8B9',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  streetsAndPeacksList: {
    paddingTop: 6,
    paddingBottom: 120,
  },
  streetsAndPeackstitleCont: {
    width: '90%',
    backgroundColor: '#75340C',
    alignSelf: 'center',
    borderRadius: 6,
    marginBottom: 50,
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
  },
});
