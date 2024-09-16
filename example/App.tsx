import { StyleSheet, Text, View } from 'react-native';

import * as ReactNativeOverlayWindow from 'react-native-overlay-window';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ReactNativeOverlayWindow.hello()}</Text>
    </View>
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
