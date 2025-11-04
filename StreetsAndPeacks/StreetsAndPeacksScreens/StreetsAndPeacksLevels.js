import React, { useEffect, useState } from 'react';

import StreetsAndPeacksBackground from '../StreetsAndPeacksComponents/StreetsAndPeacksBackground';
import { useStore } from '../StreetsAndPeacksStore/StreetsAndPeacksContext';
const { width, height } = Dimensions.get('window');
import { streetsAndPeacksQuiz } from '../StreetsAndPeacksData/streetsAndPeacksQuiz';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  Share,
  Alert,
} from 'react-native';

export default function StreetsAndPeacksQuizSingle() {
  const {
    completed: streetsAndPeacksCompleted,
    selectedLevel: streetsAndPeacksSelectedLevel,
    setSelectedLevel: setStreetsAndPeacksSelectedLevel,
    finishLevel: streetsAndPeacksFinishLevel,
  } = useStore();
  const [streetsAndPeacksMode, setStreetsAndPeacksMode] = useState('levels');
  const [streetsAndPeacksLevelIndex, setStreetsAndPeacksLevelIndex] =
    useState(0);
  const [streetsAndPeacksQIndex, setStreetsAndPeacksQIndex] = useState(0);
  const [streetsAndPeacksSelectedOption, setStreetsAndPeacksSelectedOption] =
    useState(null);
  const [streetsAndPeacksCorrectCount, setStreetsAndPeacksCorrectCount] =
    useState(0);
  const [streetsAndPeacksFinished, setStreetsAndPeacksFinished] =
    useState(false);
  const [streetsAndPeacksPassed, setStreetsAndPeacksPassed] = useState(false);

  useEffect(() => {
    if (
      Array.isArray(streetsAndPeacksCompleted) &&
      streetsAndPeacksCompleted.length < streetsAndPeacksQuiz.length
    ) {
    }
  }, [streetsAndPeacksCompleted]);

  const openLevel = index => {
    setStreetsAndPeacksSelectedLevel(index);
    setStreetsAndPeacksLevelIndex(index);
    setStreetsAndPeacksQIndex(0);
    setStreetsAndPeacksSelectedOption(null);
    setStreetsAndPeacksCorrectCount(0);
    setStreetsAndPeacksFinished(false);
    setStreetsAndPeacksPassed(false);
    setStreetsAndPeacksMode('quiz');
  };

  const handleSelect = i => {
    if (streetsAndPeacksSelectedOption !== null) return;
    setStreetsAndPeacksSelectedOption(i);
    const question =
      streetsAndPeacksQuiz[streetsAndPeacksLevelIndex].questions[
        streetsAndPeacksQIndex
      ];
    const isCorrect = i === question.correctIndex;
    const newCorrect = streetsAndPeacksCorrectCount + (isCorrect ? 1 : 0);
    setStreetsAndPeacksCorrectCount(newCorrect);

    setTimeout(() => {
      const next = streetsAndPeacksQIndex + 1;
      if (
        next < streetsAndPeacksQuiz[streetsAndPeacksLevelIndex].questions.length
      ) {
        setStreetsAndPeacksQIndex(next);
        setStreetsAndPeacksSelectedOption(null);
      } else {
        finishQuiz(newCorrect);
      }
    }, 2000);
  };

  const finishQuiz = async finalCorrectCount => {
    const didPass = finalCorrectCount >= 3;
    setStreetsAndPeacksPassed(didPass);
    setStreetsAndPeacksFinished(true);
    setStreetsAndPeacksMode('result');

    await streetsAndPeacksFinishLevel(
      streetsAndPeacksLevelIndex,
      streetsAndPeacksQuiz[streetsAndPeacksLevelIndex].title,
      didPass,
    );
  };

  const backToLevels = () => {
    setStreetsAndPeacksMode('levels');
    setStreetsAndPeacksSelectedOption(null);
    setStreetsAndPeacksQIndex(0);
    setStreetsAndPeacksCorrectCount(0);
    setStreetsAndPeacksFinished(false);
    setStreetsAndPeacksPassed(false);
  };

  const tryAgain = () => {
    setStreetsAndPeacksQIndex(0);
    setStreetsAndPeacksSelectedOption(null);
    setStreetsAndPeacksCorrectCount(0);
    setStreetsAndPeacksFinished(false);
    setStreetsAndPeacksPassed(false);
    setStreetsAndPeacksMode('quiz');
  };

  const onNextLevel = () => {
    const nextIndex =
      (streetsAndPeacksLevelIndex + 1) % streetsAndPeacksQuiz.length;
    setStreetsAndPeacksSelectedLevel(nextIndex);
    setStreetsAndPeacksLevelIndex(nextIndex);
    setStreetsAndPeacksQIndex(0);
    setStreetsAndPeacksSelectedOption(null);
    setStreetsAndPeacksCorrectCount(0);
    setStreetsAndPeacksFinished(false);
    setStreetsAndPeacksPassed(false);
    setStreetsAndPeacksMode('quiz');
  };

  const shareQuizResult = async () => {
    try {
      await Share.share({
        message: `Scored ${streetsAndPeacksCorrectCount} out of ${streetsAndPeacksQuiz[streetsAndPeacksLevelIndex].questions.length} in the ${streetsAndPeacksQuiz[streetsAndPeacksLevelIndex].title} quiz!`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const renderLevelItem = ({ item, index }) => {
    const isCompleted =
      Array.isArray(streetsAndPeacksCompleted) &&
      streetsAndPeacksCompleted[index] === true;
    const isSelected = streetsAndPeacksSelectedLevel === index;
    let btnStyle = [styles.streetsAndPeacksLevelButton];
    if (isCompleted) btnStyle.push(styles.streetsAndPeacksLevelCompleted);
    else if (isSelected) btnStyle.push(styles.streetsAndPeacksLevelSelected);
    else btnStyle.push(styles.streetsAndPeacksLevelDefault);

    return (
      <View style={styles.streetsAndPeacksLevelRow}>
        <TouchableOpacity
          style={btnStyle}
          onPress={() => openLevel(index)}
          activeOpacity={0.8}
        >
          <Text style={styles.streetsAndPeacksLevelButtonText}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (streetsAndPeacksMode === 'levels') {
    return (
      <StreetsAndPeacksBackground>
        <SafeAreaView style={styles.streetsAndPeacksSafe}>
          <View style={styles.streetsAndPeacksContainer}>
            <Text style={styles.streetsAndPeacksTitle}>LEVELS</Text>
            <FlatList
              scrollEnabled={false}
              data={streetsAndPeacksQuiz}
              keyExtractor={(_, i) => String(i)}
              renderItem={renderLevelItem}
              contentContainerStyle={styles.streetsAndPeacksList}
            />
          </View>
        </SafeAreaView>
      </StreetsAndPeacksBackground>
    );
  }

  if (streetsAndPeacksMode === 'quiz') {
    const level = streetsAndPeacksQuiz[streetsAndPeacksLevelIndex];
    const question = level.questions[streetsAndPeacksQIndex];

    return (
      <StreetsAndPeacksBackground>
        <ScrollView contentContainerStyle={styles.streetsAndPeacksContainer}>
          <View style={styles.streetsAndPeacksHeader}>
            <Text style={styles.streetsAndPeacksLevelTitle}>{level.title}</Text>
          </View>
          {question.image ? (
            <Image
              source={question.image}
              style={styles.streetsAndPeacksImage}
            />
          ) : null}

          <View style={{ borderWidth: 3, borderColor: '#9F3F00' }}>
            <View style={{ padding: 8, backgroundColor: 'transparent' }}>
              <View style={styles.streetsAndPeacksWlccnt}>
                <Text style={styles.streetsAndPeacksQuestionText}>
                  {question.text}
                </Text>
                {question.options.map((opt, i) => {
                  const isSelected = streetsAndPeacksSelectedOption === i;
                  const isCorrect = i === question.correctIndex;
                  let optionStyle = [styles.streetsAndPeacksOption];
                  let optionTextStyle = [styles.streetsAndPeacksOptionText];
                  if (streetsAndPeacksSelectedOption !== null) {
                    if (isSelected && isCorrect) {
                      optionStyle.push(styles.streetsAndPeacksOptionCorrect);
                      optionTextStyle.push(
                        styles.streetsAndPeacksOptionTextCorrect,
                      );
                    } else if (isSelected && !isCorrect) {
                      optionStyle.push(styles.streetsAndPeacksOptionWrong);
                      optionTextStyle.push(
                        styles.streetsAndPeacksOptionTextWrong,
                      );
                    } else if (!isSelected && isCorrect) {
                      optionStyle.push(styles.streetsAndPeacksOptionCorrectDim);
                      optionTextStyle.push(
                        styles.streetsAndPeacksOptionTextCorrect,
                      );
                    }
                  }
                  return (
                    <TouchableOpacity
                      key={i}
                      style={optionStyle}
                      onPress={() => handleSelect(i)}
                      activeOpacity={0.8}
                    >
                      <Text style={optionTextStyle}>{opt}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </StreetsAndPeacksBackground>
    );
  }

  return (
    <StreetsAndPeacksBackground>
      <View style={styles.streetsAndPeacksCenter}>
        {streetsAndPeacksPassed ? (
          <>
            <Text style={styles.streetsAndPeacksCompleteTitle}>
              LEVEL COMPLETE!
            </Text>
            <Text style={styles.streetsAndPeacksCompleteText}>
              You’ve unlocked new locations on Montreal’s map. Your guide is
              impressed — keep exploring to master the city!
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 30, gap: 5 }}>
              <TouchableOpacity onPress={shareQuizResult}>
                <Image
                  source={require('../../assets/images/streetsnpeackshr.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.streetsAndPeacksActionButton]}
                onPress={onNextLevel}
              >
                <Text style={styles.streetsAndPeacksActionText}>
                  Next Level
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={backToLevels}>
                <Image
                  source={require('../../assets/images/streetsnpeackshome.png')}
                />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.streetsAndPeacksCompleteTitle}>GAME OVER</Text>
            <Text style={styles.streetsAndPeacksCompleteText}>
              You missed a few turns on Montreal’s map — but every explorer
              needs a break. Try again and see how far your knowledge takes you.
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 30, gap: 5 }}>
              <TouchableOpacity onPress={() => shareQuizResult()}>
                <Image
                  source={require('../../assets/images/streetsnpeackshr.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.streetsAndPeacksActionButton]}
                onPress={tryAgain}
              >
                <Text style={styles.streetsAndPeacksActionText}>Try Again</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={backToLevels}>
                <Image
                  source={require('../../assets/images/streetsnpeackshome.png')}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </StreetsAndPeacksBackground>
  );
}

const styles = StyleSheet.create({
  streetsAndPeacksSafe: { flex: 1 },
  streetsAndPeacksContainer: {
    paddingHorizontal: 22,
    paddingTop: height * 0.08,
    paddingBottom: 130,
  },
  streetsAndPeacksWlccnt: {
    width: '100%',
    padding: 12,
    backgroundColor: '#FFE8B9',
    minHeight: 110,
  },
  streetsAndPeacksTitle: {
    color: '#9F3F00',
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 18,
    fontStyle: 'italic',
  },
  streetsAndPeacksList: { paddingBottom: 40 },
  streetsAndPeacksLevelRow: {
    marginBottom: 8,
    alignItems: 'center',
    width: '100%',
  },
  streetsAndPeacksLevelButton: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 6,
  },
  streetsAndPeacksLevelDefault: { backgroundColor: '#A84A10' },
  streetsAndPeacksLevelSelected: { backgroundColor: '#C6482A' },
  streetsAndPeacksLevelCompleted: { backgroundColor: '#2E8B57' },
  streetsAndPeacksLevelButtonText: {
    color: '#FFE8B9',
    fontSize: 16,
    fontWeight: '700',
  },

  streetsAndPeacksLevelTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFE8B9',
    textAlign: 'center',
  },
  streetsAndPeacksHeader: {
    width: '93%',
    alignSelf: 'center',
    backgroundColor: '#75340C',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 110,
    height: 36,
  },
  streetsAndPeacksImage: {
    width: width - 68,
    height: 210,
    borderRadius: 12,
    marginBottom: 30,
    alignSelf: 'center',
  },
  streetsAndPeacksCard: {
    backgroundColor: '#FFE8B9',
    padding: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#9F3F00',
  },
  streetsAndPeacksQuestionText: {
    color: '#351500',
    fontSize: 16,
    marginBottom: 12,
    fontStyle: 'italic',
    fontWeight: '600',
  },
  streetsAndPeacksOption: {
    backgroundColor: '#E87931',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  streetsAndPeacksOptionText: {
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'italic',
    color: '#000',
  },
  streetsAndPeacksOptionCorrect: { backgroundColor: '#FFBC8F' },
  streetsAndPeacksOptionWrong: { backgroundColor: '#B22222' },
  streetsAndPeacksOptionCorrectDim: { backgroundColor: '#FFBC8F' },
  streetsAndPeacksOptionTextCorrect: { color: '#FFE8B9', fontWeight: '800' },
  streetsAndPeacksOptionTextWrong: { color: '#FFE8B9', fontWeight: '800' },

  streetsAndPeacksCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingBottom: 50,
  },
  streetsAndPeacksCompleteTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#9F3F00',
    marginBottom: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  streetsAndPeacksCompleteText: {
    fontSize: 20,
    color: '#9F3F00',
    textAlign: 'center',
    marginBottom: 22,
    fontStyle: 'italic',
    fontWeight: '800',
  },
  streetsAndPeacksActionButton: {
    backgroundColor: '#75340C',
    borderRadius: 6,
    width: 210,
    alignItems: 'center',
    justifyContent: 'center',
    height: 37,
  },
  streetsAndPeacksActionText: {
    color: '#FFE8B9',
    fontWeight: '600',
    fontSize: 16,
  },
  streetsAndPeacksActionTextOutline: {
    color: '#75340C',
    fontWeight: '700',
    fontSize: 16,
  },

  streetsAndPeacksSmallBack: { marginTop: 10, alignSelf: 'center' },
  streetsAndPeacksSmallBackText: {
    color: '#5E2509',
    textDecorationLine: 'underline',
  },
});
