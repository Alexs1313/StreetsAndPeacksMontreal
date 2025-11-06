import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View } from 'react-native';
import StreetsAndPeacksLevels from '../StreetsAndPeacksScreens/StreetsAndPeacksLevels';
import StreetsAndPeacksMap from '../StreetsAndPeacksScreens/StreetsAndPeacksMap';
import StreetsAndPeacksSaved from '../StreetsAndPeacksScreens/StreetsAndPeacksSaved';
import StreetsAndPeacksLocations from '../StreetsAndPeacksScreens/StreetsAndPeacksLocations';

const Tab = createBottomTabNavigator();

const StreetsAndPeacksTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.streetsnpeackstabs,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#000',
      }}
    >
      <Tab.Screen
        name="StreetsAndPeacksLevels"
        component={StreetsAndPeacksLevels}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.streetsnpeackswrapp,
                focused && { backgroundColor: '#A5340A' },
              ]}
            >
              <Image
                source={require('../../assets/images/streetsnpeacksplay.png')}
                tintColor={color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="StreetsAndPeacksMap"
        component={StreetsAndPeacksMap}
        options={{ unmountOnBlur: true }}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.streetsnpeackswrapp,
                focused && { backgroundColor: '#A5340A' },
              ]}
            >
              <Image
                source={require('../../assets/images/streetsnpeacksmap.png')}
                tintColor={color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="StreetsAndPeacksSaved"
        component={StreetsAndPeacksSaved}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.streetsnpeackswrapp,
                focused && { backgroundColor: '#A5340A' },
              ]}
            >
              <Image
                source={require('../../assets/images/streetsnpeackssav.png')}
                tintColor={color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="StreetsAndPeacksLocations"
        component={StreetsAndPeacksLocations}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.streetsnpeackswrapp,
                focused && { backgroundColor: '#A5340A' },
              ]}
            >
              <Image
                source={require('../../assets/images/streetsnpeackslist.png')}
                tintColor={color}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  streetsnpeackstabs: {
    marginHorizontal: 50,
    elevation: 0,
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 51,
    borderRadius: 8,
    backgroundColor: '#E39D20',
    paddingHorizontal: 6,
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#E39D20',
  },
  streetsnpeackswrapp: {
    padding: 15,
    backgroundColor: '#C87514',
    borderRadius: 4,
  },
});

export default StreetsAndPeacksTab;
