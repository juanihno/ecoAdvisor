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
    fontSize: 18,
  },

  btnContainer: {
    position: "absolute",
    top: 70,
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
  switch: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
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
