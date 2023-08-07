import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { ListItem, Button } from "react-native-elements";

export function RankingScreen() {
  const [restaurants, setRestaurants] = useState(null);

  return (
    <ListItem.Swipeable
      bottomDivider
      // containerStyle={styles.container}
      rightContent={
        <Button
          title="Delete"
          icon={{ type: "material-community", name: "trash-can" }}
          buttonStyle={{
            minHeight: "100%",
            backgroundColor: "red",
          }}
          onPress={() => console.log("eliminando")}
        />
      }
    >
      {/* <Avatar
        size="large"
        rounded
        source={{ uri: item.images[0] }}
        containerStyle={styles.image}
      /> */}
      <ListItem.Content>
        <ListItem.Title>titulo</ListItem.Title>
        <ListItem.Subtitle>adress</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
}
