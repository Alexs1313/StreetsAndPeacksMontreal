import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import StreetsAndPeacksBackground from '../StreetsAndPeacksComponents/StreetsAndPeacksBackground';
import { useStore } from '../StreetsAndPeacksStore/StreetsAndPeacksContext';
import StreetsAndPeacksCard from '../StreetsAndPeacksComponents/StreetsAndPeacksCard';
import MapView, { Marker } from 'react-native-maps';
import { useFocusEffect } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';

const { height } = Dimensions.get('window');

export default function StreetsAndPeacksMap({ route }) {
  const { completed = [], places } = useStore() || {};
  const [selectedMarker, setSelectedMarker] = useState(null);
  const selectedPlace = route?.params?.place;

  const unlockedPlaces = places.filter((_, index) => completed[index] === true);

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => {
        Orientation.unlockAllOrientations(), setSelectedMarker(null);
      };
    }, []),
  );

  return (
    <StreetsAndPeacksBackground>
      <View style={styles.streetsAndPeacksContainer}>
        <View style={styles.streetsAndPeackstitleCont}>
          <Text style={styles.streetsAndPeacksTitle}>Montreal Map</Text>
        </View>

        <View style={{ flex: 1 }}>
          <MapView
            key={selectedPlace ? 'selected' : 'unlocked'}
            userInterfaceStyle="dark"
            style={{ flex: 1 }}
            provider={Platform.OS === 'ios' ? 'google' : undefined}
            onPress={() => selectedMarker && setSelectedMarker(null)}
            initialRegion={{
              latitude: 45.5075,
              longitude: -73.5673,
              latitudeDelta: 0.12,
              longitudeDelta: 0.12,
            }}
          >
            {selectedPlace ? (
              <Marker
                coordinate={selectedPlace.coords}
                onPress={() =>
                  selectedMarker
                    ? setSelectedMarker(null)
                    : setSelectedMarker(selectedPlace)
                }
              >
                <Image
                  source={require('../../assets/images/streetsnpeackslocmark.png')}
                  style={{ width: 34, height: 34 }}
                  resizeMode="contain"
                />
              </Marker>
            ) : (
              unlockedPlaces.map(marker => (
                <Marker
                  key={marker.id}
                  coordinate={marker.coords}
                  onPress={() =>
                    selectedMarker
                      ? setSelectedMarker(null)
                      : setSelectedMarker(marker)
                  }
                >
                  <Image
                    source={require('../../assets/images/streetsnpeackslocmark.png')}
                    style={{ width: 34, height: 34 }}
                    resizeMode="contain"
                  />
                </Marker>
              ))
            )}
          </MapView>

          {selectedMarker && (
            <View style={styles.cardWrap}>
              <StreetsAndPeacksCard
                place={selectedMarker}
                selectedScreen="mapScreen"
              />
            </View>
          )}
        </View>
      </View>
    </StreetsAndPeacksBackground>
  );
}

const styles = StyleSheet.create({
  streetsAndPeacksContainer: { flex: 1 },
  streetsAndPeacksTitle: {
    color: '#FFE8B9',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  streetsAndPeackstitleCont: {
    width: '80%',
    backgroundColor: '#75340C',
    alignSelf: 'center',
    borderRadius: 6,
    marginBottom: 50,
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
    position: 'absolute',
    top: height * 0.07,
    zIndex: 1,
  },
  cardWrap: {
    position: 'absolute',
    top: 115,
    alignSelf: 'center',
    width: '90%',
    zIndex: 2,
  },
});
