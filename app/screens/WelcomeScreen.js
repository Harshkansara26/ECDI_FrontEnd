import React, { useState } from "react";
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export default function WelcomeScreen() {
  const [imageURI, setImageURI] = useState("");

  const openCamera = () => {
    console.log("clicked");

    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
        mediaType: "photo",
      },
      includeBase64: true,
    };

    launchCamera(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: "data:image/jpeg;base64," + response.base64 };
        console.log("response", source);
        setImageURI(source);
      }
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Button title={"Open Camera"} onPress={() => openCamera()} />
      <Image
        source={imageURI}
        style={{
          height: 60,
          width: 60,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
