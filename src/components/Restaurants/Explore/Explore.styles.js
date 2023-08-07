import { StyleSheet } from "react-native";
import {
  width,
  height,
  MARGIN,
  CARD_WIDTH,
  CARD_HEIGHT,
  HEIGHT,
  SPACING_FOR_CARD_INSET,
} from "../../../screens/Restaurants/RestaurantsScreen";
// import { isDeviceWidth375_667 } from "../../../utils/mediaQuery";
import { isDeviceWidth370_391 } from "../../../utils";

// import { width } from "../../../screens/Restaurants/RestaurantsScreen";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 15,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  searchBoxPrueba: {
    position: "absolute",
    // marginTop: Platform.OS === "ios" ? 40 : 20,
    // flexDirection: "row",
    // backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    // borderRadius: 15,
    // padding: 10,
    // shadowColor: "#ccc",
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.5,
    // shadowRadius: 5,
    // elevation: 10,
  },
  chipsScrollView: {
    position: "absolute",
    // top: Platform.OS === "ios" ? 30 : 20,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    flex: 1,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    borderRadius: 20,
    // marginBottom: 15,
  },

  cardImage: {
    // flex: 3,
    height: CARD_HEIGHT / 2,
    // width: CARD_WIDTH,
    width: "100%",
    height: "50%",
    alignSelf: "center",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  textContent: {
    // height: CARD_HEIGHT / 2,
    // height: "50%",
    // flex: 2,
    padding: 10,
  },
  rating: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },

  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: isDeviceWidth370_391 ? 0 : 3,
    borderRadius: 15,
    borderWidth: isDeviceWidth370_391 ? 0 : 1,
    borderColor: "#FF6347",
    // borderWidth: CARD_HEIGHT < 215 ? 0 : 1,
    // borderWidth: height > 750 ? 0 : 1,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
