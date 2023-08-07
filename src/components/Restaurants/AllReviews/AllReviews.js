import { View, Dimensions } from "react-native";
import {
  Text,
  AirbnbRating,
  ListItem,
  Avatar,
  Button,
} from "react-native-elements";

import React from "react";
import { styles } from "./AllReviews.styles";
import { map, size } from "lodash";
import { Loading } from "../../../components/Shared";

export function AllReviews(props) {
  const { reviews } = props;
  const { width, height } = Dimensions.get("window");

  if (!reviews) return <Loading show text="Cargando" />;
  if (size(reviews) === 0)
    return <Text style={styles.noReviews}>There arent reviews yet</Text>;
  return (
    <View style={styles.content}>
      {map(reviews, (data) => {
        const createReview = new Date(data.createdAt.seconds * 1000);

        return (
          <ListItem.Swipeable
            onSwipeEnd={() => console.log("DELETEEEEEEEEEEEEEEEEEEEE")}
            rightWidth={width}
            // onPress={() => console.log("DELETEEEEEEEEEEEEEEEEEEEE")}
            // justifyContent="space-between"
            rightContent={
              <Button
                title="Delete"
                icon={{ type: "material-community", name: "trash-can" }}
                containerStyle={{
                  textAlign: "center",
                  backgroundColor: "transparent",
                }}
                buttonStyle={{
                  minHeight: "85%",
                  // textAlign: "center",
                  // alignContent: "center",
                  width: width / 1.2,
                  backgroundColor: "red",
                  marginTop: 15,
                  marginEnd: 90,
                  borderRadius: 10,
                }}
                onPress={() => console.log("DELETEEEEEEEEEEEEEEEEEEEE")}
              />
            }
            // rightStyle={{
            //   backgroundColor: "red",
            //   // paddingVertical: 20,
            //   marginTop: 10,
            //   borderRadius: 10,
            //   // width: width / 1.5,
            //   // height: "100%",
            // }}
            key={data.id}
            bottomDivider
            containerStyle={styles.review}
          >
            <View>
              <Avatar
                size={50}
                rounded
                icon={{ type: "material", name: "person" }}
                containerStyle={styles.avatar}
                source={{ uri: data.avatar }}
              />
              <Text style={styles.avatarName}>{data.userName}</Text>
            </View>

            <ListItem.Content>
              <ListItem.Title style={styles.title}>{data.title}</ListItem.Title>
              <View style={styles.subtitle}>
                <Text style={styles.comment}>{data.comment}</Text>

                <View style={styles.contentRatingDate}>
                  <AirbnbRating
                    defaultRating={data.rating}
                    showRating={false}
                    size={15}
                    isDisabled
                    starContainerStyle={styles.starContainer}
                  />

                  <Text style={styles.date}>
                    {createReview.toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </ListItem.Content>
          </ListItem.Swipeable>
        );
      })}
    </View>
  );
}
