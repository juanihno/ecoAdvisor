import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  content: {
    margin: 15,
  },
  titleView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imgContainer: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    // flexDirection: "column",
    // alignItems: "space-between",
    // justifyContent: "stretch",
    // // marginTop: 10,
  },
  img: {
    width: 20,
    height: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    marginTop: 5,
    color: "#828282",
  },
});
