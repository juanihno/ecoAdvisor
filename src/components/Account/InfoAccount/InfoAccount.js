import { View } from "react-native";
import React, { useState } from "react";
import { styles } from "./InfoAccount.styles";
import { Text, ListItem, Icon } from "react-native-elements";
import { map } from "lodash";
// import { Map } from "../../Shared";
import { ChangeAddress } from "../ChangeAddress";
import { ChangePhone } from "../ChangePhone";
import { ChangeName } from "../ChangeName";
import { ChangeDescription } from "../ChangeDescription";
import { Modal } from "../../../components";
import { ChangeEmail } from "../ChangeEmail/ChangeEmail";
import { MapAccount } from "../MapAccount";
import { MapFormAccount } from "../MapFormAccount";

export function InfoAccount(props) {
  const { restaurant, onReload, getRestaurantData } = props;
  console.log("restaurant", restaurant.address);

  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);
  const [showMap, setShowMap] = useState(false);
  const onOpenCloseMap = () => {
    setShowMap((prevState) => !prevState);
  };
  // console.log("fullyVegan", restaurant.menu.VeganOptions);

  const listInfo = [
    {
      text: `${restaurant.name}`,
      iconName: "silverware-fork-knife",
      iconType: "material-community",
      iconColor: "#00a680",
      iconNameRight: "chevron-right",
      action: null,
      onPress: () => selectedComponent("changeName"),
    },
    {
      text: `${restaurant.description}`,
      iconName: "pen",
      iconType: "material-community",
      iconColor: "#00a680",
      iconNameRight: "chevron-right",
      action: null,
      onPress: () => selectedComponent("changeDescription"),
    },

    {
      text: `${restaurant.address}`,
      iconName: "map-marker",
      iconType: "material-community",
      iconColor: "#00a680",
      iconNameRight: "chevron-right",
      action: null,
      onPress: () => selectedComponent("changeAddress"),
    },
    {
      text: `${restaurant.email}`,
      iconName: "at",
      iconType: "material-community",
      iconColor: "#00a680",
      iconNameRight: "chevron-right",
      action: null,
      onPress: () => selectedComponent("changeEmail"),
    },
    {
      text: `${restaurant.phone}`,
      iconName: "phone",
      iconType: "material-community",
      iconColor: "#00a680",
      iconNameRight: "chevron-right",
      action: null,
      onPress: () => selectedComponent("changePhone"),
    },
  ];
  const selectedComponent = (key) => {
    if (key === "changeAddress") {
      setRenderComponent(
        <ChangeAddress
          onClose={onCloseOpenModal}
          onReload={onReload}
          restaurantId={restaurant.id}
          getRestaurantData={getRestaurantData}
        />
      );
    }

    if (key === "changeEmail") {
      setRenderComponent(
        <ChangeEmail
          onClose={onCloseOpenModal}
          onReload={onReload}
          getRestaurantData={getRestaurantData}
          restaurantId={restaurant.id}
        />
      );
    }
    if (key === "changePhone") {
      setRenderComponent(
        <ChangePhone
          onClose={onCloseOpenModal}
          getRestaurantData={getRestaurantData}
          restaurantId={restaurant.id}
        />
      );
    }
    if (key === "changeName") {
      setRenderComponent(
        <ChangeName
          onClose={onCloseOpenModal}
          getRestaurantData={getRestaurantData}
          restaurantId={restaurant.id}
        />
      );
    }
    if (key === "changeDescription") {
      setRenderComponent(
        <ChangeDescription
          onClose={onCloseOpenModal}
          getRestaurantData={getRestaurantData}
          restaurantId={restaurant.id}
        />
      );
    }

    onCloseOpenModal();
  };
  //   const menuOptions = getMenuOptions(selectedComponent);

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Details</Text>
      <MapAccount
        location={restaurant.location}
        name={restaurant.name}
        height={100}
        onOpenCloseMap={onOpenCloseMap}
        show={showMap}
      />

      {map(
        listInfo,
        (item, index) => (
          //if item.text is not empty then render the ListItem component else return null (nothing)
          // item.text && (
          <ListItem
            key={index}
            bottomDivider
            style={styles.listItem}
            onPress={item.onPress}
          >
            <Icon
              name={item.iconName}
              type={item.iconType}
              color={item.iconColor}
            />
            <ListItem.Content>
              <ListItem.Title>{item.text}</ListItem.Title>
            </ListItem.Content>
            <Icon
              name={item.iconNameRight}
              type={item.iconType}
              color={item.iconColor}
            />
          </ListItem>
        )
        // )
      )}
      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
      <MapFormAccount
        restaurantId={restaurant.id}
        show={showMap}
        close={onOpenCloseMap}
        getRestaurantData={getRestaurantData}
        locationMap={restaurant.location}
      />
    </View>
  );
}

// function getMenuOptions(selectedComponent, restaurant) {
//   return [
//     {
//       //   text: `${restaurant.address}`,
//       text: "Change address",

//       iconName: "map-marker",
//       iconType: "material-community",
//       action: null,
//       onPress: () => selectedComponent("changeAddress"),
//     },
//     {
//       text: "Change address",
//       iconName: "at",
//       iconType: "material-community",
//       action: null,
//       onPress: () => selectedComponent("changeEmail"),
//     },
//     {
//       text: "Change address",
//       iconName: "phone",
//       iconType: "material-community",
//       action: null,
//       onPress: () => selectedComponent("changePhone"),
//     },
//   ];
// }
