import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  content: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  noReviews: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ccc",
    textAlign: "center",
    paddingTop: "50%",
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
