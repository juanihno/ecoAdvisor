import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  noReviews: {
    justifyContent: "center",
  },
  noReviewsText: {
    paddingTop: "50%",

    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#ccc",
  },
  alert: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "65%",
  },
  alertText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    justifyContent: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  all: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    fontSize: 15,
    fontWeight: "bold",
    color: "#95b53b",
  },

  chipsContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-evenly",
    marginTop: 10,
    marginBottom: 10,
    // marginHorizontal: 10,
    // marginTop: 10,
  },
  chips: {
    // backgroundColor: "#95b53b",
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  chip: {
    // backgroundColor: "#95b53b",
    marginHorizontal: 5,
    marginTop: 5,
    color: "#95b53b",
  },
  avatarName: {
    paddingLeft: 10,
    paddingTop: 10,
  },
  review: {
    paddingVertical: 20,
    marginTop: 5,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
  },
  subtitle: {
    flex: 1,
    flexDirection: "column",
    marginTop: 5,
  },
  subtitleText: {
    fontSize: 16,
  },
  comment: {
    paddingRight: 50,
  },
  contentRatingDate: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  starContainer: {
    height: 10,
    flex: 1,
    width: 100,
    justifyContent: "flex-start",
  },
  date: {
    color: "#828282",
    fontSize: 12,
  },
  avatar: {
    marginRight: 20,
    backgroundColor: "green",
  },
});
