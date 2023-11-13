import { View, Text } from "react-native";
import React, { useState } from "react";
import { styles } from "./Carousel.styles";
import CarouselSnap, { Pagination } from "react-native-snap-carousel";
import { Image } from "react-native-elements";
import { Loading } from "../../../components/Shared";
import { size } from "lodash";

export function Carousel(props) {
  const { arrayImages, width, height, hideDots } = props;
  // console.log("COSITAS", arrayImages, width, height);
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const renderItem = ({ item }) => (
    <Image
      style={{ height, width: "50%", resizeMethod: "auto" }}
      source={{ uri: item }}
    />
  );
  const pagination = () => {
    return (
      <Pagination
        dotsLength={size(arrayImages)}
        activeDotIndex={activeDotIndex}
        containerStyle={styles.dotsContainer}
        dotStyle={styles.dot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  if (!arrayImages) return <Loading show text="Loading..." />;

  return (
    <View styles={styles.content}>
      <CarouselSnap
        layout="default"
        data={arrayImages}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveDotIndex(index)}
      />
      {!hideDots && pagination()}
    </View>
  );
}
