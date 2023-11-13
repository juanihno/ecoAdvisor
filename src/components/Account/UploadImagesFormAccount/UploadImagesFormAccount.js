import { ScrollView, Alert } from "react-native";
import { View, Icon, Avatar, Text, Button } from "react-native-elements";
import React, { useState, useEffect } from "react";
import { styles } from "./UploadImagesFormAccount.styles";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateDoc, doc, collection, getFirestore } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { LoadingModal } from "../../Shared";
import { map, filter } from "lodash";
import { Modal } from "../../Shared";
import { OpenGallery } from "../OpenGallery";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export function UploadImagesFormAccount(props) {
  useEffect(() => {
    checkImagesAccount();
  }, []);

  const { images, getRestaurantData, restaurantId } = props;
  const [imagesAccount, setImagesAccount] = useState(images);
  console.log("IMAGESACCOUNT", images);
  console.log("IMAGESACCOUNTSHOWMODAL", showModal);
  const [isLoading, setIsloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);
  const checkImagesAccount = () => {
    if (imagesAccount.length === 0) {
      onCloseOpenModal();
    }
  };

  const openGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        // presentationStyle: "fullScreen",
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsEditing: platform === "ios" ? false : true,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.2,
      });
      // if (result.canceled) {
      //   return;
      // }

      if (!result.canceled) {
        setIsloading(true);
        uploadImage(result.uri);
        // uploadImage(result.assets[0].uri);

        // getRestaurantData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storage = getStorage();
    const storageRef = ref(storage, `business/${uuid()}`);
    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhotoBusiness(snapshot.metadata.fullPath);
      console.log(snapshot);
    });
  };
  const updatePhotoBusiness = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);
    const imageUrl = await getDownloadURL(imageRef);
    imagesAccount.push(imageUrl);
    const db = getFirestore();
    const restaurantRef = doc(db, "restaurants", restaurantId);
    await updateDoc(restaurantRef, { images: imagesAccount });

    // updateImagesFirebase();
    // console.log("IMAGESACCOUNT", imagesAccount);
    // setImagesAccount(imagesAccount);
    // formik.setFieldValue("images", [...formik.values.images, imageUrl]);
    setIsloading(false);
    // check imagesAccount is empty, then we need to open the gallery again

    // getRestaurantData();
  };

  const removeImage = (img) => {
    Alert.alert(
      "Delete image",
      "Are you sure you want to delete this image?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            const result = filter(imagesAccount, (image) => image !== img);
            setImagesAccount(result);
            const db = getFirestore();
            const restaurantRef = doc(db, "restaurants", restaurantId);
            updateDoc(restaurantRef, { images: result });
            checkImagesAccount();
            getRestaurantData();
            // formik.setFieldValue("images", result);
          },
        },
      ],
      { cancelable: false }
    );
  };

  // const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  // console.log(isEnabled);

  return (
    <>
      <ScrollView
        style={styles.viewImage}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {/* {imagesAccount.length === 0 && ( */}
        <Modal show={showModal}>
          {
            <OpenGallery
              getRestaurantData={getRestaurantData}
              // show={true}
              // close={onCloseOpenModal}
              openGallery={openGallery}
              restaurantId={restaurantId}
              imagesAccount={imagesAccount}
              setImagesAccount={setImagesAccount}
              onCloseOpenModal={onCloseOpenModal}
              setIsloading={setIsloading}
            />
          }
        </Modal>
        {/* )} */}

        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={openGallery}
        />
        {map(imagesAccount, (image) => (
          <Avatar
            key={image}
            source={{ uri: image }}
            containerStyle={styles.imageStyles}
            onPress={() => removeImage(image)}
          />
        ))}
      </ScrollView>

      {/* <Text style={styles.error}>{formik.errors.images}</Text> */}
      <LoadingModal show={isLoading} text="Uploading image" />
    </>
  );
}
