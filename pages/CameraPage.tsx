import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from 'expo-image-picker';

export default function CameraPage() {
  const [facing, setFacing] = useState("back");
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const cameraRef = useRef(null as any);
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  if (!cameraPermission && !mediaPermission) {
    return <View />;
  }

  if (!cameraPermission?.granted && !mediaPermission?.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button
          onPress={() => {
            requestCameraPermission();
            requestMediaPermission();
          }}
          title="grant permission"
        />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  function takePicture() {
    if (!mediaPermission?.granted && mediaPermission?.canAskAgain) {
      requestMediaPermission();
    }
    if (cameraRef.current) {
      cameraRef.current
        .takePictureAsync({ skipProcessing: true })
        .then(async (picture: any) => {
          try {
            await MediaLibrary.saveToLibraryAsync(picture.uri);
          } catch (error) {
            alert("We couldn't take the picture");
          }
        });
    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={pickImage}> 
            <Text style={styles.text}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.takePictureButton}
            onPress={takePicture}
          >
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  takePictureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    left: "50%",
    marginLeft: -35,
    alignSelf: "center",
    flex: 1,
  },
});
