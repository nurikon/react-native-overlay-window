import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ReactNativeOverlayWindow.web.ts
// and on native platforms to ReactNativeOverlayWindow.ts
import ReactNativeOverlayWindowModule from './ReactNativeOverlayWindowModule';
import ReactNativeOverlayWindowView from './ReactNativeOverlayWindowView';
import { ChangeEventPayload, ReactNativeOverlayWindowViewProps } from './ReactNativeOverlayWindow.types';

// Get the native constant value.
export const PI = ReactNativeOverlayWindowModule.PI;

export function hello(): string {
  return ReactNativeOverlayWindowModule.hello();
}

export async function setValueAsync(value: string) {
  return await ReactNativeOverlayWindowModule.setValueAsync(value);
}

const emitter = new EventEmitter(ReactNativeOverlayWindowModule ?? NativeModulesProxy.ReactNativeOverlayWindow);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ReactNativeOverlayWindowView, ReactNativeOverlayWindowViewProps, ChangeEventPayload };
