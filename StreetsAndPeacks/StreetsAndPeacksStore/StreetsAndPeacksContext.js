import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { streetsAndPeacksPlaces } from '../StreetsAndPeacksData/streetsAndPeacksPlaces';
export const StoreContext = createContext(undefined);

export const useStore = () => {
  return useContext(StoreContext);
};

const STORAGE_COMPLETED = 'SNPL_COMPLETED_LEVELS';
const STORAGE_SELECTED = 'SNPL_SELECTED_LEVEL';
const STORAGE_PLACES = 'SNPL_PLACES';

export const ContextProvider = ({ children }) => {
  const [places, setPlaces] = useState(streetsAndPeacksPlaces);
  const [completed, setCompleted] = useState(
    Array(streetsAndPeacksPlaces.length).fill(false),
  );
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [streetsAndPeacksSavedList, setStreetsAndPeacksSavedList] = useState(
    [],
  );

  const saveStreetsAndPeacksCard = async selPlc => {
    try {
      const stored = await AsyncStorage.getItem('streets_and_peacks_saved');
      let locs = stored !== null ? JSON.parse(stored) : [];

      const updatedList = [...locs, selPlc];

      await AsyncStorage.setItem(
        'streets_and_peacks_saved',
        JSON.stringify(updatedList),
      );
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getStreetsAndPeacksCards = async () => {
    try {
      const savedData = await AsyncStorage.getItem('streets_and_peacks_saved');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setStreetsAndPeacksSavedList(parsed);
      }
    } catch (error) {
      console.log('Failed', error);
    }
  };

  const removeStreetsAndPeacksCard = async selPlc => {
    const jsonValue = await AsyncStorage.getItem('streets_and_peacks_saved');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];

    const filtered = data.filter(item => item.id !== selPlc.id);

    setStreetsAndPeacksSavedList(filtered);
    await AsyncStorage.setItem(
      'streets_and_peacks_saved',
      JSON.stringify(filtered),
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const rawCompleted = await AsyncStorage.getItem(STORAGE_COMPLETED);
        const rawSelected = await AsyncStorage.getItem(STORAGE_SELECTED);
        const rawPlaces = await AsyncStorage.getItem(STORAGE_PLACES);

        if (rawCompleted) {
          const parsed = JSON.parse(rawCompleted);
          if (Array.isArray(parsed)) setCompleted(parsed);
        } else {
          await AsyncStorage.setItem(
            STORAGE_COMPLETED,
            JSON.stringify(completed),
          );
        }

        if (rawSelected) {
          const si = parseInt(rawSelected, 10);
          if (!isNaN(si)) setSelectedLevel(si);
        }

        if (rawPlaces) {
          const parsedPlaces = JSON.parse(rawPlaces);
          if (Array.isArray(parsedPlaces)) setPlaces(parsedPlaces);
        } else {
          await AsyncStorage.setItem(
            STORAGE_PLACES,
            JSON.stringify(streetsAndPeacksPlaces),
          );
        }
      } catch (e) {
        console.warn('failed', e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_PLACES, JSON.stringify(places));
      } catch (e) {
        console.warn('failed', e);
      }
    })();
  }, [places]);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_COMPLETED,
          JSON.stringify(completed),
        );
      } catch (e) {
        console.warn('failed', e);
      }
    })();
  }, [completed]);

  useEffect(() => {
    (async () => {
      try {
        if (selectedLevel !== null) {
          await AsyncStorage.setItem(STORAGE_SELECTED, String(selectedLevel));
        }
      } catch (e) {
        console.warn('failed', e);
      }
    })();
  }, [selectedLevel]);

  const unlockPlaceForLevel = useCallback(
    async levelTitle => {
      const idxToUnlock = places.findIndex(
        p => p.category === levelTitle && !p.unlocked,
      );
      const newPlaces = places.slice();
      if (idxToUnlock !== -1) {
        newPlaces[idxToUnlock] = { ...newPlaces[idxToUnlock], unlocked: true };
        setPlaces(newPlaces);
        await AsyncStorage.setItem(STORAGE_PLACES, JSON.stringify(newPlaces));
        return newPlaces[idxToUnlock];
      }
      const firstLocked = newPlaces.findIndex(p => !p.unlocked);
      if (firstLocked !== -1) {
        newPlaces[firstLocked] = { ...newPlaces[firstLocked], unlocked: true };
        setPlaces(newPlaces);
        await AsyncStorage.setItem(STORAGE_PLACES, JSON.stringify(newPlaces));
        return newPlaces[firstLocked];
      }
      return null;
    },
    [places],
  );

  const finishLevel = useCallback(
    async (levelIndex, levelTitle, didPass) => {
      if (didPass) {
        const newCompleted = completed.slice();

        if (levelIndex >= newCompleted.length) {
          newCompleted.length = levelIndex + 1;
          for (let i = 0; i < newCompleted.length; i++) {
            if (newCompleted[i] === undefined) newCompleted[i] = false;
          }
        }
        newCompleted[levelIndex] = true;
        setCompleted(newCompleted);
        await AsyncStorage.setItem(
          STORAGE_COMPLETED,
          JSON.stringify(newCompleted),
        );

        await unlockPlaceForLevel(levelTitle);
      } else {
      }
    },
    [completed, unlockPlaceForLevel],
  );

  const value = {
    places,
    completed,
    selectedLevel,
    setSelectedLevel,
    unlockPlaceForLevel,
    finishLevel,
    setPlaces,
    setCompleted,
    streetsAndPeacksSavedList,
    saveStreetsAndPeacksCard,
    getStreetsAndPeacksCards,
    removeStreetsAndPeacksCard,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
