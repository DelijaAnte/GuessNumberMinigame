import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
function PrimaryButton({ children, onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.buttonInnerContainer,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
        android_ripple={{ color: "rgba(255,255,255,0.2)" }}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
}
export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 28,
    elevation: 6,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.3,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});
