import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./FilterRestaurants.styles";
import { Icon, Button, Switch } from "react-native-elements";
import { Modal } from "../../Shared";
import Data from "./FilterRestaurantsData.json";
import { async } from "@firebase/util";
import {
  doc,
  collection,
  query,
  where,
  or,
  and,
  orderBy,
  deleteDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../utils";
import { array, string } from "yup";
export function FilterRestaurants(props) {
  // useeffect to console.log("NEWDATA", newData) everytime the value of newData changes

  const { updateRestaurants } = props;
  const [constraints, setConstraints] = useState([]);
  const [busConstraints, setBusConstraints] = useState([]);
  const [typeConstraints, setTypeConstraints] = useState([]);
  const [oopConstraints, setOopConstraints] = useState([]);

  const [filters, setFilters] = useState({
    restaurants: false,
    shops: false,
  });
  const [restaurantTypeFilter, setRestaurantTypeFilter] = useState({
    restaurant: false,
    coofee: false,
  });
  const [shopTypeFilter, setShopTypeFilter] = useState({
    grocery: false,
    pet: false,
    clothing: false,
    beauty: false,
    cosmetic: false,
    craft: false,
    homeware: false,
    op: false,
  });
  const [restaurantOptionsFilter, setRestaurantOptionsFilter] = useState({
    vegetarian: false,
    vegan: false,
    discount: false,
    local: false,
    plastic: false,
    renewable: false,
  });
  const [shopOptionsFilter, setShopOptionsFilter] = useState({
    vegetarian: false,
    vegan: false,
    discount: false,
    local: false,
    plastic: false,
    renewable: false,
  });

  const filterChange = (value, filterName) => {
    setFilters({ ...filters, [filterName]: value });
  };
  const filterChangeType = (value, filterName, type) => {
    if (filterName === type.filter) {
      setRestaurantTypeFilter({ ...restaurantTypeFilter, [filterName]: value });
    }
  };
  const [newData, setNewData] = useState(Data);
  console.log("DATAUSE", newData);
  console.log("newDataTypeFiltersRes", restaurantTypeFilter);
  console.log("newDataTypeFiltersShop", shopTypeFilter);
  useEffect(() => {
    console.log(
      "NEWDATA",
      newData.restaurants.map((item) => item.type.map((type) => type.checked))
    );
  }, [newData]);

  const onChangeSwitch = (id) => {
    {
      id === 1
        ? newData.restaurants.map((item) => {
            if (item.id === item.id) {
              item.checked = !item.checked;
              setFilters({ ...filters, restaurants: !filters.restaurants });
            }
          })
        : newData.shops.map((item) => {
            if (item.id === item.id) {
              item.checked = !item.checked;
              setFilters({ ...filters, shops: !filters.shops });
            }
          });
    }
    setNewData({ ...newData });
    console.log("newDataFilters", filters);
  };
  const onChangeSwitchType = (id, idTwo) => {
    {
      id === 1
        ? newData.restaurants.map((item) => {
            item.type.map((type) => {
              if (type.id === idTwo) {
                type.checked = !type.checked;
                // setFilters({ ...filters, [filterName]: value });
                if (
                  type.filter === "restaurant"
                  // || type.filter === "coofee"
                ) {
                  setRestaurantTypeFilter({
                    ...restaurantTypeFilter,
                    restaurant: !restaurantTypeFilter.restaurant,
                  });
                }
                if (type.filter === "coofee") {
                  setRestaurantTypeFilter({
                    ...restaurantTypeFilter,
                    coofee: !restaurantTypeFilter.coofee,
                  });
                }
              }
            });
          })
        : newData.shops.map((item) => {
            item.type.map((type) => {
              if (type.id === idTwo) {
                type.checked = !type.checked;
                if (type.filter === "grocery") {
                  setShopTypeFilter({
                    ...shopTypeFilter,
                    grocery: !shopTypeFilter.grocery,
                  });
                }
                if (type.filter === "pet") {
                  setShopTypeFilter({
                    ...shopTypeFilter,
                    pet: !shopTypeFilter.pet,
                  });
                }
                if (type.filter === "clothing") {
                  setShopTypeFilter({
                    ...shopTypeFilter,
                    clothing: !shopTypeFilter.clothing,
                  });
                }
                if (type.filter === "beauty") {
                  setShopTypeFilter({
                    ...shopTypeFilter,
                    beauty: !shopTypeFilter.beauty,
                  });
                }
                if (type.filter === "cosmetic") {
                  setShopTypeFilter({
                    ...shopTypeFilter,
                    cosmetic: !shopTypeFilter.cosmetic,
                  });
                }
                if (type.filter === "craft") {
                  setShopTypeFilter({
                    ...shopTypeFilter,
                    craft: !shopTypeFilter.craft,
                  });
                }
                if (type.filter === "homeware") {
                  setShopTypeFilter({
                    ...shopTypeFilter,
                    homeware: !shopTypeFilter.homeware,
                  });
                }
                if (type.filter === "op") {
                  setShopTypeFilter({
                    ...shopTypeFilter,
                    op: !shopTypeFilter.op,
                  });
                }
              }
            });
          });
    }
    setNewData({ ...newData });
    console.log("newDataTypeFiltersShop", shopTypeFilter);
    console.log("newDataTypeFiltersRes", restaurantTypeFilter);
  };

  const onChangeSwitchOptions = (id, idTwo) => {
    {
      id === 1
        ? newData.restaurants.map((item) => {
            item.options.map((options) => {
              if (options.id === idTwo) {
                options.checked = !options.checked;
                if (options.filter === "vegetarian") {
                  setRestaurantOptionsFilter({
                    ...restaurantOptionsFilter,
                    vegetarian: !restaurantOptionsFilter.vegetarian,
                  });
                }
                if (options.filter === "vegan") {
                  setRestaurantOptionsFilter({
                    ...restaurantOptionsFilter,
                    vegan: !restaurantOptionsFilter.vegan,
                  });
                }
                if (options.filter === "discount") {
                  setRestaurantOptionsFilter({
                    ...restaurantOptionsFilter,
                    discount: !restaurantOptionsFilter.discount,
                  });
                }
                if (options.filter === "local") {
                  setRestaurantOptionsFilter({
                    ...restaurantOptionsFilter,
                    local: !restaurantOptionsFilter.local,
                  });
                }
                if (options.filter === "plastic") {
                  setRestaurantOptionsFilter({
                    ...restaurantOptionsFilter,
                    plastic: !restaurantOptionsFilter.plastic,
                  });
                }
                if (options.filter === "renewable") {
                  setRestaurantOptionsFilter({
                    ...restaurantOptionsFilter,
                    renewable: !restaurantOptionsFilter.renewable,
                  });
                }
              }
            });
          })
        : newData.shops.map((item) => {
            item.options.map((options) => {
              if (options.id === idTwo) {
                options.checked = !options.checked;
                if (options.filter === "vegetarian") {
                  setShopOptionsFilter({
                    ...shopOptionsFilter,
                    vegetarian: !shopOptionsFilter.vegetarian,
                  });
                }
                if (options.filter === "vegan") {
                  setShopOptionsFilter({
                    ...shopOptionsFilter,
                    vegan: !shopOptionsFilter.vegan,
                  });
                }
                if (options.filter === "discount") {
                  setShopOptionsFilter({
                    ...shopOptionsFilter,
                    discount: !shopOptionsFilter.discount,
                  });
                }
                if (options.filter === "local") {
                  setShopOptionsFilter({
                    ...shopOptionsFilter,
                    local: !shopOptionsFilter.local,
                  });
                }
                if (options.filter === "plastic") {
                  setShopOptionsFilter({
                    ...shopOptionsFilter,
                    plastic: !shopOptionsFilter.plastic,
                  });
                }
                if (options.filter === "renewable") {
                  setShopOptionsFilter({
                    ...shopOptionsFilter,
                    renewable: !shopOptionsFilter.renewable,
                  });
                }
              }
            });
          });
    }
    setNewData({ ...newData });
    console.log("newDataOptionsFiltersShop", shopOptionsFilter);
    console.log("newDataOptionsFiltersRes", restaurantOptionsFilter);
  };
  const clearAll = () => {
    newData.restaurants.map((item) => {
      item.checked = false;
      item.type.map((type) => {
        type.checked = false;
      });
      item.options.map((options) => {
        options.checked = false;
      });
    });
    newData.shops.map((item) => {
      item.checked = false;
      item.type.map((type) => {
        type.checked = false;
      });
      item.options.map((options) => {
        options.checked = false;
      });
    });
    setFilters({
      restaurants: false,
      shops: false,
    });
    setRestaurantTypeFilter({
      restaurant: false,
      coofee: false,
    });
    setShopTypeFilter({
      grocery: false,
      pet: false,
      clothing: false,
      beauty: false,
      cosmetic: false,
      craft: false,
      homeware: false,
      op: false,
    });
    setRestaurantOptionsFilter({
      vegetarian: false,
      vegan: false,
      discount: false,
      local: false,
      plastic: false,
      renewable: false,
    });
    setShopOptionsFilter({
      vegetarian: false,
      vegan: false,
      discount: false,
      local: false,
      plastic: false,
      renewable: false,
    });
    setConstraints([]);
    setBusConstraints([]);
    setTypeConstraints([]);
    setOopConstraints([]);
    setNewData({ ...newData });
  };
  const applyFilters = async () => {
    Data.restaurants.map((item) => {
      if (item.checked) {
        busConstraints.push(where("BusinessType", "==", item.value));
      }
      item.type.map((type) => {
        if (type.checked) {
          typeConstraints.push(where("RestaurantType", "==", type.value));
        }
      });
      item.options.map((options) => {
        if (options.checked) {
          oopConstraints.push(where(options.dbValue, "==", true));
        }
      });
    });
    Data.shops.map((item) => {
      if (item.checked) {
        busConstraints.push(where("BusinessType", "==", item.value));
        console.log("busConstraints", busConstraints);
      }
      item.type.map((type) => {
        if (type.checked) {
          typeConstraints.push(where("ShopType", "==", type.value));
          console.log("typeConstraints", typeConstraints);
        }
      });
      item.options.map((options) => {
        if (options.checked) {
          oopConstraints.push(where(options.dbValue, "==", true));
          console.log("oopConstraints", oopConstraints);
        }
      });
    });

    const q = query(
      collection(db, "restaurants"),

      and(
        or(...busConstraints),
        or(...typeConstraints),
        or(...oopConstraints)
        // or(
        //   or(
        //     // where("BusinessType", "==", "Restaurant"),
        //     where("BusinessType", "==", "Shop")
        //   ),

        //   or(
        //     // where("RestaurantType", "==", "restaurant"),
        //     where("RestaurantType", "==", "cofee/Bakery")
        //     // where("ShopType", "==", "Grocery/Supermarket")
        //   ),
        //   or(
        //     where("menu.FullyVegan", "==", true),
        //     where("FoodProducts.FullyVegetarian", "==", true)
        //   )
        // )
      )
    );

    console.log("constraints", q);

    const result = await getDocs(q);
    const restaurants = [];
    result.forEach((doc) => {
      restaurants.push({ ...doc.data(), id: doc.id });
    });
    updateRestaurants(restaurants);
    setConstraints([]);
    setBusConstraints([]);
    setTypeConstraints([]);
    setOopConstraints([]);

    console.log("size restaurants", restaurants.length);
  };

  const getRestaurants = async () => {
    try {
      const q = query(
        collection(db, "restaurants"),
        filters.restaurants &&
          !filters.restaurant &&
          !filters.coofee &&
          !filters.shops &&
          !filters.vegan &&
          !filters.vegetarian
          ? where("BusinessType", "==", "Restaurant")
          : filters.shops &&
            !filters.restaurants &&
            !filters.restaurant &&
            !filters.coofee &&
            !filters.vegan &&
            !filters.vegetarian
          ? where("BusinessType", "==", "Shop")
          : filters.restaurants &&
            !filters.restaurant &&
            !filters.coofee &&
            filters.shops &&
            !filters.vegan &&
            !filters.vegetarian
          ? where("BusinessType", "in", ["Restaurant", "Shop"])
          : !filters.restaurants &&
            filters.shops &&
            filters.vegan &&
            !filters.vegetarian
          ? where(
              "BusinessType",
              "==",
              "Shop",
              "FoodProducts",
              "Fullyvegan",
              "==",
              true
            )
          : null,
        orderBy("geohash")

        // filters.vegan ? where("vegan", "==", filters.vegan) : null,
        // filters.vegetarian ? where("vegetarian", "==", "Shop") : null
        //   );
        //       filters.restaurants && filters.shops

        // where("BusinessType", "==", "Restaurant")
        // where("BusinessType", "==", "Shop")
        // where("address", "==", "Dddd")
        //   where("vegetarian", "==", filters.vegetarian)
      );
      console.log("q", q);

      const result = await getDocs(q);
      const restaurants = [];
      result.forEach((doc) => {
        restaurants.push({ ...doc.data(), id: doc.id });
      });
      updateRestaurants(restaurants);
      console.log("size restaurants", restaurants.length);

      //   const querySnapshot = await getDocs(q);
      //   const restaurants = [];
      //   querySnapshot.forEach((doc) => {
      //     restaurants.push({ ...doc.data(), id: doc.id });
      //   });
      //   //   setRestaurants(restaurants);
      //   console.log("size restaurants", restaurants.length);
    } catch (error) {
      console.log("error", error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  return (
    <>
      <Icon
        containerStyle={styles.btnContainer}
        reverse
        type="material-community"
        name="air-filter"
        color="#00a680"
        onPress={onCloseOpenModal}
      />
      <Modal show={showModal} close={onCloseOpenModal}>
        {
          <>
            <ScrollView style={styles.sView}>
              <View style={styles.content}>
                {newData.restaurants.map((item) => {
                  return (
                    <>
                      <View key={item.id} style={styles.switch}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Switch
                          value={item.checked}
                          onValueChange={() => onChangeSwitch(item.id)}
                          disabled={false}
                          color="#00a680"
                          style={{
                            transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
                          }}
                        />
                      </View>
                      {item.checked && (
                        <>
                          <Text style={styles.optText}>Type</Text>
                          {item.type.map((type) => {
                            return (
                              <>
                                <View key={type.id} style={styles.switch}>
                                  <Text style={styles.subText}>
                                    {type.title}
                                  </Text>
                                  <Switch
                                    value={type.checked}
                                    onValueChange={() =>
                                      onChangeSwitchType(item.id, type.id)
                                    }
                                    disabled={false}
                                    color="#00a680"
                                    style={{
                                      transform: [
                                        { scaleX: 0.6 },
                                        { scaleY: 0.6 },
                                      ],
                                    }}
                                  />
                                </View>
                              </>
                            );
                          })}
                          <Text style={styles.optText}>Options</Text>

                          {item.options.map((options) => {
                            return (
                              <>
                                <View key={options.id} style={styles.switch}>
                                  <Text style={styles.subText}>
                                    {options.title}
                                  </Text>
                                  <Switch
                                    value={options.checked}
                                    onValueChange={() =>
                                      onChangeSwitchOptions(item.id, options.id)
                                    }
                                    disabled={false}
                                    color="#00a680"
                                    style={{
                                      transform: [
                                        { scaleX: 0.6 },
                                        { scaleY: 0.6 },
                                      ],
                                    }}
                                  />
                                </View>
                              </>
                            );
                          })}
                        </>
                      )}
                    </>
                  );
                })}
                {newData.shops.map((item) => {
                  return (
                    <>
                      <View key={item.id} style={styles.switch}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Switch
                          value={item.checked}
                          onValueChange={() => onChangeSwitch()}
                          disabled={false}
                          color="#00a680"
                          style={{
                            transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
                          }}
                        />
                      </View>
                      {item.checked && (
                        <>
                          <Text style={styles.optText}>Type</Text>
                          {item.type.map((type) => {
                            return (
                              <>
                                <View key={type.id} style={styles.switch}>
                                  <Text style={styles.subText}>
                                    {type.title}
                                  </Text>
                                  <Switch
                                    value={type.checked}
                                    onValueChange={() =>
                                      onChangeSwitchType(item.id, type.id)
                                    }
                                    disabled={false}
                                    color="#00a680"
                                    style={{
                                      transform: [
                                        { scaleX: 0.6 },
                                        { scaleY: 0.6 },
                                      ],
                                    }}
                                  />
                                </View>
                              </>
                            );
                          })}
                          <Text style={styles.optText}>Options</Text>

                          {item.options.map((options) => {
                            return (
                              <>
                                <View key={options.id} style={styles.switch}>
                                  <Text style={styles.subText}>
                                    {options.title}
                                  </Text>
                                  <Switch
                                    value={options.checked}
                                    onValueChange={() =>
                                      onChangeSwitchOptions(item.id, options.id)
                                    }
                                    disabled={false}
                                    color="#00a680"
                                    style={{
                                      transform: [
                                        { scaleX: 0.6 },
                                        { scaleY: 0.6 },
                                      ],
                                    }}
                                  />
                                </View>
                              </>
                            );
                          })}
                        </>
                      )}
                    </>
                  );
                })}
              </View>
            </ScrollView>
            <View style={styles.mapAction}>
              <Button
                title="Apply filters"
                containerStyle={styles.btnMapContainerSave}
                buttonStyle={styles.btnMapSave}
                onPress={applyFilters}
                disabled={!filters.restaurants && !filters.shops}
              />
              <Button
                title="Clear all"
                containerStyle={styles.btnMapContainerClose}
                buttonStyle={styles.btnMapClose}
                onPress={clearAll}
                disabled={!filters.restaurants && !filters.shops}
              />
            </View>
          </>
        }
      </Modal>
    </>
  );
}
