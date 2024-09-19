import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, SafeAreaView, StatusBar } from 'react-native';
import * as ReactNativeOverlayWindow from 'react-native-overlay-window';

export default function App() {
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);

  useEffect(() => {
    const subscription = ReactNativeOverlayWindow.addOverlayVisibilityListener(({ visible }) => {
      setIsOverlayVisible(visible);
    });
    return () => subscription.remove();
  }, []);

  const handleShowOverlay = () => {
    if (isOverlayVisible) {
      ReactNativeOverlayWindow.removeOverlayAsync()
        .then((res) => { console.log(res) });
    } else {
      ReactNativeOverlayWindow.createOverlayAsync({
        title: "Lorem Ipsum",
        body: "Lorem Ipsum is simply dummy text of the printing and typesettin'g industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
      }).then((res) => { console.log(res) });
    }

  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <View style={styles.container}>
        <Button title={isOverlayVisible ? "Hide Overlay" : "Show Overlay"} onPress={handleShowOverlay} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
