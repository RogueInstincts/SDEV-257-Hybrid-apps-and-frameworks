import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "space_between",
    justifyContent: "space_between",
    padding: 20,
  },
  item: {
    padding: 10,
    margin: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: "lightblue",
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    padding: 2,
  },
});