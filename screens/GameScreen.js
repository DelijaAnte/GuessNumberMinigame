import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "../components/ui/Title";
import { useState, useEffect, use } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Alert } from "react-native";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/colors";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver, guessRounds.length]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Title>Opponent's Guess: {currentGuess}</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
            <Ionicons name="arrow-up" size={24} color="white" />
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="arrow-down" size={24} color="white" />
          </PrimaryButton>
        </View>
      </Card>
      <FlatList
        data={guessRounds}
        renderItem={(itemData) => {
          const roundNumber = guessRounds.length - itemData.index;
          return (
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>#{roundNumber}</Text>
              <Text style={styles.listItemText}>{itemData.item}</Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        style={styles.listContainer}
        contentContainerStyle={styles.listContentContainer}
      />
    </SafeAreaView>
  );
}
export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 16,
    gap: 16,
  },
  instructionText: {
    marginTop: 16,
  },
  listContainer: {
    flex: 1,
  },
  listContentContainer: {
    padding: 16,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.primary800,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: Colors.primary600,
    color: Colors.accent500,
  },
  listItemText: {
    fontFamily: "open-sans",
    color: Colors.accent500,
  },
});
