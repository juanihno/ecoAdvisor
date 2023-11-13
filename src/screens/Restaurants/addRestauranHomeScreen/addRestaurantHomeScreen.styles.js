import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "column",
    marginHorizontal: 0,
  },
  view: {
    flex: 1,
    // flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 300,
    position: "absolute",
    bottom: 200,
    // left: 0,
    width: "100%",
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    // justifyContent: "center",
    height: "100%",
    width: "100%",
    // marginBottom: 40,
  },

  btnContainer: {
    marginTop: 20,
    width: "75%",
    borderRadius: 15,
  },
  btnTitle: {
    // color: "rgba(255, 255, 255, 1)",
    color: "green",
  },
  btn: {
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    // opacity: 0.5,
    borderRadius: 15,
    borderColor: "green",
    borderWidth: 2,
  },
});
