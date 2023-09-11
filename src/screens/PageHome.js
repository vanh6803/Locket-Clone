import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { images } from "../../assets/images/index";
// import { useNavigation } from "@react-navigation/native";
import { Snackbar, Provider as PaperProvider } from "react-native-paper";

const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;

const PageHome = ({ onPressed }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  // const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        setImage(null);
        setSnackbarVisible(true)
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const renderCamera = () => {
    return (
      <View>
        <View style={styles.camera}>
          <Camera
            style={{ flex: 1 }}
            type={type}
            flashMode={flash}
            ref={cameraRef}
          ></Camera>
        </View>
        {/* control */}
        <View className="flex-row justify-around items-center mt-8">
          {/* flash */}
          <TouchableOpacity
            onPress={() => {
              setFlash(
                flash === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.on
                  : Camera.Constants.FlashMode.off
              );
            }}
          >
            <Image
              source={images.flash}
              className="w-[40px] h-[40px]"
              style={{
                tintColor:
                  flash === Camera.Constants.FlashMode.off ? "white" : "yellow",
              }}
            />
          </TouchableOpacity>
          {/* take photo */}
          <TouchableOpacity
            className="border-[3px] border-orange-400 rounded-full p-2"
            onPress={takePicture}
          >
            <View className="w-[60px] h-[60px] rounded-full bg-white" />
          </TouchableOpacity>
          {/* type camera */}
          <TouchableOpacity
            className=""
            onPress={() => {
              setType(
                type === CameraType.back ? CameraType.front : CameraType.back
              );
            }}
          >
            <Image
              source={images.reload}
              className="w-[40px] h-[40px]"
              style={{ tintColor: "white" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderImage = () => {
    return (
      <View>
        <Image source={{ uri: image }} style={styles.camera} />
        {/* control */}
        <View className="flex-row justify-around items-center mt-8">
          {/* close */}
          <TouchableOpacity
            onPress={() => {
              setImage(null);
            }}
          >
            <Image
              source={images.close}
              className="w-[40px] h-[40px]"
              style={{
                tintColor: "white",
              }}
            />
          </TouchableOpacity>
          {/* send */}
          <TouchableOpacity
            className="bg-zinc-600 w-24 h-24 justify-center items-center rounded-full"
            onPress={() => {
              console.log("aaa");
            }}
          >
            <Image
              source={images.send}
              className="w-[50px] h-[50px]"
              style={{ tintColor: "white" }}
            />
          </TouchableOpacity>
          {/* download */}
          <TouchableOpacity onPress={saveImage}>
            <Image
              source={images.download}
              className="w-[40px] h-[40px]"
              style={{ tintColor: "white" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <PaperProvider>
      <View className="flex-1  bg-zinc-900 ">
      {/* top */}
      <View
        className="flex-row justify-between px-7 mt-3 items-center"
        style={{ height: heightScreen / 17 }}
      >
        <Pressable className="bg-zinc-600 p-2 rounded-full ">
          <Image
            source={images.users}
            className="w-[30px] h-[30px]"
            style={{ tintColor: "white" }}
          />
        </Pressable>
        <Pressable className="bg-zinc-600 p-2 rounded-full ">
          <Image
            source={images.message}
            className="w-[30px] h-[30px]"
            style={{ tintColor: "white" }}
          />
        </Pressable>
      </View>
      {/* camera */}
      <View>{!image ? renderCamera() : renderImage()}</View>
      {/* bottom */}
      <View className="mt-7">
        <Pressable className="justify-center items-center" onPress={onPressed}>
          <Text className="text-2xl font-semibold text-white">History</Text>
          <Image
            source={images.down}
            className="w-[40px] h-[40px] mt-2"
            style={{ tintColor: "white" }}
          />
        </Pressable>
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={Snackbar.DURATION_SHORT} // You can adjust the duration as needed
      >
        Image saved successfully!
      </Snackbar>
    </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  camera: {
    width: widthScreen,
    height: (widthScreen * 4) / 3,
    borderRadius: 60,
    overflow: "hidden",
    marginTop: widthScreen / 18,
  },
});

export default PageHome;
