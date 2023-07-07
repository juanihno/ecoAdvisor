import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  //   content: {
  //     backgroundColor: "#fff",
  //     flex: 1,
  //   },
  content: {
    marginHorizontal: 10,
    marginTop: 15,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  subText: {
    fontSize: 16,
    marginLeft: 20,
  },

  btnContainer: {
    position: "absolute",
    top: 70,
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
  sView: {},

  switch: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  optText: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 20,
    marginBottom: 10,
    // color: "#00a680",
  },

  switchRaw: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },

  mapAction: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  btnMapContainerSave: {
    paddingRight: 5,
    width: "50%",
  },
  btnMapSave: {
    backgroundColor: "#00a680",
  },
  btnMapContainerClose: {
    paddingLeft: 5,
    width: "50%",
  },
  btnMapClose: {
    backgroundColor: "#a60d0d",
  },
});
