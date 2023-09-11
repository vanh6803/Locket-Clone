import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import { images } from "../../assets/images";
import PagerView from "react-native-pager-view";

const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;

const data = [
  {
    id: 1,
    image:
      "https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/375456690_689621763189733_376268199215839956_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5614bc&_nc_ohc=IEmjLODWV-kAX_0XLGc&_nc_ht=scontent.fhan2-4.fna&oh=00_AfDUPpUC_q_FajQkFHQq0gLKUvwTfWfKw0TKfpqV2xvfNg&oe=650255CD",

    title: "best image",
    name: "vanh",
  },
  {
    id: 2,
    image:
      "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/271050849_230828662556124_3134727030641986653_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=1b51e3&_nc_ohc=Cdw0qOceGc4AX93b4gN&_nc_ht=scontent.fhan2-3.fna&oh=00_AfB6GSfNAa0-vLfJhk_f34IXnCSbOvI_ctTIu9BVDN6-_Q&oe=6502B7DC",
    title: "best image",
    name: "thanh",
  },
  {
    id: 3,
    image:
      "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/370371573_987884872435265_3912501485857872186_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=4c1e7d&_nc_ohc=5fmiBAXUEswAX-cH5dH&_nc_ht=scontent.fhan2-3.fna&oh=00_AfCsAYsAbta0_1KAvT5pCgMzTUz1vEcwKA6uLE8Kd3ntUw&oe=65022CCB",
    name: "hau",
  },
  {
    id: 4,
    image:
      "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/376749015_1017265016256412_8516168388701730904_n.jpg?stp=cp6_dst-jpg&_nc_cat=102&ccb=1-7&_nc_sid=4c1e7d&_nc_ohc=c7Z4V2nabvIAX9lyLEZ&_nc_ht=scontent.fhan2-3.fna&oh=00_AfD07yIi2U__d2ISiZ7MR4_c6aE7zqeNmU_l2aDE0Kis-g&oe=6502BDA5",
    title: "best image",
    name: "hang",
  },
  {
    id: 5,
    image:
      "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/297299509_206826101667990_6556506443821079309_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5614bc&_nc_ohc=p1j2cJqmMNMAX8BM4-0&_nc_ht=scontent.fhan2-3.fna&oh=00_AfAzSvlcidDBurX12qrHex6XhPbKLsuO7JdV_xZMU4asSg&oe=6502D327",
    name: "le",
  },
];

const PageImage = ({ backPagePress }) => {
  return (
    <View className="flex-1 bg-zinc-900 justify-between">
      {/* top bar */}
      <View
        className="flex-row justify-between px-7 pt-3"
        style={{ height: heightScreen / 17 }}
      >
        <Pressable onPress={backPagePress}>
          <Image
            source={images.up}
            className="w-[30px] h-[30px]"
            style={{ tintColor: "white" }}
          />
        </Pressable>
        <Text className="text-white text-lg">All Image</Text>
        <Image
          source={images.more}
          className="w-[30px] h-[30px]"
          style={{ tintColor: "white" }}
        />
      </View>

      <PagerView
        style={{ flex: 1 }}
        scrollEnabled={true}
        orientation="vertical"
      >
        {data.map((item) => (
          <View
            key={item.id}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <View
              style={{
                width: widthScreen,
                height: widthScreen,
                alignItems: "center",
                justifyContent: "center",
              }}
              className="relative p-1"
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
                className="rounded-3xl"
              />
              <View className="bg-zinc-900 opacity-80 mt-5 p-2 px-4 rounded-3xl justify-center items-center absolute bottom-3">
                {item.title && (
                  <Text className="text-white text-lg font-semibold">
                    {item.title}
                  </Text>
                )}
              </View>
            </View>
            <View className="bg-zinc-700 mt-5 p-2 px-4 rounded-3xl justify-center items-center">
              <Text className="text-white text-2xl font-semibold">
                {item.name}
              </Text>
            </View>
          </View>
        ))}
      </PagerView>

      {/* bottom bar */}
      <View
        className="flex-row justify-between px-7 mb-5 items-center"
        style={{ height: heightScreen / 17 }}
      >
        <Image
          source={images.windows}
          className="w-[30px] h-[30px]"
          style={{ tintColor: "white" }}
        />
        {/* icon */}
        <View className="flex-row bg-zinc-700 p-2 px-4 rounded-3xl justify-center items-center">
          <Image
            source={images.comment}
            className="w-[30px] h-[30px] mx-1"
            style={{ tintColor: "white" }}
          />
          <Image source={images.heart} className="w-[30px] h-[30px] mx-1" />
          <Image source={images.fire} className="w-[30px] h-[30px]  mx-1" />
          <Image source={images.smile} className="w-[30px] h-[30px]  mx-1" />
          <Image
            source={images.add}
            className="w-[30px] h-[30px]  mx-1"
            style={{ tintColor: "white" }}
          />
        </View>
        {/* icon */}
        <Image
          source={images.share}
          className="w-[30px] h-[30px]"
          style={{ tintColor: "white" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PageImage;
