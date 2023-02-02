import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  mapStyle: {
    // flex: 1,
    width: "100%",
    height: "50%",
  },
  searchBar: {
    backgroundColor: "transparent",
    // borderTopColor: "#00a680",
    // borderBottomColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 5,
  },
  inputSearch: {
    backgroundColor: "#fff",
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    // borderColor: "#00a680",
  },
  searchBox: {
    position: "absolute",
    marginTop: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  restaurant: {
    flexDirection: "column",
    width: 150,
    margin: 15,
    padding: 5,
    backgroundColor: "#fff",
    shadowColor: "#00a680",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
    resizeMode: "contain",
  },
  image: {
    width: "100%",
    height: 90,
  },
  name: {
    fontWeight: "bold",
  },
  info: {
    color: "#828282",
    paddingRight: 10,
    marginTop: 3,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 50,
    height: 50,
  },
});
