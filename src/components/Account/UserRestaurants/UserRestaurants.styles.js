import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  content: {
    backgroundColor: "#fff",
    marginTop: 0,
    marginVertical: 40,
    marginHorizontal: 2,
  },
  img: {
    width: "100%",
    height: 150,
  },

  info: {
    padding: 15,
  },
  name: {
    fontWeight: "bold",
  },
  address: {
    paddingTop: 2,
    color: "grey",
    fontSize: 12,
  },
  favorite: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 100,
    padding: 5,
    paddingLeft: 15,
  },
  map: {
    position: "absolute",
    top: 0,
    right: 35,
    // backgroundColor: "grey",
    borderBottomLeftRadius: 100,
    padding: 5,
    paddingLeft: 15,
  },
  imgContainer: {
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
    // flexDirection: "column",
    // alignItems: "space-between",
    // // justifyContent: "space-between",
    // // marginTop: 10,
  },
  images: {
    width: 20,
    height: 20,
  },
});
