import { ScrollView, Alert } from "react-native";
import { Icon, Avatar, Text } from "react-native-elements";
import React, { useState } from "react";
import { styles } from "./UploadImagesForm.styles";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { LoadingModal } from "../../../Shared";
import { map, filter } from "lodash";

export function UploadImagesForm(props) {
  const { formik } = props;
  const [isLoading, setIsloading] = useState(false);
  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });
    if (!result.canceled) {
      setIsloading(true);
      uploadImage(result.uri);
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
    formik.setFieldValue("images", [...formik.values.images, imageUrl]);
    setIsloading(false);
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
            const result = filter(
              formik.values.images,
              (image) => image !== img
            );
            formik.setFieldValue("images", result);
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
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={openGallery}
        />
        {map(formik.values.images, (image) => (
          <Avatar
            key={image}
            source={{ uri: image }}
            containerStyle={styles.imageStyles}
            onPress={() => removeImage(image)}
          />
        ))}
      </ScrollView>

      <Text style={styles.error}>{formik.errors.images}</Text>
      <LoadingModal show={isLoading} text="Uploading image" />
    </>
  );
}
