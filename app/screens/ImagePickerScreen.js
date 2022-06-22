import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImagePickerScreen() {
  const [image, setImage] = useState(null);
  const [resBase64String, setResBase64String] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    const tempURI = "data:image/jpeg;base64," + result.base64;

    // console.log(result.base64.length);

    if (!result.cancelled) {
      setImage(tempURI);
    }

    const url = "http://127.0.0.1:5000/predict_image";

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.base64),
      // responseType: "arraybuffer",
    })
      .then((response) => {
        return response.text();
      })
      .then((responseJson) => {
        let test = "data:image/jpeg;base64," + responseJson;
        setResBase64String(test);
        console.log(test);
      })
      .catch((error) => {
        console.error(error);
      });

    // s
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image
          source={{
            uri: image,
          }}
          style={{ width: 200, height: 200 }}
        />
      )}
      {resBase64String && (
        <Image
          source={{
            uri: resBase64String,
          }}
          style={{ width: 400, height: 400 }}
        />
      )}
    </View>
  );
}
