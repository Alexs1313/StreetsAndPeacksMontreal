import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StreetsAndPeacksBackground from '../StreetsAndPeacksComponents/StreetsAndPeacksBackground';

const StreetsAndPeacksWelcome = () => {
  const [streetsAndPeacksSlide, setStreetsAndPeacksSlide] = useState(0);
  const navigation = useNavigation();
  const [isVisibleLoader, setIsVisibleLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisibleLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <StreetsAndPeacksBackground>
      {isVisibleLoader ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          {Platform.OS === 'ios' ? (
            <Image
              source={require('../../assets/images/streetsnpeacksldrwlc.png')}
            />
          ) : (
            <Image
              source={require('../../assets/images/icomandr.png')}
              style={{ width: 220, height: 220, borderRadius: 12 }}
            />
          )}
        </View>
      ) : (
        <View style={styles.streetsnpeackscnt}>
          <Text style={styles.streetsnpeackstext}>
            {streetsAndPeacksSlide === 0
              ? 'WELCOME TO'
              : streetsAndPeacksSlide === 1
              ? 'GUESS AND UNLOCK'
              : 'DISCOVER & SAVE'}
          </Text>
          {streetsAndPeacksSlide === 0 && (
            <Text style={styles.streetsnpeackstitle}>
              {Platform.OS === 'ios'
                ? 'STREETS & PEAKS: MONTREAL'
                : 'MONTREAL LUXURY STREETS'}
            </Text>
          )}
          <Text style={styles.streetsnpeackssubtitle}>
            {streetsAndPeacksSlide === 0
              ? `Explore Montreal through fun challenges. Discover its famous streets,
hidden parks, and iconic landmarks.`
              : streetsAndPeacksSlide === 1
              ? `Each level challenges you to identify streets, parks, or landmarks. The more you guess — the more of Montreal you uncover.`
              : `Open the interactive map to view all your discovered locations. Save the spots you’d love to visit in real life.`}
          </Text>
          <View style={{ alignSelf: 'flex-end', top: 10 }}>
            {streetsAndPeacksSlide === 0 && (
              <Image
                source={require('../../assets/images/streetsnpeackson1.png')}
              />
            )}
            {streetsAndPeacksSlide === 1 && (
              <Image
                source={require('../../assets/images/streetsnpeackson2.png')}
              />
            )}
            {streetsAndPeacksSlide === 2 && (
              <View style={{ marginTop: 40 }}>
                <Image
                  source={require('../../assets/images/streetsnpeackson3.png')}
                  style={{ position: 'absolute', right: 60 }}
                />
                <Image
                  source={require('../../assets/images/streetsnpeackson4.png')}
                />
              </View>
            )}
          </View>

          <View
            style={{
              borderWidth: 3,
              borderColor: '#9F3F00',
            }}
          >
            <View
              style={{
                padding: 8,
                backgroundColor: 'transparent',
              }}
            >
              <View style={styles.streetsnpeackswlccnt}>
                <Text style={styles.streetsnpeackswlccnttxt}>
                  Explore Montreal through fun challenges. Discover its famous
                  streets, hidden parks, and iconic landmarks.
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              if (streetsAndPeacksSlide < 2) {
                setStreetsAndPeacksSlide(streetsAndPeacksSlide + 1);
              } else {
                navigation.navigate('StreetsAndPeacksTab');
              }
            }}
            style={styles.streetsnpeacksbtn}
          >
            <Text style={styles.streetsnpeacksbtntxt}>
              {streetsAndPeacksSlide < 2 ? 'Next' : 'Start'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </StreetsAndPeacksBackground>
  );
};

const styles = StyleSheet.create({
  streetsnpeackscnt: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 70,
    padding: 34,
  },
  streetsnpeackswlccnttxt: {
    fontSize: 16,
    fontWeight: '800',
    color: '#351500',
    fontStyle: 'italic',
  },
  streetsnpeackstitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#9F3F00',
    textAlign: 'center',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  streetsnpeackssubtitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#9F3F00',
    marginBottom: 8,
    fontStyle: 'italic',
    marginTop: 5,
  },
  streetsnpeackstext: {
    fontSize: 24,
    fontWeight: '800',
    color: '#9F3F00',
    textAlign: 'center',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  streetsnpeackswlccnt: {
    width: '100%',
    padding: 12,
    backgroundColor: '#FFE8B9',
    minHeight: 110,
  },
  streetsnpeacksbtn: {
    backgroundColor: '#75340C',
    borderRadius: 25,
    width: 116,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 18,
  },
  streetsnpeacksbtntxt: {
    color: '#FFE8B9',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default StreetsAndPeacksWelcome;
