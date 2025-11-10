import { View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}
export default Card;

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: Colors.primary600,
    marginTop: 0,
    marginHorizontal: 24,
    borderRadius: 12,
    elevation: 8,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 0.3,
  },
});
