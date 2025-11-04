import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import StreetsAndPeacksStack from './StreetsAndPeacks/StreetsAndPeacksNavigation/StreetsAndPeacksStack';
import { ContextProvider } from './StreetsAndPeacks/StreetsAndPeacksStore/StreetsAndPeacksContext';
import StreetsAndPeacksLoader from './StreetsAndPeacks/StreetsAndPeacksComponents/StreetsAndPeacksLoader';

const App = () => {
  const [isVisibleLoader, setIsVisibleLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisibleLoader(true);
    }, 5500);
  }, []);

  return (
    <NavigationContainer>
      <ContextProvider>
        {isVisibleLoader ? (
          <StreetsAndPeacksStack />
        ) : (
          <StreetsAndPeacksLoader />
        )}
      </ContextProvider>
    </NavigationContainer>
  );
};

export default App;
