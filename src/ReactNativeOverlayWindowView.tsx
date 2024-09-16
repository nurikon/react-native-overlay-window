import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ReactNativeOverlayWindowViewProps } from './ReactNativeOverlayWindow.types';

const NativeView: React.ComponentType<ReactNativeOverlayWindowViewProps> =
  requireNativeViewManager('ReactNativeOverlayWindow');

export default function ReactNativeOverlayWindowView(props: ReactNativeOverlayWindowViewProps) {
  return <NativeView {...props} />;
}
