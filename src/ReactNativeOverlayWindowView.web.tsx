import * as React from 'react';

import { ReactNativeOverlayWindowViewProps } from './ReactNativeOverlayWindow.types';

export default function ReactNativeOverlayWindowView(props: ReactNativeOverlayWindowViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
