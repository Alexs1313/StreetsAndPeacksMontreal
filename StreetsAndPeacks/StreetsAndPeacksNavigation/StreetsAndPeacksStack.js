import { createStackNavigator } from '@react-navigation/stack';
import StreetsAndPeacksTab from './StreetsAndPeacksTab';
import StreetsAndPeacksWelcome from '../StreetsAndPeacksScreens/StreetsAndPeacksWelcome';

const Stack = createStackNavigator();

const StreetsAndPeacksStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="StreetsAndPeacksWelcome"
        component={StreetsAndPeacksWelcome}
      />
      <Stack.Screen
        name="StreetsAndPeacksTab"
        component={StreetsAndPeacksTab}
      />
    </Stack.Navigator>
  );
};

export default StreetsAndPeacksStack;
