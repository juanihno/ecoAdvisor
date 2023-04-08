import { View } from 'react-native';
import React, { useState } from 'react';
import { styles } from './Info.styles';
import { Text, ListItem, Icon } from 'react-native-elements';
import { map } from 'lodash';
import { Map } from '../../Shared';

export function Info(props) {
  const { restaurant } = props;
  // console.log("fullyVegan", restaurant.menu.VeganOptions);

  const listInfo = [
    {
      text: `${restaurant.address}`,
      iconName: 'map-marker',
      iconType: 'material-community',
      action: null,
    },
    {
      text: `${restaurant.email}`,
      iconName: 'at',
      iconType: 'material-community',
      action: null,
    },
    {
      text: `${restaurant.phone}`,
      iconName: 'phone',
      iconType: 'material-community',
      action: null,
    },
    // restaurant.menu.VeganOptions && {
    //   text: "Vegan Options",
    //   iconName: "leaf",
    //   iconType: "material-community",
    //   action: null,
    // },
  ];

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Details</Text>
      <Map location={restaurant.location} name={restaurant.name} height={100} />
      {map(
        listInfo,
        (item, index) =>
          //if item.text is not empty then render the ListItem component else return null (nothing)
          item.text && (
            <ListItem key={index} bottomDivider style={styles.listItem}>
              <Icon name={item.iconName} type={item.iconType} color="#00a680" />
              <ListItem.Content>
                <ListItem.Title>{item.text}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )
      )}
    </View>
  );
}
