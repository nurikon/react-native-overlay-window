import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, SafeAreaView, StatusBar, Linking, AppState, AppStateStatus, Text } from 'react-native';
import * as ReactNativeOverlayWindow from 'react-native-overlay-window';

export default function App() {
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);


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


  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        checkPermissions();
      }
      setAppState(nextAppState);
    };
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, [appState]);


  const checkPermissions = async () => {
    const status = await ReactNativeOverlayWindow.checkPermission()
    setHasPermission(status);
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      {hasPermission && <View style={styles.container}>
        <Text style={{ marginBottom: 15 }}>You have granted the "Display over other apps" permission</Text>
        <Button title={isOverlayVisible ? "Hide Overlay" : "Show Overlay"} onPress={handleShowOverlay} />
      </View>}
      {!hasPermission && <View style={styles.container}>
        <Text style={{ marginBottom: 15 }}>Give permission to "Display over other apps"</Text>
        <Button title={"Open Settings"} onPress={() => Linking.openSettings()} />
      </View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 80,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
