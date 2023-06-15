import { View } from "react-native";
import { Text, CheckBox, Icon, ListItem } from "react-native-elements";
import React, { useState } from "react";
import { styles } from "./RestaurantCheckBox.styles";
import Data from "./RestaurantCheckboxesData.json";

export function RestaurantCheckBox(props) {
  const { formik } = props;

  const handleCheckboxes = (type, value) => {
    formik.setFieldValue(`${type}.${value}`, !formik.values[type][value]);
  };

  // console.log("Formik values", formik.values);

  const [showCoffee, setShowCoffee] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showWaste, setShowWaste] = useState(false);
  const [showSupplier, setShowSupplier] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);

  return (
    <View style={styles.content}>
      <ListItem
        style={styles.listItem}
        bottomDivider
        onPress={() => {
          showCoffee ? setShowCoffee(false) : setShowCoffee(true);
        }}
      >
        <Icon type={"material-community"} name={"coffee"} color={"#00a680"} />
        <ListItem.Content>
          <ListItem.Title>{"Coffee"}</ListItem.Title>
        </ListItem.Content>
        <Icon
          type={"material-community"}
          name={"arrow-down-drop-circle-outline"}
          color={"#00a680"}
          onPress={() => {
            showCoffee ? setShowCoffee(false) : setShowCoffee(true);
          }}
        />
      </ListItem>
      {showCoffee ? (
        <View style={styles.checkboxContainer}>
          {Data.coffee.map((item) => {
            return (
              <CheckBox
                title={item.title}
                checked={formik.values.coffee[item.value]}
                onPress={() => handleCheckboxes("coffee", item.value)}
                key={`coffee-${item.id}`}
              />
            );
          })}
          <View style={styles.closeIconContainer}>
            <Icon
              type={"material-community"}
              name={"arrow-up-drop-circle-outline"}
              color={"#00a680"}
              onPress={() => {
                showCoffee ? setShowCoffee(false) : setShowCoffee(true);
              }}
            />
          </View>
        </View>
      ) : null}
      <ListItem
        bottomDivider
        onPress={() => {
          showMenu ? setShowMenu(false) : setShowMenu(true);
        }}
      >
        <Icon type={"material-community"} name={"menu"} color={"#00a680"} />
        <ListItem.Content>
          <ListItem.Title>{"Menu"}</ListItem.Title>
        </ListItem.Content>
        <Icon
          type={"material-community"}
          name={"arrow-down-drop-circle-outline"}
          color={"#00a680"}
          onPress={() => {
            showMenu ? setShowMenu(false) : setShowMenu(true);
          }}
        />
      </ListItem>
      {showMenu ? (
        <View>
          {Data.menu.map((item) => {
            return (
              <CheckBox
                title={item.title}
                checked={formik.values.menu[item.value]}
                onPress={() => handleCheckboxes("menu", item.value)}
                key={`menu-${item.id}`}
              />
            );
          })}
          <View style={styles.closeIconContainer}>
            <Icon
              type={"material-community"}
              name={"arrow-up-drop-circle-outline"}
              color={"#00a680"}
              onPress={() => {
                showMenu ? setShowMenu(false) : setShowMenu(true);
              }}
            />
          </View>
        </View>
      ) : null}
      <ListItem
        bottomDivider
        onPress={() => {
          showWaste ? setShowWaste(false) : setShowWaste(true);
        }}
      >
        <Icon
          type={"material-community"}
          name={"delete-empty-outline"}
          color={"#00a680"}
        />
        <ListItem.Content>
          <ListItem.Title>{"Waste"}</ListItem.Title>
        </ListItem.Content>
        <Icon
          type={"material-community"}
          name={"arrow-down-drop-circle-outline"}
          color={"#00a680"}
          onPress={() => {
            showWaste ? setShowWaste(false) : setShowWaste(true);
          }}
        />
      </ListItem>
      {showWaste ? (
        <View>
          {Data.waste.map((item) => {
            return (
              <CheckBox
                title={item.title}
                checked={formik.values.waste[item.value]}
                onPress={() => handleCheckboxes("waste", item.value)}
                key={`waste-${item.id}`}
              />
            );
          })}
          <View style={styles.closeIconContainer}>
            <Icon
              type={"material-community"}
              name={"arrow-up-drop-circle-outline"}
              color={"#00a680"}
              onPress={() => {
                showWaste ? setShowWaste(false) : setShowWaste(true);
              }}
            />
          </View>
        </View>
      ) : null}
      <ListItem
        bottomDivider
        onPress={() => {
          showSupplier ? setShowSupplier(false) : setShowSupplier(true);
        }}
      >
        <Icon
          type={"material-community"}
          name={"lightbulb-on-outline"}
          color={"#00a680"}
        />
        <ListItem.Content>
          <ListItem.Title>{"Supplier"}</ListItem.Title>
        </ListItem.Content>
        <Icon
          type={"material-community"}
          name={"arrow-down-drop-circle-outline"}
          color={"#00a680"}
          onPress={() => {
            showSupplier ? setShowSupplier(false) : setShowSupplier(true);
          }}
        />
      </ListItem>
      {showSupplier ? (
        <View>
          {Data.supplier.map((item) => {
            return (
              <CheckBox
                title={item.title}
                checked={formik.values.supplier[item.value]}
                onPress={() => handleCheckboxes("supplier", item.value)}
                key={`supplier-${item.id}`}
              />
            );
          })}
          <View style={styles.closeIconContainer}>
            <Icon
              type={"material-community"}
              name={"arrow-up-drop-circle-outline"}
              color={"#00a680"}
              onPress={() => {
                showSupplier ? setShowSupplier(false) : setShowSupplier(true);
              }}
            />
          </View>
        </View>
      ) : null}
      <ListItem
        bottomDivider
        onPress={() => {
          showCommunity ? setShowCommunity(false) : setShowCommunity(true);
        }}
      >
        <Icon
          type={"material-community"}
          name={"account-supervisor"}
          color={"#00a680"}
        />
        <ListItem.Content>
          <ListItem.Title>{"Community"}</ListItem.Title>
        </ListItem.Content>
        <Icon
          type={"material-community"}
          name={"arrow-down-drop-circle-outline"}
          color={"#00a680"}
          onPress={() => {
            showCommunity ? setShowCommunity(false) : setShowCommunity(true);
          }}
        />
      </ListItem>
      {showCommunity ? (
        <View>
          {Data.community.map((item) => {
            return (
              <CheckBox
                title={item.title}
                checked={formik.values.community[item.value]}
                onPress={() => handleCheckboxes("community", item.value)}
                key={`community-${item.id}`}
              />
            );
          })}
          <View style={styles.closeIconContainer}>
            <Icon
              type={"material-community"}
              name={"arrow-up-drop-circle-outline"}
              color={"#00a680"}
              onPress={() => {
                showCommunity
                  ? setShowCommunity(false)
                  : setShowCommunity(true);
              }}
            />
          </View>
        </View>
      ) : null}

      {/* <View style={styles.container}>
        <Text
          style={styles.text}
          onPress={() => {
            setShowCoffee(!showCoffee);
          }}
        >
          Coffee
        </Text>
        <Icon
          name="arrow-down-drop-circle-outline"
          type="material-community"
          color="#00a680"
          onPress={() => {
            showCoffee ? setShowCoffee(false) : setShowCoffee(true);
          }}
        />
      </View>
      {showCoffee ? (
        <>
          {Data.coffee.map((item) => {
            return (
              <CheckBox
                title={item.title}
                checked={formik.values.coffee[item.value]}
                onPress={() => handleCheckboxes("coffee", item.value)}
                key={`coffee-${item.id}`}
              />
            );
          })}
        </>
      ) : null}
      <View style={styles.container}>
        <Text
          style={styles.text}
          onPress={() => {
            setShowMenu(!showMenu);
          }}
        >
          Menu
        </Text>
        <Icon
          name="arrow-down-drop-circle-outline"
          type="material-community"
          color="#00a680"
          onPress={() => {
            setShowMenu(!showMenu);
          }}
        />
      </View>
      {showMenu ? (
        <>
          {Data.menu.map((item) => {
            return (
              <CheckBox
                title={item.title}
                checked={formik.values.menu[item.value]}
                onPress={() => handleCheckboxes("menu", item.value)}
                key={`menu-${item.id}`}
              />
            );
          })}
        </>
      ) : null}
      <View style={styles.container}>
        <Text
          style={styles.text}
          onPress={() => {
            showWaste ? setShowWaste(false) : setShowWaste(true);
          }}
        >
          Waste
        </Text>
        <Icon
          name="arrow-down-drop-circle-outline"
          type="material-community"
          color="#00a680"
          onPress={() => {
            showWaste ? setShowWaste(false) : setShowWaste(true);
          }}
        />
      </View>
      {showWaste ? (
        <>
          {Data.waste.map((item) => {
            return (
              <CheckBox
                title={item.title}
                checked={formik.values.waste[item.value]}
                onPress={() => handleCheckboxes("waste", item.value)}
                key={`waste-${item.id}`}
              />
            );
          })}
        </>
      ) : null}
      <View style={styles.container}>
        <Text
          style={styles.text}
          onPress={() => {
            showSupplier ? setShowSupplier(false) : setShowSupplier(true);
          }}
        >
          Supplier and energy
        </Text>
        <Icon
          name="arrow-down-drop-circle-outline"
          type="material-community"
          color="#00a680"
          onPress={() => {
            showSupplier ? setShowSupplier(false) : setShowSupplier(true);
          }}
        />
      </View>
      {showSupplier ? (
        <>
          {Data.supplier.map((item) => {
            return (
              <CheckBox
                title={item.title}
                checked={formik.values.supplier[item.value]}
                onPress={() => handleCheckboxes("supplier", item.value)}
                key={`supplier-${item.id}`}
              />
            );
          })}
        </>
      ) : null}
      <View style={styles.container}>
        <Text
          style={styles.text}
          onPress={() => {
            showCommunity ? setShowCommunity(false) : setShowCommunity(true);
          }}
        >
          Community
        </Text>
        <Icon
          name="arrow-down-drop-circle-outline"
          type="material-community"
          color="#00a680"
          onPress={() => {
            showCommunity ? setShowCommunity(false) : setShowCommunity(true);
          }}
        />
      </View>
      {showCommunity ? (
        <>
          {Data.community.map((item) => {
            return (
              <CheckBox
                title={item.title}
                checked={formik.values.community[item.value]}
                onPress={() => handleCheckboxes("community", item.value)}
                key={`community-${item.id}`}
              />
            );
          })}
        </>
      ) : null} */}
    </View>
  );
}
