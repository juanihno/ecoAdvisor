import { View, Text } from "react-native";
import React, { useState } from "react";
import { styles } from "./OpenGallery.styles";
import { Input, Button } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { LoadingModal } from "../../Shared";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateDoc, doc, collection, getFirestore } from "firebase/firestore";
import { v4 as uuid } from "uuid";

export function OpenGallery(props) {
  //   console.log("TODASLASPROPS", props);
  const {
    getRestaurantData,
    close,
    setImagesAccount,
    restaurantId,
    onCloseOpenModal,
    setIsloading,
  } = props;
  const [imagesAccounts, setImagesAccounts] = useState([]);
  // const [isLoading, setIsloading] = useState(false);
  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      onCloseOpenModal();

      setIsloading(true);
      // onCloseOpenModal();
      uploadImage(result.uri);
      // getRestaurantData();
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
    imagesAccounts.push(imageUrl);
    const db = getFirestore();
    const restaurantRef = doc(db, "restaurants", restaurantId);
    await updateDoc(restaurantRef, { images: imagesAccounts });
    setImagesAccount(imagesAccounts);
    onCloseOpenModal();

    // updateImagesFirebase();
    // console.log("IMAGESACCOUNT", imagesAccount);
    // setImagesAccount(imagesAccount);
    // formik.setFieldValue("images", [...formik.values.images, imageUrl]);
    setIsloading(false);
    // check imagesAccount is empty, then we need to open the gallery again

    getRestaurantData();
  };
  return (
    <>
      <View style={styles.content}>
        <Text style={styles.text}>At least one image is required</Text>

        <Button
          title="Open gallery"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={openGallery}
          // loading={formik.isSubmitting}
        />
      </View>
      {/* <LoadingModal show={isLoading} text="Uploading" /> */}
    </>
  );
}
