import React, { useEffect, useState } from "react";
import { View, Text, Alert, Button } from "react-native";

import {
  launchCameraAsync,
  requestCameraPermissionsAsync,
} from "expo-image-picker";

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  async function requestPermission() {
    const { status } = await requestCameraPermissionsAsync();
    const granted = status === "granted";
    setHasPermission(granted);
    return granted;
  }

  async function openCamera() {
    let granted = hasPermission;

    if (granted === null || granted === false) {
      granted = await requestPermission();
    }

    if (!granted) {
      Alert.alert("Permissão Necessária", "Vá nas configurações para aceitar.");
      return;
    }

    const response = await launchCameraAsync({
      mediaTypes: ["images"],
      quality: 1,
      allowsEditing: true,
      aspect: [4, 4],
      base64: true,
    });

    //no lugar desse log, coloca oq for preciso para fazer a requisição. Ja esta retornando o base64
    console.log(response.assets);
  }

  useEffect(() => {
    (async () => {
      const { status } = await requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={openCamera} title="Abrir Câmera" />
    </View>
  );
}
