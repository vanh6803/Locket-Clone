import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import PagerView from "react-native-pager-view";
import PageImage from "./src/screens/PageImage";
import PageHome from "./src/screens/PageHome";

export default function App() {
  const pagerRef = useRef(null);

  const goToPage = (pageNumber) => {
    pagerRef.current.setPage(pageNumber);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <PagerView
        style={styles.viewPager}
        initialPage={0}
        scrollEnabled={true}
        orientation="vertical"
        ref={pagerRef}
      >
        <PageHome key={"1"} onPressed={() => goToPage(1)} />
        <PageImage backPagePress={() => goToPage(0)} key="2" />
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
