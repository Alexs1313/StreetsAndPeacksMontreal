import { ImageBackground, ScrollView } from 'react-native';

const StreetsAndPeacksBackground = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/streetsnpeacksbck.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default StreetsAndPeacksBackground;
