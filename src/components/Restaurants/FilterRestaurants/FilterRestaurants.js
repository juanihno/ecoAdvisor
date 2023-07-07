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
  orderBy,
  deleteDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../utils";
export function FilterRestaurants(props) {
  const { updateRestaurants } = props;
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

  // change value of checked to the object with the same item.id when the user clicks on the switch in the filter component

  //   console.log("setRestaurants", setRestaurants);
  // const [filters, setFilters] = useState({
  //   restaurants: false,
  //   restaurant: false,
  //   coofee: false,
  //   shops: false,
  //   vegan: false,
  //   vegetarian: false,
  // });

  const filterChange = (value, filterName) => {
    setFilters({ ...filters, [filterName]: value });
    // console.log("onChangeSwitch", filters);
  };
  const filterChangeType = (value, filterName, type) => {
    if (filterName === type.filter) {
      setRestaurantTypeFilter({ ...restaurantTypeFilter, [filterName]: value });
    }
  };
  //create function to change the value of checked in the the array of objects Data.restaurants to the opposite value when the user clicks on the switch in the filter component  and call the function onChangeSwitch to change the value of the switch in the filter component
  const [newData, setNewData] = useState(Data);
  console.log("DATAUSE", newData);
  console.log("newDataTypeFiltersRes", restaurantTypeFilter);
  console.log("newDataTypeFiltersShop", shopTypeFilter);

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
    // console.log("newData", newData);
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
    setNewData({ ...newData });
    // setNewData(Data);
  };
  const applyFilters = async () => {
    // create a dynamic query so foreach restauant in the array of objects Data.restaurants if the value of checked is true then add the filter to the query
    const collectionRef = collection(db, "restaurants");
    const q = collectionRef;
    console.log("q", q);
    //foreach data.restaurants.type if the value of checked is true then add the filter to the query
    Data.restaurants.map((item) => {
      if (item.checked) {
        // push the filter to the query if the value of checked is true
        // q.where("BusinessType", "==", item.filter);
        //do the query
      }
      item.type.map((type) => {
        if (type.checked) {
          q.where("RestaurantType", "==", type.filter);
        }
      });
      item.options.map((options) => {
        if (options.checked) {
          q.where("menu", "==", options.filter);
        }
      });
    });
    Data.shops.map((item) => {
      if (item.checked) {
        q.where("BusinessType", "==", item.filter);
      }
      item.type.map((type) => {
        if (type.checked) {
          q.where("BusinessType", "==", type.filter);
        }
      });
      item.options.map((options) => {
        if (options.checked) {
          q.where("BusinessType", "==", options.filter);
        }
      });
    });
    console.log("q", q);

    const result = await getDocs(q);
    const restaurants = [];
    result.forEach((doc) => {
      restaurants.push({ ...doc.data(), id: doc.id });
    });
    updateRestaurants(restaurants);
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

  // const [restaurantsIsEnabled, setRestaurantsIsEnabled] = useState(false);
  // const toggleSwitchRestaurants = () => {
  //   setRestaurantsIsEnabled((previousState) => !previousState);
  //   onChangeSwitch(!restaurantsIsEnabled, "restaurants");
  // };
  // const [restaurantIsEnabled, setRestaurantIsEnabled] = useState(false);
  // const toggleSwitchRestaurant = () => {
  //   setRestaurantIsEnabled((previousState) => !previousState);
  //   onChangeSwitch(!restaurantIsEnabled, "restaurant");
  // };
  // const [coofeeIsEnabled, setCoofeeIsEnabled] = useState(false);
  // const toggleSwitchCoofee = () => {
  //   setCoofeeIsEnabled((previousState) => !previousState);
  //   onChangeSwitch(!coofeeIsEnabled, "coofee");
  // };
  // //do const and togleSwitch for Discount for using own cup, Local food, No plastic, Renewable energy, everything at once please
  // const [discountIsEnabled, setDiscountIsEnabled] = useState(false);
  // const toggleSwitchDiscount = () => {
  //   setDiscountIsEnabled((previousState) => !previousState);
  //   onChangeSwitch(!discountIsEnabled, "discount");
  // };
  // const [localIsEnabled, setLocalIsEnabled] = useState(false);
  // const toggleSwitchLocal = () => {
  //   setLocalIsEnabled((previousState) => !previousState);
  //   onChangeSwitch(!localIsEnabled, "local");
  // };
  // const [plasticIsEnabled, setPlasticIsEnabled] = useState(false);
  // const toggleSwitchPlastic = () => {
  //   setPlasticIsEnabled((previousState) => !previousState);
  //   onChangeSwitch(!plasticIsEnabled, "plastic");
  // };
  // const [renewableIsEnabled, setRenewableIsEnabled] = useState(false);
  // const toggleSwitchRenewable = () => {
  //   setRenewableIsEnabled((previousState) => !previousState);
  //   onChangeSwitch(!renewableIsEnabled, "renewable");
  // };

  // const [veganIsEnabled, setVeganIsEnabled] = useState(false);
  // const toggleSwitchVegan = () => {
  //   setVeganIsEnabled((previousState) => !previousState);
  //   onChangeSwitch(!veganIsEnabled, "vegan");
  // };
  // const [vegetarianIsEnabled, setVegetarianIsEnabled] = useState(false);
  // const toggleSwitchVegetarian = () => {
  //   setVegetarianIsEnabled((previousState) => !previousState);
  //   onChangeSwitch(!vegetarianIsEnabled, "vegetarian");
  // };

  // const [shopsIsEnabled, setShopsIsEnabled] = useState(false);
  // const toggleSwitchShops = () => {
  //   setShopsIsEnabled((previousState) => !previousState);
  //   onChangeSwitch(!shopsIsEnabled, "shops");
  // };

  // //do const and togleSwitch for grocery, pet, beauty, cosmetic, craft, homeware and op
  // const [groceryIsEnabled, setGroceryIsEnabled] = useState(false);
  // const toggleSwitchGrocery = () => {
  //   setGroceryIsEnabled((previousState) => !previousState);
  //   onChangeSwitch(!groceryIsEnabled, "grocery");
  // };
  // const [petIsEnabled, setPetIsEnabled] = useState(false);
  // const toggleSwitchPet = () => {
  //   setPetIsEnabled((previousState) => !previousState);
  //   onChangeSwitch(!petIsEnabled, "pet");
  // };
  // const [beautyIsEnabled, setBeautyIsEnabled] = useState(false);
  // const toggleSwitchBeauty = () => {
  //   setBeautyIsEnabled((previousState) => !previousState);
  //   onChangeSwitch(!beautyIsEnabled, "beauty");
  // };
  // const [cosmeticIsEnabled, setCosmeticIsEnabled] = useState(false);
  // const toggleSwitchCosmetic = () => {
  //   setCosmeticIsEnabled((previousState) => !previousState);
  //   onChangeSwitch(!cosmeticIsEnabled, "cosmetic");
  // };
  // const [craftIsEnabled, setCraftIsEnabled] = useState(false);
  // const toggleSwitchCraft = () => {
  //   setCraftIsEnabled((previousState) => !previousState);
  //   onChangeSwitch(!craftIsEnabled, "craft");
  // };

  // const [homewareIsEnabled, setHomewareIsEnabled] = useState(false);
  // const toggleSwitchHomeware = () => {
  //   setHomewareIsEnabled((previousState) => !previousState);
  //   onChangeSwitch(!homewareIsEnabled, "homeware");
  // };
  // const [opIsEnabled, setOpIsEnabled] = useState(false);
  // const toggleSwitchOp = () => {
  //   setOpIsEnabled((previousState) => !previousState);
  //   onChangeSwitch(!opIsEnabled, "op");
  // };

  const [showModal, setShowModal] = useState(false);
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);
  //   const [filtersArray, setFiltersArray] = useState([]);
  // console.log("onChangeSwitch", filters);

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
                          // {bussiness.coffee[item.value]}
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
                          // {bussiness.coffee[item.value]}
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
                //   onPress={saveLocation}
              />
              <Button
                title="Clear all"
                containerStyle={styles.btnMapContainerClose}
                buttonStyle={styles.btnMapClose}
                onPress={clearAll}
                //   onPress={close}
              />
            </View>
          </>
        }
      </Modal>
    </>
  );
}
