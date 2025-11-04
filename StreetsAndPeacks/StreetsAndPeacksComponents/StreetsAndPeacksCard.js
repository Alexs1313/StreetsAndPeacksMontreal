import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Share,
  Alert,
} from 'react-native';
import { useStore } from '../StreetsAndPeacksStore/StreetsAndPeacksContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StreetsAndPeacksCard({ place, selectedScreen }) {
  const {
    saveStreetsAndPeacksCard,
    getStreetsAndPeacksCards,
    removeStreetsAndPeacksCard,
  } = useStore();
  const [togglePeacksIcn, setTogglePeacksIcn] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      renderPeacksLoc(place);
      getStreetsAndPeacksCards();
    }, []),
  );

  const togglePeacksSaved = selectedPlace => {
    if (togglePeacksIcn)
      removeStreetsAndPeacksCard(selectedPlace), setTogglePeacksIcn(false);
    else saveStreetsAndPeacksCard(selectedPlace), setTogglePeacksIcn(true);
  };

  const renderPeacksLoc = async item => {
    const jsonValue = await AsyncStorage.getItem('streets_and_peacks_saved');

    const favoritesList = JSON.parse(jsonValue);

    if (favoritesList != null) {
      let data = favoritesList.find(fav => fav.id === item.id);

      return data == null
        ? setTogglePeacksIcn(false)
        : setTogglePeacksIcn(true);
    }
  };

  const sharePeacksStory = async () => {
    try {
      await Share.share({
        message: `${place.title}\n\n${place.description} \n\nAddress: ${place.address}\nCoordinates: ${place.coords.latitude}, ${place.coords.longitude}`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.streetsAndPeacksCard}>
      <Image
        source={place.image}
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          width: '100%',
          height: 220,
        }}
      />

      <View style={{ padding: 15 }}>
        <Text style={styles.streetsAndPeacksTitle}>{place.title}</Text>

        <View
          style={{
            marginTop: 4,
            marginBottom: 4,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Image
            source={require('../../assets/images/streetsnpeacksloc.png')}
          />
          <Text style={styles.streetsAndPeacksCategory}>
            <Text
              style={[styles.streetsAndPeacksCategory, { fontWeight: '700' }]}
            >
              Address:{' '}
            </Text>
            {place.address}
          </Text>
        </View>

        <Text style={styles.streetsAndPeacksCategory}>
          <Text
            style={[styles.streetsAndPeacksCategory, { fontWeight: '700' }]}
          >
            Coordinates:{' '}
          </Text>
          {place.coords.latitude}, {place.coords.longitude}
        </Text>

        <Text style={styles.streetsAndPeacksDescription}>
          {place.description}
        </Text>

        <View
          style={[
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 15,
              flexWrap: 'wrap',
            },
            selectedScreen === 'mapScreen' && { justifyContent: 'flex-end' },
          ]}
        >
          {selectedScreen !== 'mapScreen' && (
            <TouchableOpacity
              style={styles.streetsAndPeacksButton}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('StreetsAndPeacksTab', {
                  screen: 'StreetsAndPeacksMap',
                  params: {
                    place: place,
                  },
                });
              }}
            >
              <Text style={styles.streetsAndPeacksButtonText}>Show on Map</Text>
            </TouchableOpacity>
          )}

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity activeOpacity={0.7} onPress={sharePeacksStory}>
              <Image
                source={require('../../assets/images/streetsnpeackshr.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => togglePeacksSaved(place)}
            >
              {togglePeacksIcn ? (
                <Image
                  source={require('../../assets/images/streetsnpeackssvd.png')}
                />
              ) : (
                <Image
                  source={require('../../assets/images/streetsnpeackssv.png')}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  streetsAndPeacksCard: {
    backgroundColor: '#E87931',
    borderRadius: 10,
    marginBottom: 12,
  },

  streetsAndPeacksTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#180A00',
  },
  streetsAndPeacksBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  streetsAndPeacksBadgeText: {
    color: '#FFE8B9',
    fontWeight: '700',
    fontSize: 12,
  },
  streetsAndPeacksCategory: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 14,
    width: '90%',
  },
  streetsAndPeacksDescription: {
    marginTop: 8,
    color: '#000000',
    fontWeight: '400',
    fontSize: 14,
  },
  streetsAndPeacksCardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  streetsAndPeacksButton: {
    backgroundColor: '#75340C',
    borderRadius: 6,
    width: 160,
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
  },
  streetsAndPeacksButtonText: {
    color: '#FFE8B9',
    fontWeight: '700',
  },
  streetsAndPeacksDeleteButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#B22222',
  },
  streetsAndPeacksDeleteText: {
    color: '#B22222',
  },
});
