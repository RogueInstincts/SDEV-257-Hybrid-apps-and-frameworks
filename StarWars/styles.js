import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space_between",
    padding: 0,
  },
  item: {
    width: 330,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#aaa',
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
  textInput: {
    padding: 15,
    margin: 4,
    marginBottom: 15,
    backgroundColor: "white",
    fontSize: 15,
    height: 50,
    width: 350,
    borderColor: "#555",
    borderWidth: 1,
    borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderColor: "#555",
    borderWidth: 1,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: "lightblue",
    borderRadius: 20,
    padding: 10,
  },
  blank: {
    width: 400,
  },
  placeholderImage: {
    width: 295,
    height: 187,
    margin: 10,
  },
  remoteImage: {
    width: 295,
    height: 187,
    margin: 10,
  },
  scrollView: {
    marginLeft: 30,
  },
});